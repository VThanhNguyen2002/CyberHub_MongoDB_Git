import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Trang bạn tìm kiếm không tồn tại!</p>
      <Link to="/" className={styles.homeButton}>
        Quay lại Trang Chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
