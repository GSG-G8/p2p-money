const express = require('express');

const clientRouter = express.Router();

const {
  getClientData,
  addBankAccountValidation,
} = require('../controllers/routes/client');

clientRouter.get('/', getClientData);
clientRouter.post('/bank', addBankAccountValidation);

module.exports = clientRouter;
