// HomePage.tsx

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Chatbox from '../../components/Chatbot';
import ProductSlider from '../../components/ProductSlider';
import styles from './HomePage.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  discount: number;
  stock: number;
  description: string;
  image_url: string;
  basic_specs: string;
  rating: number;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const laptops = products.filter((product) => product.category === 'Laptop');
  const monitors = products.filter((product) => product.category === 'Monitor');
  const mice = products.filter((product) => product.category === 'Mouse');
  const keyboards = products.filter((product) => product.category === 'Keyboard');
  const cases = products.filter((product) => product.category === 'Case');

  return (
    <div className={styles.homePageContainer}>
      <Header />
      <h2 className={styles.categoryTitle}>Laptops</h2>
      <ProductSlider products={laptops} />
      <h2 className={styles.categoryTitle}>Màn hình</h2>
      <ProductSlider products={monitors} />
      <h2 className={styles.categoryTitle}>Chuột</h2>
      <ProductSlider products={mice} />
      <h2 className={styles.categoryTitle}>Bàn phím</h2>
      <ProductSlider products={keyboards} />
      <h2 className={styles.categoryTitle}>Case</h2>
      <ProductSlider products={cases} />
      <Footer />
      <Chatbox />
    </div>
  );
};

export default HomePage;
