const express = require('express');

const clientRouter = express.Router();

const {
  getClientData,
  addBankAccount,
  updateClientData,
} = require('../controllers/routes/client');

clientRouter.get('/', getClientData);
clientRouter.patch('/', updateClientData);
clientRouter.post('/bank', addBankAccount);

module.exports = clientRouter;
