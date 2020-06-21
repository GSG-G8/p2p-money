const express = require('express');

const router = express.Router();

const { signup } = require('./auth-router');

router.post('/signup', signup);

module.exports = router;
