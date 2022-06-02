let chat = document.getElementById("chat");
let users = new Array();

let socket;
let datbox;

var list = {
    'datos' :[]
 };

const btnConectar = document.getElementById("btnConectar");
const btnSendPriv = document.getElementById("btnSendPriv");
const usrOnline = document.getElementById("usrOnline");
const msgs = document.getElementById("msgs");
const btnSendPub = document.getElementById("btnSendPub");
let messg= document.getElementById("message");
let msgPriv = document.getElementById("msgPub");
let usrPriv = document.getElementById("usrPriv");
let btnPriv = document.getElementById("btnSendPriv");

socket = new WebSocket("ws://localhost:8080");  //Esta estaba en el click





btnConectar.addEventListener("click", ()=>{

    let nombre = document.getElementById("usrName").value;

    let username = {tipo:1, nombre:nombre};

    socket.send(JSON.stringify(username))

});


socket.onopen = function(e) //Al conectar no se sabe quien es, solo que está; esperar que el usuario mande su nombre.


{

    console.log("Conectado");;

}//Recordatorio: Nunca dejar al final del código!!!

    btnSendPub.addEventListener("click",()=>{
        let nombre = document.getElementById("usrName").value;
        let username = {tipo:1, nombre:nombre};
        datbox = {tipo:2,remitente:username.nombre,msg:messg.value}

        socket.send(JSON.stringify(datbox));

        messg.value = "";
        });

    btnPriv.addEventListener("click", ()=>{
        let nombre = document.getElementById("usrName").value;
        let username = {tipo:1, nombre:nombre};

        datbox = {tipo:3,remitente:username.nombre,dest:usrPriv.value,msg:msgPub.value};

        socket.send(JSON.stringify(datbox));

        usrPriv.value="";
        msgPriv.value="";
    });

    
    socket.onmessage = (event) =>
    {
        let evento = JSON.parse(event.data);
        console.log(evento);

        if(evento.tipo == 1)
        {
            let text = `Bienvenido: ${evento.nombre}<br>`
            chat.innerHTML =  text;
        }
        if(evento.tipo == 2){

            let text = `${evento.remitente}: ${evento.msg}<br>`;
            console.log(text);
            msgs.innerHTML += text;
        }
        if(evento.tipo == 3)
        {
            let text = `${evento.remitente} dice: ${evento.msg}<br>`;
            msgs.innerHTML+=text;
        }
    };

    socket.onerror = function(error){
        alert(`[error] ${error.msg}`);
    };

    var option = document.createElement("option");
    for(i=0; i<users.length; i++)
    {
       option.innerHTML = users[i];
       usrOnline.appendChild(option);

    };


btnSendPriv.addEventListener("click", ()=>{
    
    var mensaje = {
        'destino' :[]
     };

    let nombre = document.getElementById("usrName").value;
    let msgPub = document.getElementById("msgPub").value;
    let usuariodestino = document.getElementById("usrPriv").value;

    mensaje.destino.push({
        "nombre": nombre,
        "msgPub":msgPub,
        "usuariodestino":usuariodestino,
        "tipodedatos": "2"
      });

      console.log(mensaje);

    json = JSON.stringify(mensaje);
    var obj = JSON.parse(json);
});


/*let socket;
let aviso = document.getElementById("aviso");

const btnConectar = document.getElementById("btnConectar");

btnConectar.addEventListener("click", ()=>{
    let socket = new WebSocket("ws://localhost:8080");
    let nombre = document.getElementById("txtNombre").value;
    console.log(nombre)

    socket.onopen = function(e) {
        alert("[open] Conexión establecida");
        alert("Enviando al servidor");
        socket.send("Mi nombre es " + nombre);
        document.getElementById("detalles").innerHTML=("Se ha conectado " + nombre);
    };
    socket.onmessage = (event) => {
        alert(`[message] Datos recibidos del servidor: ${event.data}`);
    };
    socket.onclose = function(event) {
        if (event.wasClean) {
            alert(`[close] Conexión cerrada limpiamente,
            código=${event.code} motivo=${event.reason}`);
        } else {
            // ej. El proceso del servidor se detuvo o la red está caida
            // event.code es usualmente 1006 en este caso
            alert(`[close] La conexión se cayó`);
        }
    };
    socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
    };
});

socket.onopen = function(e) {
    alert("[open] Conexión establecida");
    alert("Enviando al servidor");
    socket.send("Mi nombre es " + nombre);
};
socket.onmessage = (event) => {
    alert(`[message] Datos recibidos del servidor: ${event.data}`);
};
socket.onclose = function(event) {
    if (event.wasClean) {
        alert(`[close] Conexión cerrada limpiamente,
        código=${event.code} motivo=${event.reason}`);
    } else {
        // ej. El proceso del servidor se detuvo o la red está caida
        // event.code es usualmente 1006 en este caso
        alert(`[close] La conexión se cayó`);
    }
};
socket.onerror = function(error) {
    alert(`[error] ${error.message}`);
};*/