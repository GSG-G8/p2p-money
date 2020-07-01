const express = require('express');

const Router = express.Router();

const { login, signup, logout } = require('./auth-router');
const { isClient, isAdmin } = require('../controllers/middlewares');
const { getPrices } = require('../controllers/routes/prices');
const clientRouter = require('./client');
const transactionRouter = require('./transaction');
const adminRouter = require('./admin');
const ErrorHandler = require('../controllers/errors');

Router.post('/login', login);
Router.post('/signup', signup);
Router.post('/logout', logout);

Router.get('/prices', getPrices);
Router.use('/client', isClient, clientRouter);
Router.use('/transaction', isClient, transactionRouter);
Router.use('/admin', isAdmin, adminRouter);

Router.use(ErrorHandler);

module.exports = Router;
