import { Request, Response } from 'express';
import Product from '../models/Product';

// Create a New Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: savedProduct
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

//  Comprehensive Product Search and Filtering
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      maxStock,
      hasReviews,
      page = 1,
      limit = 10
    } = req.query;

    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (maxStock) {
      filter.stock = { $lte: Number(maxStock) };
    }

    if (hasReviews !== undefined) {
      if (hasReviews === 'true') {
        filter['reviews.0'] = { $exists: true };
      } else if (hasReviews === 'false') {
        filter['reviews.0'] = { $exists: false };
      }
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitNum);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully!',
      data: products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error: error.message
    });
  }
};

//  Add a Review to a Product
export const addReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reviewData = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { $push: { reviews: reviewData } },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Review added successfully!',
      data: product
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

//Update Product Details
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

//  Delete a Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: deletedProduct
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

//  Update a Product Review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { productId, reviewId } = req.params;
    const updateData = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: productId, 'reviews._id': reviewId },
      {
        $set: {
          'reviews.$.rating': updateData.rating,
          'reviews.$.comment': updateData.comment
        }
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product or review not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review updated successfully!',
      data: product
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
};

//  Delete a Product Review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findByIdAndUpdate(
      productId,
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully!',
      data: product
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
};