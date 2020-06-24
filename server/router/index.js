const express = require('express');

const Router = express.Router();

const clientRouter = require('./client');
const login = require('./auth');

const { signup } = require('./auth-router');
const { isClient } = require('../controllers/middlewares');

Router.post('/login', login);
Router.use('/client', isClient, clientRouter);
Router.post('/signup', signup);
Router.use('/client', isClient, clientRouter);

module.exports = Router;
