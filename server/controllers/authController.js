const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'Email hoặc Tên đăng nhập đã tồn tại' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, email, role: role || 'khach_hang' });
    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi trong quá trình đăng ký' });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi trong quá trình đăng nhập' });
  }
};
