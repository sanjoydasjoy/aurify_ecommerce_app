import express from "express"
import  {addProduct,listProducts,removeProducts,singleProductInfo} from '../controllers/productController.js'
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

const productRouter = express.Router()

productRouter.post('/add',adminAuth,upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]),addProduct)
//the upload.fields() runs first. It intercepts the request, processes the file uploads (i.e., stores them), and attaches the uploaded files to req.files.

//addProduct: After the middleware completes, the addProduct controller runs. 
//Inside the controller, you can access the uploaded files through req.files to perform actions like saving the file paths to the database.

productRouter.post('/remove',adminAuth,removeProducts)
productRouter.post('/single',singleProductInfo)
productRouter.get('/list',listProducts)


export default productRouter