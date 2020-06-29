const express = require('express');

const adminRouter = express.Router();

const { getClients, getTransactions } = require('../controllers/routes/admin');
const { updatePrices } = require('../controllers/routes/prices');

adminRouter.get('/clients', getClients);
adminRouter.get('/transactions', getTransactions);
adminRouter.patch('/update', updatePrices);

module.exports = adminRouter;
