const express = require('express')
const router = express.Router();
const { getProducts, getProductsById, updateProductsById, deleteProductsById, createProduct } = require('../controllers/product.controller');

router.get('/', getProducts)

router.post('/', createProduct)

router.get('/:id', getProductsById)

router.put('/:id', updateProductsById)

router.delete('/:id', deleteProductsById)


module.exports = router;