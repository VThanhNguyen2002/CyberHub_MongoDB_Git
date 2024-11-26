import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/logo1.png';
import LoginPopUp from '../LoginPopUp';
import { toast } from 'react-toastify';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginPopUpVisible, setIsLoginPopUpVisible] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const openLoginPopUp = () => setIsLoginPopUpVisible(true);

  const handleLogout = () => {
    // Xóa dữ liệu trong localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');

    // Cập nhật trạng thái username
    setUsername(null);

    // Hiển thị thông báo và điều hướng về trang chủ
    toast.success('Đăng xuất thành công');
    navigate('/');
  };

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

    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target as Node)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

    // Lắng nghe thay đổi trong localStorage (đồng bộ giữa các tab)
    const handleStorageChange = () => {
      const updatedUsername = localStorage.getItem('username');
      setUsername(updatedUsername);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
              {/* Thêm các danh mục khác nếu cần */}
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
          {username ? (
            <div
              className={styles.iconItem}
              onClick={toggleProfileDropdown}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <i className="fa fa-user"></i>
              <span>{username}</span>
              {isProfileDropdownOpen && (
                <div className={styles.profileDropdown} ref={profileDropdownRef}>
                  <ul>
                    <li onClick={() => navigate('/profile')}>Thông tin tài khoản</li>
                    <li onClick={handleLogout}>Đăng xuất</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div
              className={styles.iconItem}
              onClick={openLoginPopUp}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa fa-user"></i>
              <span>Đăng nhập</span>
            </div>
          )}
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
