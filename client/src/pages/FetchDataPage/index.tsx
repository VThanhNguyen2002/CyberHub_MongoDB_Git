import React from 'react';
import { useEffect, useState } from 'react';
import ProductItem from '@components/ProductItem';
import { Row, Col, Spin  } from 'antd';

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

const FetchDataPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NODE_ENV === 'production'
          ? 'https://cyber-hub-mongo-db-git-vietthanhnguyen2006s-projects.vercel.app'
          : 'http://localhost:5000';
  
        const response = await fetch(`${apiUrl}/products`);
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
  

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Row gutter={[16, 16]} justify="center">
      {products.map(product => (
        <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={4}>
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
        </Col>
      ))}
    </Row>
  );
};

export default FetchDataPage;