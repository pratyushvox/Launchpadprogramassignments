import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
  updateOrderStatus,
  getSalesReport,
  getTopSellingProducts,
  getMonthlySalesReport
} from '../controllers/orderController';

const router = express.Router();

//  Place a New Order
router.post('/', createOrder);

//  List and Filter Orders
router.get('/', getAllOrders);

// Get All Orders for a Specific Customer
router.get('/customer/:customerId', getOrdersByCustomer);

//  Update Order Status (Cancel or Complete)
router.patch('/:id/status', updateOrderStatus);

//  Generate Sales Revenue Report
router.get('/reports/revenue', getSalesReport);

//  Generate Top-Selling Products Report
router.get('/reports/top-products', getTopSellingProducts);

//  Generate Monthly Sales Report
router.get('/reports/monthly-sales', getMonthlySalesReport);

export default router;