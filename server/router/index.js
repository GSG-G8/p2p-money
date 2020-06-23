const express = require('express');

const Router = express.Router();

const clientRouter = require('./client');
const transactionRouter = require('./transaction');
const { isClient } = require('../controllers/middlewares');

Router.use('/client', isClient, clientRouter);
Router.use('/transaction', transactionRouter);

module.exports = Router;
