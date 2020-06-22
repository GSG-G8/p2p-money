const express = require('express');

const Router = express.Router();
const clientRouter = require('./client');
const { isClient } = require('../controllers/middlewares');

Router.use('/client', isClient, clientRouter);

module.exports = Router;
