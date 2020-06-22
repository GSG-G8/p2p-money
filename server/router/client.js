const express = require('express');

const clientRouter = express.Router();

const { getClintData } = require('../controllers/routes/client');

clientRouter.get('/', getClintData);

module.exports = clientRouter;
