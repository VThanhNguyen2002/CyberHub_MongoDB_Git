// middlewares/authorize.js

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Truy cập bị từ chối' });
    }
    next();
  };
};

module.exports = authorize;
