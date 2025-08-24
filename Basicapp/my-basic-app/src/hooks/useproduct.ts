import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import  type { Product, PaginationInfo } from '../types';
import { productService } from '../services/productservice';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const useProducts = (limit = 10) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products with pagination
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => productService.getProducts(limit, page),
    keepPreviousData: true,
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) =>
      productService.updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });

  // Filter products based on search term and category
  const filteredProducts = productsData?.products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  }) || [];

  // Pagination info
  const paginationInfo: PaginationInfo = {
    page,
    limit,
    total: productsData?.total || 0,
    pages: Math.ceil((productsData?.total || 0) / limit),
  };

  return {
    products: filteredProducts,
    isLoading,
    error,
    paginationInfo,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories: categories || [],
    setPage,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    isCreating: createProductMutation.isLoading,
    isUpdating: updateProductMutation.isLoading,
    isDeleting: deleteProductMutation.isLoading,
  };
};