// server.js

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Định nghĩa schema và model
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

const ProductModel = mongoose.model('Product', productSchema, 'Products');

// Định nghĩa route
app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
