import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  Button, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import Product from '../Product';

interface ProductDialogProps {
  open: boolean;
  isEditing: boolean;
  categories: string[];
  currentProduct: Partial<Product>;
  onClose: () => void;
  onSave: () => void;
  setCurrentProduct: React.Dispatch<React.SetStateAction<Partial<Product>>>;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  isEditing,
  categories,
  currentProduct,
  onClose,
  onSave,
  setCurrentProduct,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}</DialogTitle>
      <DialogContent>
              <TextField
                margin="dense"
                label="Tên Sản Phẩm"
                fullWidth
                value={currentProduct.name || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Giá"
                type="text"
                fullWidth
                value={
                  currentProduct.price !== undefined
                    ? currentProduct.price.toLocaleString()
                    : ''
                }
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  if (!isNaN(Number(value))) {
                    setCurrentProduct({ ...currentProduct, price: Number(value) });
                  }
                }}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Danh Mục</InputLabel>
                <Select
                  value={currentProduct.category || ''}
                  onChange={(e) => {
                    if (e.target.value === 'new') {
                      setCurrentProduct({ ...currentProduct, category: '' });
                    } else {
                      setCurrentProduct({ ...currentProduct, category: e.target.value });
                    }
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                  <MenuItem value="new">Thêm Danh Mục Mới</MenuItem>
                </Select>
              </FormControl>
              {currentProduct.category === '' && (
                <TextField
                  margin="dense"
                  label="Danh Mục Mới"
                  fullWidth
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                />
              )}
              <TextField
                margin="dense"
                label="Giảm Giá (%)"
                type="number"
                fullWidth
                value={currentProduct.discount || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, discount: Number(e.target.value) })
                }
              />
              <TextField
                margin="dense"
                label="Số Lượng Tồn Kho"
                type="number"
                fullWidth
                value={currentProduct.stock || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })
                }
              />
              <TextField
                margin="dense"
                label="Mô Tả"
                fullWidth
                multiline
                rows={4}
                value={currentProduct.description || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, description: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="URL Ảnh"
                fullWidth
                value={currentProduct.image_url || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, image_url: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Thông Số Cơ Bản"
                fullWidth
                value={currentProduct.basic_specs || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, basic_specs: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Đánh Giá"
                type="number"
                fullWidth
                value={currentProduct.rating || ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, rating: Number(e.target.value) })
                }
              />
            </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={onSave} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
