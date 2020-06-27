const express = require('express');

const adminRouter = express.Router();

const { getClients, getTransactions } = require('../controllers/routes/admin');

adminRouter.get('/clients', getClients);
adminRouter.get('/transactions', getTransactions);

module.exports = adminRouter;
