import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useproduct';
import ProductList from '../Components/products/ProductList'
import { Button } from "../Components/UI/button";
import { Card, CardContent, CardHeader, CardTitle } from '../Components/UI/card';
import type { Product } from '@/types';

const Dashboard = () => {
  const { logout } = useAuth();
  const {
    products,
    isLoading,
    paginationInfo,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    setPage,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating,
    isUpdating,
    isDeleting,
    clearCache, // New cache clearing function
  } = useProducts();

  // Debug logs
  console.log('Dashboard Debug Info:');
  console.log('Products:', products);
  console.log('Products length:', products?.length);
  console.log('IsLoading:', isLoading);
  console.log('PaginationInfo:', paginationInfo);
  console.log('Categories:', categories);
  console.log('SearchTerm:', searchTerm);
  console.log('SelectedCategory:', selectedCategory);

  const handleCreateProduct = (productData: Omit<Product, 'id'>) => {
    createProduct(productData);
  };

  const handleUpdateProduct = (id: number, productData: Partial<Product>) => {
    updateProduct({ id, product: productData });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  const handleEditProduct = (product: Product) => {
    console.log('Editing product:', product);
  };

  const handleClearCacheAndReload = () => {
    clearCache();
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={handleClearCacheAndReload} variant="secondary" size="sm">
              Clear Cache & Reload
            </Button>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Debug section - remove this after fixing */}
        <div className="bg-yellow-100 p-4 rounded mb-4">
          <h3 className="font-bold">Debug Info:</h3>
          <p>Products count: {products?.length || 0}</p>
          <p>Is Loading: {isLoading.toString()}</p>
          <p>Total from API: {paginationInfo.total}</p>
          <p>Categories count: {categories?.length || 0}</p>
          <p>Search Term: "{searchTerm}"</p>
          <p>Selected Category: "{selectedCategory}"</p>
          {products?.length > 0 && (
            <p>First product: {products[0]?.title}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paginationInfo.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Page</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paginationInfo.page}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paginationInfo.pages}</div>
            </CardContent>
          </Card>
        </div>

        <ProductList
          products={products}
          isLoading={isLoading}
          paginationInfo={paginationInfo}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          setPage={setPage}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onCreate={handleCreateProduct}
          onUpdate={handleUpdateProduct}
          isCreating={isCreating}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      </main>
    </div>
  );
};

export default Dashboard;