const WebSocket = require('ws')
let conectados=[];
const wss = new WebSocket.Server({ port: 8080 })
 
wss.on('connection', ws => {
  //agregar
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    conectados.push(ws);
    //console.log(conectados)
    conectados.forEach(cadaCon=>{

      cadaCon.send("Llegó uno más")
    })
  })
  
  ws.send('Hello! Message From Server!!')
})