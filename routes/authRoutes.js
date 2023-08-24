const express = require('express');
const { createUser, login } = require('../controllers/authControllers');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', login);

module.exports =router;