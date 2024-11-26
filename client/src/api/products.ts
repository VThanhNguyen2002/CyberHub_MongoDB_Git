import axios from 'axios';

const token = localStorage.getItem('token');

export const addProduct = async (productData: any) => {
  return axios.post('/api/products', productData, {
    headers: { Authorization: `${token}` },
  });
};

export const updateProduct = async (id: string, productData: any) => {
  return axios.put(`/api/products/${id}`, productData, {
    headers: { Authorization: `${token}` },
  });
};

export const deleteProduct = async (id: string) => {
  return axios.delete(`/api/products/${id}`, {
    headers: { Authorization: `${token}` },
  });
};
