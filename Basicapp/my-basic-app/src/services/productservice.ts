import  type { Product } from '../types';
import { api } from './api';

export const productService = {
  getProducts: async (limit = 10, page = 1): Promise<{products: Product[], total: number}> => {
    const products = await api.get('/products');
    // For pagination, we'll slice the array (since the API doesn't support pagination)
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total: products.length
    };
  },
  
  getProduct: async (id: number): Promise<Product> => {
    return await api.get(`/products/${id}`);
  },
  
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    return await api.post('/products', product);
  },
  
  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    return await api.put(`/products/${id}`, product);
  },
  
  deleteProduct: async (id: number): Promise<void> => {
    return await api.delete(`/products/${id}`);
  },
  
  getCategories: async (): Promise<string[]> => {
    return await api.get('/products/categories');
  }
};