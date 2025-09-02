const express = require('express');
const router = express.Router();


const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  editProduct,
  deleteProduct
} = require('../controllers/productController');


router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.post('/', createProduct);
router.put('/:id', editProduct);
router.delete('/:id',deleteProduct);

module.exports = router;