const express = require('express');

const Router = express.Router();

const { login, signup, logout } = require('./auth-router');
const { isClient, isAdmin } = require('../controllers/middlewares');
const clientRouter = require('./client');
const adminRouter = require('./admin');
const prices = require('../controllers/routes/prices');

Router.post('/login', login);
Router.post('/signup', signup);
Router.post('/logout', logout);

Router.use('/client', isClient, clientRouter);
Router.use('/admin', isAdmin, adminRouter);
Router.get('/prices', prices);

module.exports = Router;
