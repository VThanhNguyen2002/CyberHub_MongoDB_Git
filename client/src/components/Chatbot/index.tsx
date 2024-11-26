// Chatbox/index.tsx

import React, { useState, useEffect } from 'react';
import {
  FaBars,
  FaTimes,
  FaVolumeUp,
  FaUserCircle,
  FaComments,
  FaRegSmile,
} from 'react-icons/fa';
import styles from './Chatbox.module.css';
import logo from '../../assets/logo1.png';
import axios from 'axios';

const Chatbox = () => {
  const [messages, setMessages] = useState<
    { content: string; timestamp: string; sender: string }[]
  >([]);
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Lấy userId từ localStorage
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    // Lấy tin nhắn cũ
    if (storedUserId) {
      fetchMessages(storedUserId);
    }

    // Hiển thị tin nhắn đầu tiên sau 30 giây
    const firstMessageTimer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content:
            'CYBERHUB đang có nhiều chương trình khuyến mãi và ưu đãi hấp dẫn. Anh/Chị có thể nhắn tin vào khung chat để được tư vấn chi tiết.',
          timestamp: new Date().toISOString(),
          sender: 'admin',
        },
      ]);
    }, 30000);

    // Hiển thị tin nhắn thứ hai sau 1 phút 30 giây
    const secondMessageTimer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content:
            'Nếu anh/chị vẫn chưa chọn được sản phẩm nào phù hợp hãy nhắn vào khung chat, CYBERHUB sẵn lòng giải đáp mọi thắc mắc.',
          timestamp: new Date().toISOString(),
          sender: 'admin',
        },
      ]);
    }, 90000);

    return () => {
      clearTimeout(firstMessageTimer);
      clearTimeout(secondMessageTimer);
    };
  }, []);

  const fetchMessages = async (userId: string) => {
    try {
      const response = await axios.get(`/api/chat/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy tin nhắn:', error);
    }
  };

  // Toggle emoji picker
  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  // Toggle dropdown menu
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Đóng chatbox và ẩn dropdown
  const closeChatbox = () => {
    setIsChatVisible(false);
    setShowDropdown(false); // Ẩn menu dropdown khi đóng chatbox
  };

  // Mở lại chatbox
  const reopenChatbox = () => setIsChatVisible(true);

  const sendMessage = async () => {
    if (inputValue.trim()) {
      try {
        const response = await axios.post(
          '/api/chat',
          { content: inputValue },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        setMessages((prev) => [...prev, response.data]);
        setInputValue('');
      } catch (error) {
        console.error('Lỗi khi gửi tin nhắn:', error);
      }
    }
  };

  return (
    <>
      {isChatVisible ? (
        <div
          className={`${styles.chatbox} ${isChatVisible ? styles.show : styles.hide}`}
        >
          {/* Header */}
          <div className={styles.chatboxHeader}>
            <div className={styles.headerLeft}>
              <img src={logo} alt="Logo" className={styles.logo} />
              <div className={styles.headerText}>
                <div className={styles.mainTitle}>CyberHub</div>
                <div className={styles.subTitle}>Chat với chúng tôi</div>
              </div>
            </div>
            <div>
              <FaBars className={styles.hamburger} onClick={toggleDropdown} />
              <FaTimes className={styles.closeButton} onClick={closeChatbox} />
            </div>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem} onClick={() => setIsMuted(!isMuted)}>
                <FaVolumeUp />
                {isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              </div>
              <div className={styles.dropdownItem}>
                <FaUserCircle />
                Profile
              </div>
            </div>
          )}

          {/* Content */}
          <div className={styles.chatboxContent}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === 'admin'
                    ? styles.adminMessageContainer
                    : styles.userMessageContainer
                }
              >
                {message.sender === 'admin' ? (
                  <img src={logo} alt="Logo" className={styles.messageLogo} />
                ) : (
                  <FaUserCircle className={styles.messageUserIcon} />
                )}
                <div className={styles.messageBubble}>
                  {message.content}
                  <div className={styles.timestamp}>
                    {message.sender === 'admin' ? 'CyberHub · ' : 'Bạn · '}
                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className={styles.chatboxFooter}>
            <FaRegSmile onClick={toggleEmojiPicker} className={styles.emojiIcon} />
            {/* Nếu cần thêm Emoji Picker, bạn có thể tích hợp thư viện tương ứng */}
            <input
              className={styles.input}
              type="text"
              placeholder="Nhập nội dung..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className={styles.sendButton} onClick={sendMessage}>
              Gửi
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.chatBar} onClick={reopenChatbox}>
          <FaComments className={styles.chatBarIcon} />
          <span>Chat tư vấn - Giải đáp mọi thắc mắc</span>
        </div>
      )}
    </>
  );
};

export default Chatbox;
