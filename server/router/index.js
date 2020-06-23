const express = require('express');

const Router = express.Router();

const clientRouter = require('./client');
const transactionRouter = require('./transaction');
const { signup } = require('./auth-router');
const { isClient } = require('../controllers/middlewares');

Router.post('/signup', signup);
Router.use('/client', isClient, clientRouter);
Router.use('/transaction', isClient, transactionRouter);

module.exports = Router;
