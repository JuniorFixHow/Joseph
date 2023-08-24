const express = require('express');
const { updateUser, deleteUser, getAllUsers, getUser, changePassword } = require('../controllers/userController');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.put('/update/:id',  updateUser);
router.delete('/delete/:id',  deleteUser);
router.get('/',  getAllUsers);
router.get('/:id',  getUser);
router.put('/change/:id',  changePassword);

module.exports =router;