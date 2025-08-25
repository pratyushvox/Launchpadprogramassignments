import type { Product } from '../types';
import { api } from './api';

export const productService = {
  getProducts: async (limit = 10, page = 1): Promise<{products: Product[], total: number}> => {
    try {
      console.log(`Fetching products - limit: ${limit}, page: ${page}`);
      
     
      const allProducts = await api.get('/products');
      console.log('API Response - All products:', allProducts);
      console.log('Products count:', allProducts?.length);

      // Implement client-side pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);
      
      console.log(`Pagination - start: ${startIndex}, end: ${endIndex}`);
      console.log('Paginated products:', paginatedProducts);

      const result = {
        products: paginatedProducts,
        total: allProducts.length
      };

      console.log('Final result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProduct: async (id: number): Promise<Product> => {
    try {
      console.log(`Fetching single product with id: ${id}`);
      const result = await api.get(`/products/${id}`);
      console.log('Single product result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching single product:', error);
      throw error;
    }
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      console.log('Creating product:', product);
      // Note: FakeStore API is read-only for demo, this will return a mock response
      const result = await api.post('/products', product);
      console.log('Create product result:', result);
      return result;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    try {
      console.log(`Updating product ${id}:`, product);
      // Note: FakeStore API is read-only for demo, this will return a mock response
      const result = await api.put(`/products/${id}`, product);
      console.log('Update product result:', result);
      return result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<void> => {
    try {
      console.log(`Deleting product with id: ${id}`);
      // Note: FakeStore API is read-only for demo, this will return a mock response
      const result = await api.delete(`/products/${id}`);
      console.log('Delete product result:', result);
      return result;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  getCategories: async (): Promise<string[]> => {
    try {
      console.log('Fetching categories');
      const result = await api.get('/products/categories');
      console.log('Categories result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};