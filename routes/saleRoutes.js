const express = require('express');
const { createSale, updateSale, deleteSale, getAllSales, getSale } = require('../controllers/salesControllers');
const { verifySeller, verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.post('/create',  createSale)
router.put('/update/:id',  updateSale);
router.delete('/delete/:id',  deleteSale);
router.get('/',  getAllSales);
router.get('/:id',  getSale);

module.exports =router;