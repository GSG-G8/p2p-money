const express = require('express');

const clientRouter = express.Router();

const {
  getClientData,
  updateClientData,
  addBankAccount,
  deleteBankAccount,
} = require('../controllers/routes/client');

clientRouter.get('/', getClientData);
clientRouter.patch('/', updateClientData);
clientRouter.post('/bank', addBankAccount);
clientRouter.put('/bank', deleteBankAccount);

module.exports = clientRouter;
