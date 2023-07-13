const express = require('express');
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct } = require('../controllers/productControllers');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create', verifyAdmin, createProduct)
router.put('/update/:id', verifyAdmin, updateProduct);
router.delete('/delete/:id', verifyAdmin, deleteProduct);
router.get('/', verifyUser, getAllProducts);
router.get('/:id', verifyUser, getProduct);

module.exports =router;