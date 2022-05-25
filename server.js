// const WebSocket = require('ws')
// let conectados=[];
// const wss = new WebSocket.Server({ port: 8080 })

// wss.on('connection', ws => {
//   //agregar
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//     conectados.push(ws);
//     //console.log(conectados)
//     conectados.forEach(cadaCon=>{

//       cadaCon.send("Llegó uno más")
//     })
//   })

//   ws.send('Hello! Message From Server!!')
// })



const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({ noServer: true });

const clients = new Set();

function accept(req, res) {

    if (req.url == '/ws' && req.headers.upgrade &&
        req.headers.upgrade.toLowerCase() == 'websocket' &&
        req.headers.connection.match(/\bupgrade\b/i)) {
        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
    } else if (req.url == '/') {
        fs.createReadStream('./index.html').pipe(res);
    } else {
        res.writeHead(404);
        res.end();
    }
}


function onSocketConnect(ws) {
    clients.add(ws);
    log(`new connection`);

    ws.on('message', function(message) {
        log(`message received: ${message}`);

        message = message.slice(0, 50);
        for (let client of clients) {
            client.send(message);
        }
    });

    ws.on('close', function() {
        log(`connection closed`);
        clients.delete(ws);
    });
}

let log;
if (!module.parent) {
    log = console.log;
    http.createServer(accept).listen(8080);
} else {
    log = function() {};
    // log = console.log;
    exports.accept = accept;
}