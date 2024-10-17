const express = require('express');
const { getProducts, getProduct, updateProduct, deleteProduct, createProduct } = require('../controllers/product.controller');
const router = express.Router();




router.get('/', getProducts)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/', createProduct)

module.exports = router;