const express = require('express');

const Router = express.Router();

const { signup } = require('./auth-router');
const { isClient, isAdmin } = require('../controllers/middlewares');
const clientRouter = require('./client');
const adminRouter = require('./admin');

Router.post('/signup', signup);
Router.use('/client', isClient, clientRouter);
Router.use('/admin', isAdmin, adminRouter);

module.exports = Router;
