// routes/chat.js

const express = require('express');
const router = express.Router();
const Message = require('../models/MessageModel');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Lấy tin nhắn giữa admin và user
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;

    // Nếu là admin hoặc chính người dùng
    if (req.user.role === 'admin' || req.user.userId === userId) {
      const messages = await Message.find({ userId }).sort({ timestamp: 1 });
      res.json(messages);
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// User gửi tin nhắn
router.post('/', authenticate, async (req, res) => {
  try {
    const { content } = req.body;
    const message = new Message({
      sender: 'user',
      content,
      userId: req.user.userId,
      timestamp: new Date(),
    });
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Admin gửi tin nhắn
router.post('/admin', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { content, userId } = req.body;
    const message = new Message({
      sender: 'admin',
      content,
      userId,
      timestamp: new Date(),
    });
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
