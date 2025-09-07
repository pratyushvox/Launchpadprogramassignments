import express from 'express';
import {
  createProduct,
  getAllProducts,
  addReview,
  updateProduct,
  deleteProduct,
  updateReview,
  deleteReview
} from '../controllers/productController';

const router = express.Router();

//  Create a New Product
router.post('/', createProduct);

//  Comprehensive Product Search and Filtering
router.get('/', getAllProducts);

//  Add a Review to a Product
router.post('/:id/reviews', addReview);

//  Update Product Details
router.put('/:id', updateProduct);

//  Delete a Product
router.delete('/:id', deleteProduct);

//  Update a Product Review
router.put('/:productId/reviews/:reviewId', updateReview);

// Delete a Product Review
router.delete('/:productId/reviews/:reviewId', deleteReview);

export default router;