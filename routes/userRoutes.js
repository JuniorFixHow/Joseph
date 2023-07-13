const express = require('express');
const { updateUser, deleteUser, getAllUsers, getUser, changePassword } = require('../controllers/userController');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.put('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyAdmin, deleteUser);
router.get('/', verifyAdmin, getAllUsers);
router.get('/:id', verifyUser, getUser);
router.put('/change/:id', verifyUser, changePassword);

module.exports =router;