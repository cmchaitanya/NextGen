import express from "express"

import {addProduct,getProducts,getProductsById,myProducts,removeProduct,search} from '../controllers/productController.js'
const productRouter = express.Router();


// Image Storage Engine
import multer from 'multer'
import cloudConfig from '../cloudConfig.js'; // Importing the default export
const { cloudinary, storage } = cloudConfig;
const upload=multer({storage})

// productRouter.get('/search', productController.search)
productRouter.post('/add-product', upload.fields([{ name: 'pimage1' }, { name: 'pimage2' }]),addProduct)
productRouter.get('/get-products', getProducts)
productRouter.get('/get-product/:pId', getProductsById)
productRouter.post('/my-products', myProducts)
productRouter.get('/search', search)
productRouter.post('/del', removeProduct)

export default productRouter;