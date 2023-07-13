const express = require('express');
const { createPasswordReset, updatePasswordReset, deletePasswordReset, getAllPasswordResets, getPasswordReset } = require('../controllers/resetControllers');
const router = express.Router();

router.post('/create', createPasswordReset)
router.put('/update', updatePasswordReset);
router.post('/delete', deletePasswordReset);
router.get('/', getAllPasswordResets);
router.get('/:id', getPasswordReset);

module.exports =router;