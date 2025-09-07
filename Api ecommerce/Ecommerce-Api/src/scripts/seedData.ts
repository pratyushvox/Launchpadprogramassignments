import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';

dotenv.config();

const sampleUsers = [
  {
    username: "alex_p",
    email: "alex.p@example.com",
    age: 28,
    country: "USA",
    last_login: new Date("2023-10-25T10:00:00Z"),
    followers: 1200,
    interests: ["programming", "hiking", "music"],
    profile: { theme: "dark", bio: "Software developer and nature enthusiast." },
    devices: [
      { type: "mobile", os: "Android", last_seen: new Date("2023-10-25T09:55:00Z") },
      { type: "desktop", os: "Windows", last_seen: new Date("2023-10-24T15:30:00Z") }
    ]
  },
  {
    username: "jane_doe",
    email: "jane.d@workplace.com",
    age: 34,
    country: "Canada",
    last_login: new Date("2023-11-01T12:30:00Z"),
    followers: 850,
    interests: ["travel", "photography", "music"],
    profile: { theme: "light" },
    subscription: { tier: "premium", start_date: new Date("2023-01-01T00:00:00Z") }
  },
  {
    username: "sam_g",
    email: "sam.g@example.com",
    age: 22,
    country: "UK",
    last_login: new Date("2023-09-15T18:45:00Z"),
    followers: 2500,
    interests: ["gaming", "streaming"],
    profile: { theme: "dark", bio: "Pro gamer and streamer." },
    devices: [
      { type: "desktop", os: "Windows", last_seen: new Date("2023-09-15T18:40:00Z") }
    ]
  },
  {
    username: "chris_b",
    email: "chris.b@inbox.com",
    age: 45,
    country: "Australia",
    last_login: new Date("2023-10-30T05:00:00Z"),
    followers: 50,
    interests: ["gardening", "cooking"],
    profile: { theme: "light", bio: "Loves the outdoors." }
  },
  {
    username: "maria_s",
    email: "maria.s@example.com",
    age: 31,
    country: "Germany",
    last_login: new Date("2023-11-02T20:00:00Z"),
    followers: 1800,
    interests: ["art", "history", "travel"],
    profile: { theme: "dark", bio: "Museum curator." },
    subscription: { tier: "premium", start_date: new Date("2022-06-15T00:00:00Z") }
  },
  {
    username: "another_user",
    email: "another@example.com",
    age: 29,
    country: "USA",
    followers: 95,
    interests: ["music", "programming"],
    profile: { theme: "light", bio: "Profile setup pending" }
  }
];

const sampleProducts = [
  {
    name: "Acoustic Guitar",
    category: "String",
    brand: "GuitarCo",
    price: 499.99,
    stock: 15,
    features: ["Solid Spruce Top", "Mahogany Back & Sides"],
    reviews: [
      { user: "Alice", rating: 5, comment: "Amazing sound!" },
      { user: "Bob", rating: 4, comment: "Great for beginners." }
    ]
  },
  {
    name: "Electric Piano",
    category: "Keyboard",
    brand: "KeyMaster",
    price: 799.0,
    stock: 8,
    features: ["88 Weighted Keys", "Multiple Voices"],
    reviews: [
      { user: "Charlie", rating: 5, comment: "Love the feel of the keys." }
    ]
  },
  {
    name: "Drum Kit",
    category: "Percussion",
    brand: "BeatKing",
    price: 1200.5,
    stock: 5,
    features: ["5-Piece Kit", "Cymbals Included"],
    reviews: []
  },
  {
    name: "Ukulele",
    category: "String",
    brand: "AlohaTune",
    price: 89.99,
    stock: 30,
    features: ["Soprano Size", "Mahogany Body"],
    reviews: [
      { user: "Alice", rating: 4, comment: "Cute and fun!" }
    ]
  },
  {
    name: "Bass Guitar",
    category: "String",
    brand: "BassPro",
    price: 550.0,
    stock: 10,
    features: ["4-String", "Active Pickups"],
    reviews: []
  }
];

export async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-db';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Insert users and products
    const createdUsers = await User.insertMany(sampleUsers);
    const createdProducts = await Product.insertMany(sampleProducts);

    console.log('👥 Created users:', createdUsers.length);
    console.log('📦 Created products:', createdProducts.length);

    // Create sample orders using the actual created user and product IDs
    const sampleOrders = [
      {
        customer_id: createdUsers[0]._id, // alex_p
        order_date: new Date("2023-01-10T10:00:00Z"),
        items: [
          { product_id: createdProducts[0]._id, quantity: 1, unit_price: 499.99 }, // Acoustic Guitar
          { product_id: createdProducts[3]._id, quantity: 2, unit_price: 89.99 }   // Ukulele
        ],
        status: "completed",
        total_amount: 679.97
      },
      {
        customer_id: createdUsers[1]._id, // jane_doe
        order_date: new Date("2023-01-15T14:30:00Z"),
        items: [
          { product_id: createdProducts[1]._id, quantity: 1, unit_price: 799.0 } // Electric Piano
        ],
        status: "pending",
        total_amount: 799.0
      },
      {
        customer_id: createdUsers[0]._id, // alex_p (repeat customer)
        order_date: new Date("2023-02-01T09:00:00Z"),
        items: [
          { product_id: createdProducts[0]._id, quantity: 1, unit_price: 499.99 } // Acoustic Guitar
        ],
        status: "completed",
        total_amount: 499.99
      },
      {
        customer_id: createdUsers[2]._id, // sam_g
        order_date: new Date("2023-02-05T11:45:00Z"),
        items: [
          { product_id: createdProducts[2]._id, quantity: 1, unit_price: 1200.5 } // Drum Kit
        ],
        status: "completed",
        total_amount: 1200.5
      },
      {
        customer_id: createdUsers[1]._id, // jane_doe (repeat customer)
        order_date: new Date("2023-03-01T16:00:00Z"),
        items: [
          { product_id: createdProducts[4]._id, quantity: 1, unit_price: 550.0 } // Bass Guitar
        ],
        status: "pending",
        total_amount: 550.0
      }
    ];

    const createdOrders = await Order.insertMany(sampleOrders);
    console.log('📋 Created orders:', createdOrders.length);

    // Display summary
    console.log('\n Database seeded successfully!');
    console.log('\n Summary:');
    console.log(` Users: ${createdUsers.length}`);
    console.log(` Products: ${createdProducts.length}`);
    console.log(` Orders: ${createdOrders.length}`);

    console.log('\nSample IDs for testing:');
    console.log('User IDs:');
    createdUsers.forEach((user, index) => {
      console.log(`  ${user.username}: ${user._id}`);
    });
    
    console.log('\nProduct IDs:');
    createdProducts.forEach((product, index) => {
      console.log(`  ${product.name}: ${product._id}`);
    });

    console.log('\nOrder IDs:');
    createdOrders.forEach((order, index) => {
      console.log(`  Order ${index + 1}: ${order._id}`);
    });

    console.log('\n Ready to test your API!');
    console.log('Try these endpoints:');
    console.log('  GET http://localhost:3000/api/users');
    console.log('  GET http://localhost:3000/api/products');
    console.log('  GET http://localhost:3000/api/orders');

  } catch (error) {
    console.error(' Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  seedDatabase();
}