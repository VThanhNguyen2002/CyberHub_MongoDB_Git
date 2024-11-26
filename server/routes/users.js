// server/routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Lấy danh sách người dùng (trừ admin)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Xóa người dùng
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findById(id);
    if (userToDelete.role === 'admin') {
      return res.status(403).json({ message: 'Không thể xóa admin khác' });
    }
    await User.findByIdAndDelete(id);
    res.json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Xóa người dùng thất bại!' });
  }
});

module.exports = router;
