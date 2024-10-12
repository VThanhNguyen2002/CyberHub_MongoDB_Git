// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5000', 'https://cyber-hub-mongo-db-git-vietthanhnguyen2006s-projects.vercel.app']
}));

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Định nghĩa route sản phẩm mà không cần tiền tố /api
app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
