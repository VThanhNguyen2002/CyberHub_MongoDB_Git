import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './RegisterPopUp.module.css';

const MySwal = withReactContent(Swal);

interface RegisterPopUpProps {
  onClose: () => void;
}

const RegisterPopUp: React.FC<RegisterPopUpProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!email || !username || !password || !confirmPassword) {
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập đầy đủ thông tin!',
      });
      return;
    }
    if (password !== confirmPassword) {
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Mật khẩu không khớp!',
      });
      return;
    }
    MySwal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Đăng ký thành công!',
    }).then(() => onClose());
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
