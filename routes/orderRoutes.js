const express = require('express');
const { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder, cancelOrder } = require('../controllers/orderControllers');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create', verifyAdmin, createOrder)
router.put('/update', verifyAdmin, updateOrder);
router.delete('/delete/:id', verifyAdmin, deleteOrder);
router.post('/cancel', verifyAdmin, cancelOrder);
router.get('/',  getAllOrders);
router.get('/:id', verifyAdmin, getOrder);

module.exports =router;