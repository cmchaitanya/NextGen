import express from "express"
import multer from 'multer'

import {addProduct,getProducts,getProductsById,myProducts,removeProduct,search} from '../controllers/productController.js'
const productRouter = express.Router();

// Image Storage Engine

const storage=multer.diskStorage({
    destination: (req, file, cb) => {
            cb(null, 'uploads'); // Specify the directory to save uploaded files
        },
    filename:(req,file,cb)=>{
        //to create unique file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null,file.fieldname + '-' + uniqueSuffix+'.png')
    }
})

const upload=multer({storage:storage})

// productRouter.get('/search', productController.search)
productRouter.post('/add-product', upload.fields([{ name: 'pimage1' }, { name: 'pimage2' }]),addProduct)
productRouter.get('/get-products', getProducts)
productRouter.get('/get-product/:pId', getProductsById)
productRouter.post('/my-products', myProducts)
productRouter.get('/search', search)
productRouter.post('/del', removeProduct)

export default productRouter;