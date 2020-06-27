const express = require('express');

const Router = express.Router();

const { isClient, isAdmin } = require('../controllers/middlewares');
const { login, signup, logout } = require('./auth-router');
const clientRouter = require('./client');
const { createTransaction } = require('../controllers/routes/client');
const adminRouter = require('./admin');

Router.post('/login', login);
Router.post('/signup', signup);
Router.post('/logout', logout);

Router.use('/client', isClient, clientRouter);
Router.post('/transaction', isClient, createTransaction);
Router.use('/admin', isAdmin, adminRouter);

module.exports = Router;
