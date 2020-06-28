const express = require('express');

const transactionRouter = express.Router();

const {
  getTransactionsById,
  createTransaction,
} = require('../controllers/routes/client');

transactionRouter.get('/', getTransactionsById);
transactionRouter.post('/', createTransaction);

module.exports = transactionRouter;
