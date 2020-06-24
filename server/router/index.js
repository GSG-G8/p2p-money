const express = require('express');

const Router = express.Router();

const { signup, logout } = require('./auth-router');
const { isClient } = require('../controllers/middlewares');
const clientRouter = require('./client');
const prices = require('../controllers/routes/prices');

Router.post('/signup', signup);
Router.post('/logout', logout);
Router.use('/client', isClient, clientRouter);
Router.get('/prices', prices);

module.exports = Router;
