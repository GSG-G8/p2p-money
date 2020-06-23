const express = require('express');

const clientRouter = express.Router();

const {
  getClientData,
  updateClientData,
} = require('../controllers/routes/client');

clientRouter.get('/', getClientData);
clientRouter.patch('/', updateClientData);

module.exports = clientRouter;
