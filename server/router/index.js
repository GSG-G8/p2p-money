const express = require('express');

const Router = express.Router();

const { signup, login } = require('./auth-router');
const { isClient } = require('../controllers/middlewares');
const clientRouter = require('./client');

Router.post('/login', login);
Router.post('/signup', signup);

Router.use('/client', isClient, clientRouter);

module.exports = Router;
