const express = require('express');

const adminRouter = express.Router();

const getClients = require('../controllers/routes/admin');

adminRouter.get('/getClients', getClients);

module.exports = adminRouter;
