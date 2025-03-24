// seed.js
const mongoose = require('mongoose');
const Product = require('./models/productModel');  // Import the Product model
const connectDB = require('./config/db');    // Import the DB connection config

// Product data to seed
const products = [
  {
    name: 'Apple iPhone 13',
    price: 799.99,
    description: 'Latest iPhone with A15 Bionic chip',
    imageUrl: 'https://example.com/iphone13.jpg', // Replace with a real image URL
  },
  {
    name: 'Samsung Galaxy S21',
    price: 749.99,
    description: 'Powerful Android phone with great camera',
    imageUrl: 'https://example.com/galaxyS21.jpg', // Replace with a real image URL
  },
  {
    name: 'Google Pixel 6',
    price: 599.99,
    description: 'Pure Android experience with amazing camera',
    imageUrl: 'https://example.com/pixel6.jpg', // Replace with a real image URL
  },
  {
    name: 'Sony PlayStation 5',
    price: 499.99,
    description: 'Next-gen gaming console with ray tracing',
    imageUrl: 'https://example.com/ps5.jpg', // Replace with a real image URL
  },
  {
    name: 'Dell XPS 13',
    price: 1299.99,
    description: 'Premium ultrabook with Intel Core i7',
    imageUrl: 'https://example.com/xps13.jpg', // Replace with a real image URL
  },
];

// Function to seed the database
const seedProducts = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Delete existing products
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(products);

    console.log('Successfully seeded products!');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
