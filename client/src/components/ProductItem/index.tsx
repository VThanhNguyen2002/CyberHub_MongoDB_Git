import React from 'react';
import { Card, Badge, Rate, Typography } from 'antd';
import { DesktopOutlined } from '@ant-design/icons';
import styles from './ProductItems.module.css';

const { Meta } = Card;
const { Text } = Typography;

interface ProductItemProps {
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

const ProductItem: React.FC<ProductItemProps> = ({
  name,
  price,
  discount,
  image_url,
  basic_specs,
  rating,
}) => {
  return (
    <Badge.Ribbon text={`${discount}% Off`} color="red">
      <Card
        hoverable
        cover={<img src={image_url} alt={name} className={styles.image} />}
        className={styles.productItem}
      >
        <Meta title={<Text strong>{name}</Text>} />
        <Text className={styles.price} strong>{price.toLocaleString('vi-VN')}đ</Text>
        <div className={styles.specsContainer}>
          {basic_specs.split(', ').map((spec, index) => (
            <div key={index} className={styles.specItem}><DesktopOutlined /> {spec}</div>
          ))}
        </div>
        <Rate allowHalf defaultValue={rating} />
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductItem;