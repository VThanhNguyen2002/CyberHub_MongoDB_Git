import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button,
} from '@mui/material';
import styles from './AdminDashboard.module.css';

interface UserListProps {
  users: User[];
  onDeleteUser: (id: string) => void;
  onOpenChat: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDeleteUser, onOpenChat }) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên Người Dùng</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Vai Trò</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onOpenChat(user._id!)}
                >
                  Chat
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDeleteUser(user._id!)}
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
