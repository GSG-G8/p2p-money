const express = require('express');

const clientRouter = express.Router();

const {
  getClientData,
  addBankAccountValidation,
  updateClientData,
} = require('../controllers/routes/client');

clientRouter.get('/', getClientData);
clientRouter.patch('/', updateClientData);
clientRouter.post('/bank', addBankAccountValidation);

module.exports = clientRouter;
