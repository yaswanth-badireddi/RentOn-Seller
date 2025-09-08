import express from 'express';
import {
  addProducts,
  getProductsBySellerId,
  updateProducts,
  deleteProducts
} from '../controllers/product.controllers.js';
import upload from '../middleware/upload.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/',verifyToken,upload.single('image'), addProducts);

router.get('/', verifyToken, getProductsBySellerId);

router.put('/:id', verifyToken, updateProducts);

router.delete('/:id', verifyToken, deleteProducts);

export default router;
