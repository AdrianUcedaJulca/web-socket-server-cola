const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    socket.emit('ultimo-ticket-server', ticketControl.ultimo);

    socket.emit('ultimos-tickets-server', ticketControl.ultimos4);

    socket.emit('numero-cola-server', ticketControl.tickets.length);

    socket.on('siguiente-ticket-client', (payload, callback) => {

        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit('numero-cola-server', ticketControl.tickets.length);
    });

    socket.on('atender-ticket-client', ({ escritorio }, callback) => {

        if(!escritorio){

            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        //Notificar el cambio a los demas clientes
        socket.broadcast.emit('ultimos-tickets-server', ticketControl.ultimos4);
        socket.emit('numero-cola-server', ticketControl.tickets.length);
        socket.broadcast.emit('numero-cola-server', ticketControl.tickets.length);
        
        console.log(ticket);
        if(!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
    });
};

module.exports = {
    socketController
}