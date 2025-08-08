const express = require('express')
const router =express.Router()

const { getAllProducts, getSingleProduct, editProduct, deleteProduct, createProduct } = require('../controllers/productController')

//router.get('/',(req,res) => res.send("hit"))
//router.get('/:id',(req,res) => res.send("hit"))

router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)


router.post('/',createProduct)
 
router.put('/',editProduct)

router.delete('/:id',deleteProduct)


module.exports = router;