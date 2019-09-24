const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');


const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
//server.use(express.json());
server.use(routes);


// Funçao TESTE
server.get('/', (req, res) => {
    res.send("<h1>Alo Mundo</h1>");
})

server.listen(3031, () => {
    console.log("Servidor Rodando http://localhost:3031");
});