import person1 from '../Images/person-1.png';
import person2 from '../Images/person-2.png';
import person3 from '../Images/person-3.png'
import person4 from '../Images/person-4.png';
export default function About() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">About Pick&Go</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2025, Pick&Go started as a small passion project to bring quality products 
            to customers at affordable prices. What began as a modest online store has now grown into 
            a trusted e-commerce platform serving thousands of happy customers worldwide.
          </p>
          <p className="text-gray-700">
            Our mission is simple: to provide an exceptional shopping experience with a carefully 
            curated selection of products, competitive pricing, and outstanding customer service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
            <p className="text-gray-700">
              We handpick every product in our inventory to ensure they meet our high standards 
              of quality and durability.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Fast Shipping</h3>
            <p className="text-gray-700">
              We process and ship orders within 24 hours, with multiple shipping options to 
              meet your needs.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
            <p className="text-gray-700">
              Our dedicated support team is available 24/7 to answer your questions and 
              resolve any issues.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Meet The Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Pratyush Khadka', role: 'Founder & CEO', image: person1 },
              { name: 'Sishir Thapa', role: 'Head of Operations', image: person2 },
              { name: 'Binod Bhattarai', role: 'Tech Lead', image: person3 },
              { name: 'Akash Bhattarai', role: 'Customer Support', image: person4 }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}