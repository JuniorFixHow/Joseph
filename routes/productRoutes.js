const express = require('express');
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct } = require('../controllers/productControllers');
const {  verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create',  createProduct)
router.put('/update/:id',  updateProduct);
router.delete('/delete/:id',  deleteProduct);
router.get('/',  getAllProducts);
router.get('/:id',  getProduct);

module.exports =router;