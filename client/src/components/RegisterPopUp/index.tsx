// RegisterPopUp.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './RegisterPopUp.module.css';

interface RegisterPopUpProps {
  onClose: () => void;
}

const RegisterPopUp: React.FC<RegisterPopUpProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      toast.error('Email phải có định dạng @gmail.com');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      return;
    }

    try {
      await axios.post('/api/auth/register', { email, username, password });
      toast.success('Đăng ký thành công!');
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popUp}>
        <h2>Tạo tài khoản</h2>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <div className={styles.inputGroup}>
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.loginButton} onClick={handleRegister}>
            Đăng ký
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopUp;
