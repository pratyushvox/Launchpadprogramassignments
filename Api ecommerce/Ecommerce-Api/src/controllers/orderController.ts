import { Request, Response } from 'express';
import Order from '../models/Order';
import User from '../models/User';
import Product from '../models/Product';
import mongoose from 'mongoose';

//  Place a New Order
export const createOrder = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { customerId, items } = req.body;

    // Validate customer exists
    const customer = await User.findById(customerId).session(session);
    if (!customer) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found`
        });
      }

      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product_id: product._id,
        quantity: item.quantity,
        unit_price: product.price
      });

      
      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    // Create the order
    const newOrder = new Order({
      customer_id: customerId,
      items: orderItems,
      status: 'pending',
      total_amount: totalAmount
    });

    const savedOrder = await newOrder.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: savedOrder
    });

  } catch (error: any) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

// List and Filter Orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const orders = await Order.find(filter)
      .populate('customer_id', 'username email')
      .populate('items.product_id', 'name price')
      .skip(skip)
      .limit(limitNum)
      .sort({ order_date: -1 });

    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / limitNum);

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully!',
      data: orders,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalOrders,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving orders',
      error: error.message
    });
  }
};

// Get All Orders for a Specific Customer
export const getOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

   
    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const orders = await Order.find({ customer_id: customerId })
      .populate('items.product_id', 'name price')
      .skip(skip)
      .limit(limitNum)
      .sort({ order_date: -1 });

    const totalOrders = await Order.countDocuments({ customer_id: customerId });
    const totalPages = Math.ceil(totalOrders / limitNum);

    res.status(200).json({
      success: true,
      message: `Orders for customer ${customer.username} retrieved successfully!`,
      data: orders,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalOrders,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving customer orders',
      error: error.message
    });
  }
};

//  Update Order Status (Cancel or Complete)
export const updateOrderStatus = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['completed', 'cancelled'].includes(status)) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Status must be either "completed" or "cancelled"'
      });
    }

    const order = await Order.findById(id).session(session);
    if (!order) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

   
    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.product_id,
          { $inc: { stock: item.quantity } },
          { session }
        );
      }
    }

    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, session }
    ).populate('customer_id', 'username email')
     .populate('items.product_id', 'name price');

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status} successfully!`,
      data: updatedOrder
    });

  } catch (error: any) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

//  Generate Sales Revenue Report
export const getSalesReport = async (req: Request, res: Response) => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total_amount' }
        }
      }
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      message: 'Sales revenue report generated successfully!',
      data: {
        totalRevenue: parseFloat(totalRevenue.toFixed(2))
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error generating sales report',
      error: error.message
    });
  }
};

//  Generate Top-Selling Products Report
export const getTopSellingProducts = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;

    const topProducts = await Order.aggregate([
      {
        $match: {
          status: 'completed'
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.product_id',
          totalQuantitySold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.unit_price'] } }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      {
        $unwind: '$productInfo'
      },
      {
        $project: {
          _id: 1,
          name: '$productInfo.name',
          category: '$productInfo.category',
          brand: '$productInfo.brand',
          totalQuantitySold: 1,
          totalRevenue: { $round: ['$totalRevenue', 2] }
        }
      },
      {
        $sort: {
          totalQuantitySold: -1
        }
      },
      {
        $limit: Number(limit)
      }
    ]);

    res.status(200).json({
      success: true,
      message: 'Top-selling products report generated successfully!',
      data: topProducts
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error generating top-selling products report',
      error: error.message
    });
  }
};

// Generate Monthly Sales Report
export const getMonthlySalesReport = async (req: Request, res: Response) => {
  try {
    const monthlySales = await Order.aggregate([
      {
        $match: {
          status: 'completed'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$order_date' },
            month: { $month: '$order_date' }
          },
          totalSales: { $sum: '$total_amount' },
          totalOrders: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          monthName: {
            $arrayElemAt: [
              ['', 'January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November', 'December'],
              '$_id.month'
            ]
          },
          totalSales: { $round: ['$totalSales', 2] },
          totalOrders: 1
        }
      },
      {
        $sort: {
          year: -1,
          month: -1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: 'Monthly sales report generated successfully!',
      data: monthlySales
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error generating monthly sales report',
      error: error.message
    });
  }
};