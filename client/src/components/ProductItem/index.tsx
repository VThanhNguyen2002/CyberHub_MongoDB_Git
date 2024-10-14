import React from 'react';
import styles from './ProductItems.module.css';

interface ProductItemProps {
  name: string;
  price: number;
  discount: number;
  image_url: string;
  description: string;
  category: string;
  rating: number;
  stock: number;
  basic_specs: string;
}


const ProductItem: React.FC<ProductItemProps> = ({
  name,
  price,
  discount,
  image_url,
  description,
  category,
  rating,
}) => {
  // Lấy thông số kỹ thuật dựa trên category
  const specs = getSpecsForCategory(category, description);

  return (
    <div className={styles.card}>
      {discount > 0 && <div className={styles.ribbon}>{discount}% Off</div>}
      <img src={image_url} alt={name} className={styles.image} />
      <h2 className={styles.productTitle}>{name}</h2>
      <p className={styles.price}>
        {price.toLocaleString('vi-VN')}đ
        {discount > 0 && (
          <span className={styles.originalPrice}>
            ({(price / (1 - discount / 100)).toLocaleString('vi-VN')}đ)
          </span>
        )}
      </p>

      {/* Phần render thông số kỹ thuật */}
      <div className={styles.specsContainer}>
      {specs && specs.map((spec, index) => (
        <div key={index} className={styles.specItem}>
          <i className={`fas fa-${category === 'Monitor' ? 'desktop' : category === 'Laptop' ? 'laptop' : 'mouse'}`}></i> {spec}
        </div>
      ))}

      </div>

      <div className={styles.rating}>
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
        <span className={styles.star}>★</span>
        <span className={styles.reviewCount}>(1 đánh giá)</span>
      </div>
    </div>
  );
};

// Hàm phân loại thông số kỹ thuật dựa trên category
const getSpecsForCategory = (category: string, description: string) => {
  switch (category) {
    case 'Monitor':
      return description.match(/(\d+\.?\d*) inch|Full HD/g); // Ví dụ như kích thước và độ phân giải
    case 'Laptop':
      return description.match(/(Intel.*|AMD.*|\d+GB RAM|\d+GB SSD|\d+\.?\d* inch)/g); // CPU, RAM, SSD, Kích thước màn hình
    case 'Mouse':
      return description.match(/(\d+,\d+ DPI|nút lập trình)/g); // DPI và nút lập trình
    default:
      return [];
  }
};

export default ProductItem;
