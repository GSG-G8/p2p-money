const express = require('express');

const Router = express.Router();

const { isClient, isAdmin } = require('../controllers/middlewares');
const { login, signup, logout } = require('./auth-router');
const clientRouter = require('./client');
const transactionRouter = require('./transaction');
const adminRouter = require('./admin');

Router.post('/login', login);
Router.post('/signup', signup);
Router.post('/logout', logout);

Router.use('/client', isClient, clientRouter);
Router.use('/transaction', isClient, transactionRouter);
Router.use('/admin', isAdmin, adminRouter);

module.exports = Router;
