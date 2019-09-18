const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/user', UserController.insert);
routes.get('/user', UserController.select);
module.exports = routes;