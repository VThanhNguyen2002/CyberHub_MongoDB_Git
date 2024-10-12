require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*'
}));

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Định nghĩa schema và route sản phẩm
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

// API lấy sản phẩm
app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Phục vụ tệp tĩnh từ thư mục client
app.use(express.static(path.join(__dirname, '../client/dist')));

// Đảm bảo tất cả các route không phải API được xử lý bởi React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
