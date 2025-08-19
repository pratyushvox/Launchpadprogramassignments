import { useParams, Link } from 'react-router-dom';
import { products } from '../data';
import NotFound from '../Pages/NotFound';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <Link to="/products" className="text-gray-800 hover:underline mb-4 inline-block">
          &larr; Back to Products
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
               
                 <div className="flex items-center mb-4">
  {[...Array(5)].map((_, i) => (
    <i
      key={i}
      className={`fa-star ${i < Math.floor(product.rating || 0) ? 'fas text-yellow-400' : 'far text-gray-300'} w-5 h-5`}
    ></i>
  ))}
  <span className="text-gray-600 ml-2">{product.rating} stars</span>
</div>
                
                
              </div>
              
              <p className="text-2xl font-semibold text-gray-700 mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Category: {product.category}</li>
                  <li>Product ID: {product.id}</li>
                </ul>
              </div>
              
              <button className=" w-full px-3block text-center bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}