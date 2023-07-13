const express = require('express');
const { createSupplier, updateSupplier, deleteSupplier, getAllSuppliers, getSupplier } = require('../controllers/supplierControllers');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create', verifyAdmin, createSupplier)
router.put('/update/:id', verifyAdmin, updateSupplier);
router.delete('/delete/:id', verifyAdmin, deleteSupplier);
router.get('/', verifyUser, getAllSuppliers);
router.get('/:id', verifyUser, getSupplier);

module.exports =router;