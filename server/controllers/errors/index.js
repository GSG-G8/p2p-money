const express = require('express');

const errorHandler = express.Router();

const clientError = require('./clientError');
const serverError = require('./serverError');

errorHandler.use(clientError);
errorHandler.use(serverError);

module.exports = errorHandler;
