// client/src/components/LoginPopUp.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './PopUp.module.css';
import RegisterPopUp from '../RegisterPopUp';

interface LoginPopUpProps {
  onClose: () => void;
}

const LoginPopUp: React.FC<LoginPopUpProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('userId', response.data.userId);
      toast.success('Đăng nhập thành công!');
      onClose();
      // Điều hướng đến trang admin nếu là admin
      if (response.data.role === 'admin') {
        window.location.href = '/admin/dashboard';
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  if (isRegistering) {
    return <RegisterPopUp onClose={onClose} />;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popUp}>
        <h2>Đăng nhập hoặc Tạo tài khoản</h2>
        <div className={styles.inputGroup}>
          <label>Tên Đăng Nhập</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.loginButton} onClick={handleLogin}>
            Đăng nhập
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Đóng
          </button>
        </div>
        <p className={styles.registerPrompt}>
          Chưa có tài khoản?{' '}
          <span
            className={styles.registerLink}
            onClick={() => setIsRegistering(true)}
          >
            Hãy đăng ký
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;
