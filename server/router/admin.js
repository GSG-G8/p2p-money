const express = require('express');

const adminRouter = express.Router();

const getClients = require('../controllers/routes/admin');

adminRouter.get('/clients', getClients);

module.exports = adminRouter;
