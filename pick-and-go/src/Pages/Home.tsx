import { Link } from 'react-router-dom';
import { products } from '../data';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section - Updated to teal gradient */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Pick&Go</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
          <Link 
            to="/products" 
            className="bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition shadow-md hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products - Card buttons updated */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={product.image} alt={product.name} className="w-120 h-50 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {/* Rating stars with Font Awesome */}
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-star ${i < Math.floor(product.rating || 0) ? 'fas text-yellow-400' : 'far text-gray-300'} w-5 h-5`}
                      ></i>
                    ))}
                    <span className="text-gray-600 ml-2">{product.rating}</span>
                  </div>
                  <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="block text-center bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md "
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Updated to teal */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start shopping?</h2>
          <Link 
            to="/products" 
            className="inline-block bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-3 rounded-lg font-medium hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
