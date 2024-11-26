import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import styles from './AdminDashboard.module.css';

interface ProductListProps {
  products: Product[];
  categories: string[];
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  categories,
  categoryFilter,
  onCategoryFilterChange,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <div>
      {/* Bộ lọc danh mục */}
      <FormControl className={styles.filterFormControl}>
        <InputLabel>Danh Mục</InputLabel>
        <Select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value as string)}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên Sản Phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Danh Mục</TableCell>
              <TableCell>Số Lượng Tồn Kho</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price.toLocaleString()} VND</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onEditProduct(product)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onDeleteProduct(product._id!)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
