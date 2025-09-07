import mongoose, { Document, Schema } from 'mongoose';

interface IReview {
  _id?: mongoose.Types.ObjectId;
  user: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface IProduct extends Document {
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  features: string[];
  reviews: IReview[];
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  features: [{
    type: String,
    trim: true
  }],
  reviews: [{
    user: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;