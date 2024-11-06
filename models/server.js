const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor () {

        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.UrlPath = {};

        this.middlewares();

        this.routes(); 

        this.sockets();

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        
        // this.app.use(this.UrlPath.auth, require('../routes/auth'));
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    listen() {

        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;