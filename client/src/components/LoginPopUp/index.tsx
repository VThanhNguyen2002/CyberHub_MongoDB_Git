import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './PopUp.module.css';
import RegisterPopUp from '../RegisterPopUp';

const MySwal = withReactContent(Swal);

interface LoginPopUpProps {
  onClose: () => void;
}

const LoginPopUp: React.FC<LoginPopUpProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập đầy đủ thông tin!',
      });
      return;
    }
    MySwal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Đăng nhập thành công!',
    }).then(() => onClose());
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
