import { useState } from 'react';
import type { Product } from '../../types';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../UI/select';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../UI/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card';
import { Pagination } from '../UI/pagination';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  paginationInfo: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  setPage: (page: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onCreate: (product: Omit<Product, 'id'>) => void;
  onUpdate: (id: number, product: Partial<Product>) => void;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

const ProductList = ({
  products,
  isLoading,
  paginationInfo,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  setPage,
  onEdit,
  onDelete,
  onCreate,
  onUpdate,
  isCreating,
  isUpdating,
  isDeleting,
}: ProductListProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(id);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (productData: Omit<Product, 'id'>) => {
    if (editingProduct && editingProduct.id) {
      onUpdate(editingProduct.id, productData);
    } else {
      onCreate(productData);
    }
    setIsFormOpen(false);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleCreate}>Add Product</Button>
          </div>

          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading || isDeleting}
          />

          {paginationInfo.pages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={paginationInfo.page}
                totalPages={paginationInfo.pages}
                onPageChange={setPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Create Product'}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={isCreating || isUpdating}
            categories={categories}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;