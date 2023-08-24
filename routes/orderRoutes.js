const express = require('express');
const { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder, cancelOrder } = require('../controllers/orderControllers');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create',  createOrder)
router.put('/update',  updateOrder);
router.delete('/delete/:id',  deleteOrder);
router.post('/cancel',  cancelOrder);
router.get('/',  getAllOrders);
router.get('/:id', getOrder);

module.exports =router;