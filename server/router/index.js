const express = require('express');

const Router = express.Router();
const clientRouter = require('./client');

Router.use('/client', clientRouter);

module.exports = Router;
