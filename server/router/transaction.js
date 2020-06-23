const express = require('express');

const transactionRouter = express.Router();

const { getTransactionsById } = require('../controllers/routes/client');

transactionRouter.get('/:id', getTransactionsById);

module.exports = transactionRouter;
