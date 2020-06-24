const express = require('express');

const clientRouter = express.Router();

const {
  getClientData,
  updateClientData,
  deleteBankAccount,
} = require('../controllers/routes/client');

clientRouter.get('/', getClientData);
clientRouter.patch('/', updateClientData);
clientRouter.delete('/', deleteBankAccount);

module.exports = clientRouter;
