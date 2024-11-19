import axios from 'axios';

// const API_URL = process.env.VITE_API_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${process.env.VITE_API_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

// Hàm sửa sản phẩm
export const updateProduct = async (id: string, updatedProduct: any) => {
  try {
    const response = await axios.put(`${process.env.VITE_API_URL}/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    throw new Error('Error updating product');
  }
};

// Hàm xóa sản phẩm
export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${process.env.VITE_API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting product');
  }
};

// Hàm thêm sản phẩm mới
export const createProduct = async (newProduct: any) => {
  try {
    const response = await axios.post(`${process.env.VITE_API_URL}/products`, newProduct);
    return response.data;
  } catch (error) {
    throw new Error('Error creating product');
  }
};
