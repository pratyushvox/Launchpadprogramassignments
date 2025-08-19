import type { Product } from './Types/types';
import headphone from "./Images/Headphone.png"
import coffeemaker from "./Images/Coffeemaker.png"
import shoes from "./Images/Shoes.png"
import Backpack  from "./Images/Backpack.png"
import Speaker from "./Images/Speaker.png"
import Watch from "./Images/Watch.png"

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: headphone,
    category: 'Electronics',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Latest smart watch with health monitoring features',
    image: Watch,
    category: 'Electronics',
    rating: 4.2
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 79.99,
    description: 'Comfortable running shoes for all terrains',
    image: shoes,
    category: 'Fashion',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Designer Backpack',
    price: 129.99,
    description: 'Durable backpack with multiple compartments',
    image: Backpack,
    category: 'Fashion',
    rating: 4.3
  },
  {
    id: 5,
    name: 'Premium Coffee Maker',
    price: 199.99,
    description: 'Automatic coffee maker with timer and grinder',
    image: coffeemaker,
    category: 'Home',
    rating: 4.8
  },
  {
    id: 6,
    name: 'Bluetooth Speaker',
    price: 89.99,
    description: 'Portable speaker with 20hr battery life',
    image: Speaker,
    category: 'Electronics',
    rating: 4.1
  }
];