const express = require('express');
const server = express();

// Funçao TESTE
server.get('/', (req, res) => {
    res.send("<h1>Alo Mundo</h1>");
})

server.listen(3031, () => {
    console.log("Servidor Rodando http://localhost:3031");
});