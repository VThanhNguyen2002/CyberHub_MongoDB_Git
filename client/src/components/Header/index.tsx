import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/logo1.png';
import LoginPopUp from '../LoginPopUp';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginPopUpVisible, setIsLoginPopUpVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openLoginPopUp = () => setIsLoginPopUpVisible(true);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }

    if (
      loginRef.current &&
      !loginRef.current.contains(event.target as Node)
    ) {
      setIsLoginPopUpVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>
        <button className={styles.menuButton} onClick={toggleDropdown}>
          Danh mục
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            <ul>
              <li onClick={() => navigate('/laptops')}>
                <i className="fa fa-laptop"></i> Laptop
              </li>
              <li onClick={() => navigate('/monitors')}>
                <i className="fa fa-tv"></i> Màn hình
              </li>
            </ul>
          </div>
        )}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Bạn cần tìm gì?"
            className={styles.searchInput}
          />
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
            <i className="fa fa-truck"></i>
            <span>Tra cứu đơn hàng</span>
          </div>

          <div
            className={styles.iconItem}
            onClick={() => navigate('/cart')}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-shopping-cart"></i>
            <span>Giỏ hàng</span>
          </div>
          <div
            className={styles.iconItem}
            onClick={openLoginPopUp}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-user"></i>
            <span>Đăng nhập</span>
          </div>
        </div>
      </div>
      {isLoginPopUpVisible && (
        <div ref={loginRef}>
          <LoginPopUp onClose={() => setIsLoginPopUpVisible(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
