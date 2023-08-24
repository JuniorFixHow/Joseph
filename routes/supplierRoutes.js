const express = require('express');
const { createSupplier, updateSupplier, deleteSupplier, getAllSuppliers, getSupplier } = require('../controllers/supplierControllers');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create',  createSupplier)
router.put('/update/:id',  updateSupplier);
router.delete('/delete/:id',  deleteSupplier);
router.get('/',  getAllSuppliers);
router.get('/:id',  getSupplier);

module.exports =router;