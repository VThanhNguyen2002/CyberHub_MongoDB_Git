import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Chatbox from '../../components/Chatbot';
import ProductSlider from '../../components/ProductSlider';
import styles from './HomePage.module.css';

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
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.homePageContainer}>
      <Header />
      {/* Truyền products vào ProductSlider */}
      <ProductSlider products={products} />
      <Footer />
      <Chatbox />
    </div>
  );
};

export default HomePage;
