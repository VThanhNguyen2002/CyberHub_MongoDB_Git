import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  Button,
} from '@mui/material';
import styles from './AdminDashboard.module.css';

interface ChatDialogProps {
  open: boolean;
  chatMessages: any[];
  chatInput: string;
  onClose: () => void;
  onSend: () => void;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
}

const ChatDialog: React.FC<ChatDialogProps> = ({
  open,
  chatMessages,
  chatInput,
  onClose,
  onSend,
  setChatInput,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chat với người dùng</DialogTitle>
      <DialogContent>
        <div className={styles.chatContainer}>
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={
                message.sender === 'admin' ? styles.adminMessage : styles.userMessage
              }
            >
              <div className={styles.messageContent}>{message.content}</div>
              <div className={styles.messageTimestamp}>
                {new Date(message.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <TextField
          margin="dense"
          label="Nhập tin nhắn"
          fullWidth
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
        <Button onClick={onSend} color="primary">
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDialog;
