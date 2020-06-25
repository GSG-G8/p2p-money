const express = require('express');

const Router = express.Router();

const { login, signup, logout } = require('./auth-router');
const { isClient } = require('../controllers/middlewares');
const clientRouter = require('./client');
const { createTransaction } = require('../controllers/routes/client');

Router.post('/login', login);
Router.post('/signup', signup);
Router.post('/logout', logout);

Router.use('/client', isClient, clientRouter);
Router.post('/transaction', isClient, createTransaction);
module.exports = Router;
