// models/ProductModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  discount: Number,
  stock: Number,
  description: String,
  image_url: String,
  basic_specs: String,
  rating: Number,
});

module.exports = mongoose.model('Product', productSchema, 'Products');
