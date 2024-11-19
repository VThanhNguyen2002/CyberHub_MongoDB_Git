import React, { useState, useEffect } from 'react';
import { 
  FaBars, 
  FaTimes, 
  FaVolumeUp, 
  FaUserCircle, 
  FaComments, 
  FaRegSmile 
} from 'react-icons/fa';
import styles from './Chatbox.module.css';
import logo from '../../assets/logo1.png';

const Chatbox = () => {
  const [messages, setMessages] = useState<
    { text: string; timestamp: string; sender: string }[]
  >([]);
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Hiển thị tin nhắn đầu tiên sau 30 giây
    const firstMessageTimer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'CYBERHUB đang có nhiều chương trình khuyến mãi và ưu đãi hấp dẫn. Anh/Chị có thể nhắn tin vào khung chat để được tư vấn chi tiết.',
          timestamp: 'Vừa xong',
          sender: 'admin',
        },
      ]);
    }, 30000);

    // Hiển thị tin nhắn thứ hai sau 1 phút 30 giây
    const secondMessageTimer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Nếu anh/chị vẫn chưa chọn được sản phẩm nào phù hợp hãy nhắn vào khung chat, CYBERHUB sẵn lòng giải đáp mọi thắc mắc.',
          timestamp: 'Vừa xong',
          sender: 'admin',
        },
      ]);
    }, 90000);

    return () => {
      clearTimeout(firstMessageTimer);
      clearTimeout(secondMessageTimer);
    };
  }, []);

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

  const sendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          text: inputValue,
          timestamp: 'Vừa xong',
          sender: 'user',
        },
      ]);
      setInputValue('');
    }
  };

  return (
    <>
      {isChatVisible ? (
        <div className={`${styles.chatbox} ${isChatVisible ? styles.show : styles.hide}`}>
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
                  {message.text}
                  <div className={styles.timestamp}>
                    {message.sender === 'admin' ? 'CyberHub · ' : 'Khách hàng · '}
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input and Emoji Picker */}
          <div className={styles.chatboxFooter}>
            <FaRegSmile onClick={toggleEmojiPicker} className={styles.emojiIcon} />
            {showEmojiPicker && (
              <div className={styles.emojiPicker}>
                <Picker onEmojiSelect={(emoji) => setInputValue((prev) => prev + emoji.native)} />
              </div>
            )}
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
