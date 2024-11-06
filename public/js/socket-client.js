//Referencias a etiquetas html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');

    lblOnline.style.display = '';
    lblOffline.style.display = 'none';
});

socket.on('disconnect', () => {
    console.log('Desconectado');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('mensaje-server', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje
    };
    socket.emit('mensaje-client', payload, (id) => {
        console.log('Funcion ejecutada desde el servidor', id);
    });
});

//ii
