const express = require('express');
const { createSale, updateSale, deleteSale, getAllSales, getSale } = require('../controllers/salesControllers');
const { verifySeller, verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create', verifySeller, createSale)
router.put('/update/:id', verifySeller, updateSale);
router.delete('/delete/:id', verifySeller, deleteSale);
router.get('/', verifyUser, getAllSales);
router.get('/:id', verifyUser, getSale);

module.exports =router;