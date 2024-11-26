// routes/products.js

const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Lấy danh sách sản phẩm (khách hàng và admin đều có thể truy cập)
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Thêm sản phẩm (chỉ admin)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Sửa sản phẩm (chỉ admin)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
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

// Xóa sản phẩm (chỉ admin)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
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

module.exports = router;
