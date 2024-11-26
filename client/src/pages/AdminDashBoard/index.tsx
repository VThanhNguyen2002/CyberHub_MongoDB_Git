// AdminDashboard/index.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  Tabs, Tab, Select, MenuItem, InputLabel, FormControl,
} from '@mui/material';
import styles from './AdminDashboard.module.css';

interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  discount: number;
  stock: number;
  description: string;
  image_url: string;
  basic_specs: string;
  rating: number;
}

interface User {
  _id?: string;
  email: string;
  username: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: '',
    discount: 0,
    stock: 0,
    description: '',
    image_url: '',
    basic_specs: '',
    rating: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState<string[]>(['Mouse', 'Laptop', 'Keyboard', 'Case']);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [openChatDialog, setOpenChatDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      toast.error('Bạn không có quyền truy cập trang này');
      window.location.href = '/';
    } else {
      fetchProducts();
      fetchUsers();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      // Lấy danh sách categories
      const uniqueCategories = Array.from(new Set(response.data.map((p: Product) => p.category)));
      setCategories(uniqueCategories);
    } catch (error) {
      toast.error('Lỗi khi lấy danh sách sản phẩm');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Lọc ra các admin khác
      const filteredUsers = response.data.filter((user: User) => user.role !== 'admin');
      setUsers(filteredUsers);
    } catch (error) {
      toast.error('Lỗi khi lấy danh sách người dùng');
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct({
      name: '',
      price: 0,
      category: '',
      discount: 0,
      stock: 0,
      description: '',
      image_url: '',
      basic_specs: '',
      rating: 0,
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Xóa sản phẩm thành công');
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa sản phẩm');
    }
  };

  const handleSaveProduct = async () => {
    // Kiểm tra xem tất cả các trường đã được điền đầy đủ chưa
    for (const key in currentProduct) {
      if (
        currentProduct[key as keyof Product] === '' ||
        currentProduct[key as keyof Product] === null ||
        currentProduct[key as keyof Product] === undefined
      ) {
        toast.error('Vui lòng điền đầy đủ thông tin sản phẩm');
        return;
      }
    }

    try {
      if (isEditing) {
        await axios.put(`/api/products/${currentProduct._id}`, currentProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        await axios.post('/api/products', currentProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Thêm sản phẩm thành công');
      }
      setOpenDialog(false);
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi lưu sản phẩm');
    }
  };

  // Xử lý người dùng
  const handleDeleteUser = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Xóa người dùng thành công');
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa người dùng');
    }
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Lọc sản phẩm theo danh mục
  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  // Chat với người dùng
  const handleOpenChat = (userId: string) => {
    setSelectedUserId(userId);
    fetchChatMessages(userId);
    setOpenChatDialog(true);
  };

  const fetchChatMessages = async (userId: string) => {
    try {
      const response = await axios.get(`/api/chat/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatMessages(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy tin nhắn:', error);
    }
  };

  const sendChatMessage = async () => {
    if (chatInput.trim()) {
      try {
        const response = await axios.post(
          '/api/chat/admin',
          {
            content: chatInput,
            userId: selectedUserId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChatMessages((prev) => [...prev, response.data]);
        setChatInput('');
      } catch (error) {
        console.error('Lỗi khi gửi tin nhắn:', error);
      }
    }
  };

  const handleLogout = () => {
    // Xóa token và role khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Hiển thị thông báo
    toast.success('Trở về thành công!');

    // Điều hướng về trang chủ
    navigate('/');
  };

  return (
    <div className={styles.adminDashboard}>
      <h2>Admin Dashboard</h2>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        style={{ marginBottom: '20px' }}
      >
        Trở về
      </Button>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Sản Phẩm" />
        <Tab label="Người Dùng" />
      </Tabs>

      {currentTab === 0 && (
        <div>
          <Button className={styles.addButton} variant="contained" color="primary" onClick={handleAddProduct}>
            Thêm Sản Phẩm
          </Button>

          {/* Bộ lọc danh mục */}
          <FormControl className={styles.filterFormControl}>
            <InputLabel>Danh Mục</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as string)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Sản Phẩm</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Danh Mục</TableCell>
                  <TableCell>Số Lượng Tồn Kho</TableCell>
                  <TableCell>Hành Động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product: Product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price.toLocaleString()} VND</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditProduct(product)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteProduct(product._id!)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog thêm/sửa sản phẩm */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{isEditing ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Tên Sản Phẩm"
                fullWidth
                value={currentProduct.name || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Giá"
                type="text"
                fullWidth
                value={
                  currentProduct.price !== undefined
                    ? currentProduct.price.toLocaleString()
                    : ''
                }
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  if (!isNaN(Number(value))) {
                    setCurrentProduct({ ...currentProduct, price: Number(value) });
                  }
                }}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Danh Mục</InputLabel>
                <Select
                  value={currentProduct.category || ''}
                  onChange={(e) => {
                    if (e.target.value === 'new') {
                      setCurrentProduct({ ...currentProduct, category: '' });
                    } else {
                      setCurrentProduct({ ...currentProduct, category: e.target.value });
                    }
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                  <MenuItem value="new">Thêm Danh Mục Mới</MenuItem>
                </Select>
              </FormControl>
              {currentProduct.category === '' && (
                <TextField
                  margin="dense"
                  label="Danh Mục Mới"
                  fullWidth
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                />
              )}
              <TextField
                margin="dense"
                label="Giảm Giá (%)"
                type="number"
                fullWidth
                value={currentProduct.discount || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, discount: Number(e.target.value) })
                }
              />
              <TextField
                margin="dense"
                label="Số Lượng Tồn Kho"
                type="number"
                fullWidth
                value={currentProduct.stock || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })
                }
              />
              <TextField
                margin="dense"
                label="Mô Tả"
                fullWidth
                multiline
                rows={4}
                value={currentProduct.description || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, description: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="URL Ảnh"
                fullWidth
                value={currentProduct.image_url || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, image_url: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Thông Số Cơ Bản"
                fullWidth
                value={currentProduct.basic_specs || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, basic_specs: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Đánh Giá"
                type="number"
                fullWidth
                value={currentProduct.rating || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, rating: Number(e.target.value) })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Hủy
              </Button>
              <Button onClick={handleSaveProduct} color="primary">
                Lưu
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {currentTab === 1 && (
        <div>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Người Dùng</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Vai Trò</TableCell>
                  <TableCell>Hành Động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: User) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenChat(user._id!)}
                      >
                        Chat
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteUser(user._id!)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog Chat */}
          <Dialog
            open={openChatDialog}
            onClose={() => setOpenChatDialog(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Chat với người dùng</DialogTitle>
            <DialogContent>
              <div className={styles.chatContainer}>
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.sender === 'admin' ? styles.adminMessage : styles.userMessage
                    }
                  >
                    <div className={styles.messageContent}>{message.content}</div>
                    <div className={styles.messageTimestamp}>
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <TextField
                margin="dense"
                label="Nhập tin nhắn"
                fullWidth
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenChatDialog(false)} color="primary">
                Đóng
              </Button>
              <Button onClick={sendChatMessage} color="primary">
                Gửi
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
