import React, { useEffect, useState } from 'react';
import ProductItem from '@components/ProductItem';
import { Row, Col } from 'antd';

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
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
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
          />
        </Col>
      ))}
    </Row>
  );
};

export default FetchDataPage;