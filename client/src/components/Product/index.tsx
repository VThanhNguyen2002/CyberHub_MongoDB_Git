import React, { useEffect, useState } from 'react';
import ProductItem from '@components/ProductItem';
import styles from './Product.module.css';

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

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.productContainer}>
      {products.map(product => (
        <div key={product._id} className={styles.productCard}>
          <ProductItem
            name={product.name}
            price={product.price}
            discount={product.discount}
            stock={product.stock}
            image_url={product.image_url}
            basic_specs={product.basic_specs}
            rating={product.rating}
            category={product.category}
            description={product.description}
          />
        </div>
      ))}
    </div>
  );
};

export default Product;
