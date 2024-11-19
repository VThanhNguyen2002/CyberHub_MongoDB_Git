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

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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


// API chỉnh sửa sản phẩm
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    const result = await ProductModel.findByIdAndUpdate(id, updatedProduct, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// API xóa sản phẩm
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});