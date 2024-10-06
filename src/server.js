const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// Định nghĩa schema sản phẩm đầy đủ
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


mongoose.connect('mongodb://localhost:27017/DB_CyberHub')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});
