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
clientRouter.delete('/bank', deleteBankAccount);

module.exports = clientRouter;
