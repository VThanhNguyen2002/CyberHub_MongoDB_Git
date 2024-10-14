import React, { useState } from 'react';
import styles from './Header.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/logo1.png';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();  // Sử dụng hook useNavigate để điều hướng

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Điều hướng đến trang LaptopPage khi bấm vào Laptop
  const handleLaptopClick = () => {
    navigate('/laptops');
  };

  // Điều hướng đến trang MonitorPage khi bấm vào Màn hình
  const handleMonitorClick = () => {
    navigate('/monitors');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>
        <button className={styles.menuButton} onClick={toggleDropdown}>
          Danh mục
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <li onClick={handleLaptopClick}><i className="fa fa-laptop"></i> Laptop</li>
              {/* <li><i className="fa fa-gamepad"></i> Laptop Gaming</li>
              <li><i className="fa fa-desktop"></i> PC GVN</li> */}
              <li onClick={handleMonitorClick}><i className="fa fa-tv"></i> Màn hình</li> {/* Thêm Màn Hình */}
              {/* Các danh mục khác */}
            </ul>
          </div>
        )}
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Bạn cần tìm gì?" className={styles.searchInput} />
          <button className={styles.searchButton}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className={styles.icons}>
          <div className={styles.iconItem}>
            <i className="fa fa-phone"></i>
            <span>Hotline 1900.5301</span>
          </div>
          <div className={styles.iconItem}>
            <i className="fa fa-map-marker"></i>
            <span>Hệ thống Showroom</span>
          </div>
          <div className={styles.iconItem}>
            <i className="fa fa-camera"></i>
            <span>Tra cứu đơn hàng</span>
          </div>
          <div className={styles.iconItem} onClick={handleCartClick} style={{ cursor: 'pointer' }}>
            <i className="fa fa-shopping-cart"></i>
            <span>Giỏ hàng</span>
          </div>
          <div className={styles.iconItem} onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
            <i className="fa fa-user"></i>
            <span>Đăng nhập</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
