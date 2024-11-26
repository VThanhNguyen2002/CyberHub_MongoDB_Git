// server/routes/auth.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

require('dotenv').config();

// Đăng ký
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
  }

  if (!email.endsWith('@gmail.com')) { // Nếu vẫn cần kiểm tra định dạng email
    return res.status(400).json({ message: 'Email phải có định dạng @gmail.com' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc tên đăng nhập đã được sử dụng' });
    }

    const user = new User({ email, username, password });
    await user.save();

    res.json({ message: 'Đăng ký thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Đăng ký thất bại' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role, username: user.username, userId: user._id });
  } catch (error) {
    console.error('Error in /login route:', error);
    res.status(500).json({ message: 'Đăng nhập thất bại' });
  }
});

module.exports = router;
