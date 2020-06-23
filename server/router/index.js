const express = require('express');

const router = express.Router();

const clientRouter = require('./client');
const login = require('./auth');

const { isClient } = require('../controllers/middlewares');

router.post('/login', login);

router.use('/client', isClient, clientRouter);

module.exports = router;
