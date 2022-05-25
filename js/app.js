//let socket;
//let aviso = document.getElementById("aviso");

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
/*socket.onopen = function(e) {
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