const express = require('express');

const clientRouter = express.Router();

const { getClintData } = require('../controllers/routes/client');

clientRouter.get('/:id', getClintData);

module.exports = clientRouter;
