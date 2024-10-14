import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <h4>VỀ CYBERHUB</h4>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tuyển dụng</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>CHÍNH SÁCH</h4>
          <ul>
            <li><a href="#">Chính sách bảo hành</a></li>
            <li><a href="#">Chính sách thanh toán</a></li>
            <li><a href="#">Chính sách giao hàng</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>THÔNG TIN</h4>
          <ul>
            <li><a href="#">Hệ thống cửa hàng</a></li>
            <li><a href="#">Hướng dẫn mua hàng</a></li>
            <li><a href="#">Tra cứu địa chỉ bảo hành</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)</h4>
          <ul>
            <li>Mua hàng: <a href="tel:19005301">1900.5301</a></li>
            <li>Bảo hành: <a href="tel:19005325">1900.5325</a></li>
            <li>Kiếu nại: <a href="tel:18006173">1800.6173</a></li>
            <li>Email: <a href="mailto:cskh@cyberhub.com">cskh@cyberhub.com</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
