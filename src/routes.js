const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/user', UserController.insert);
routes.get('/user', UserController.select);
routes.put('/user/:id', UserController.update);
routes.get('/user/all', UserController.show);
routes.delete('/user/:id', UserController.delete);
module.exports = routes;