import mongoose, { Document, Schema } from 'mongoose';

interface IOrderItem {
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  unit_price: number;
}

export interface IOrder extends Document {
  customer_id: mongoose.Types.ObjectId;
  order_date: Date;
  items: IOrderItem[];
  status: 'pending' | 'completed' | 'cancelled';
  total_amount: number;
}

const OrderSchema = new Schema<IOrder>({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  items: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unit_price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  total_amount: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;