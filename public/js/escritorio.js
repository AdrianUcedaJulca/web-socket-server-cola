// Referencias del HTML
const lblEscritorio  = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const divAlerta = document.querySelector('.alert');
const lblTicket  = document.querySelector('small');
const lblAlertaSpan  = document.querySelector('span');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){

    window.location = 'index.html';
    throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
});

socket.on('numero-cola-server', (numCola) => {

    if(numCola === 0){

        lblAlertaSpan.innerText = 'Ya no hay tickets pendientes';
        divAlerta.style.display = '';
        btnAtender.disabled = true;
        lblPendientes.style.display = 'none';
        lblPendientes.innerText = numCola;
    }else{

        lblAlertaSpan.innerText = '';
        divAlerta.style.display = 'none';
        btnAtender.disabled = false;
        lblPendientes.style.display = '';
        lblPendientes.innerText = numCola;
    }
});

btnAtender.addEventListener( 'click', () => {
    
    socket.emit('atender-ticket-client', { escritorio }, ( {ok, msg, ticket} ) => {
        if(!ok){
            lblTicket.innerText = 'nadie';
            lblAlertaSpan.innerText = msg;
            divAlerta.style.display = '';
            btnAtender.disabled = true;
            return;
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero;
    });
});