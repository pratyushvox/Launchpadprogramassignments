import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product, PaginationInfo } from '../types';
import { productService } from '../services/productservice';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const useProducts = (limit = 10) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', page, limit, searchTerm, selectedCategory],
    queryFn: () => productService.getProducts(limit, page),
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache results
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
    staleTime: 5 * 60 * 1000, // Cache categories for 5 minutes
  });

  // Debug logs
  console.log('useProducts Debug:');
  console.log('productsData:', productsData);
  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('categories:', categories);

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error) => {
      console.error('Create product error:', error);
      toast.error('Failed to create product');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) =>
      productService.updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      console.error('Update product error:', error);
      toast.error('Failed to update product');
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      console.error('Delete product error:', error);
      toast.error('Failed to delete product');
    },
  });

  // Apply client-side filtering
  const filteredProducts = productsData?.products?.filter((product) => {
    const matchesSearch = searchTerm === '' || product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  console.log('filteredProducts:', filteredProducts);

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
    categories,
    setPage,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    isCreating: createProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
    isDeleting: deleteProductMutation.isPending,
    
    clearCache: () => {
      queryClient.clear();
      console.log('React Query cache cleared');
    },
  };
};