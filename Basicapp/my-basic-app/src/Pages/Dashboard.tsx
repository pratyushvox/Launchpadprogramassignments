import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useproduct';
import ProductList from '../Components/products/ProductList'
import { Button } from "../Components/UI/button";
import { Card, CardContent, CardHeader, CardTitle } from '../Components/UI/card';

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
  } = useProducts();

  const handleCreateProduct = (productData: Omit<Product, 'id'>) => {
    createProduct(productData);
  };

  const handleUpdateProduct = (id: number, productData: Partial<Product>) => {
    updateProduct({ id, product: productData });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          onEdit={() => {}}
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