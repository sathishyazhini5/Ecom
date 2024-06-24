import express from 'express';
import { upload } from '../middlewares/multer.js';
import { saveProduct, getProducts } from '../controllers/product/product.js';

const router = express.Router();

router.post('/products', upload.array('images', 5), saveProduct);
router.get('/getproduct', getProducts);

export const productRouter = router;
