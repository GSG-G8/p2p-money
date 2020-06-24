const express = require('express');

const Router = express.Router();

const { signup } = require('./auth-router');
const { isClient } = require('../controllers/middlewares');
const clientRouter = require('./client');
const transactionRouter = require('./transaction');

Router.post('/signup', signup);
Router.use('/client', isClient, clientRouter);
Router.use('/transaction', isClient, transactionRouter);

module.exports = Router;
