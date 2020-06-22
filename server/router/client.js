const express = require('express');

const clientRouter = express.Router();

const { getClientData } = require('../controllers/routes/client');

clientRouter.get('/', getClientData);

module.exports = clientRouter;
