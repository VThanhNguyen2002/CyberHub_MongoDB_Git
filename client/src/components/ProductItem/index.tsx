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
      <div className={styles.specsContainer}>
        {specs.map((spec, index) => (
          <div key={index} className={styles.specItem}>
            <i
              className={`fas fa-${
                category === 'Monitor'
                  ? 'desktop'
                  : category === 'Laptop'
                  ? 'laptop'
                  : category === 'Mouse'
                  ? 'mouse'
                  : category === 'Keyboard'
                  ? 'keyboard'
                  : 'box'
              }`}
            ></i>{' '}
            {spec}
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
  let specs = [];
  switch (category) {
    case 'Monitor':
      specs = description.match(/(\d+\.?\d*) inch|Full HD|IPS|2K|180Hz|100Hz/g);
      break;
    case 'Laptop':
      specs = description.match(/(Intel.*|AMD.*|\d+GB RAM|\d+GB SSD|\d+\.?\d* inch)/g);
      break;
    case 'Mouse':
      specs = description.match(/(\d+,\d+ DPI|nút lập trình|Wireless|Off White)/g);
      break;
    case 'Keyboard':
      specs = description.match(/(Switch|Wireless|RGB|Beta|Brown Switch|Blue Switch)/g);
      break;
    case 'Case':
      specs = description.match(/(Black|RGB|kích thước|màu đen)/g);
      break;
    default:
      specs = [];
  }
  return specs && specs.length > 0 ? specs : ['Thông tin không có sẵn'];
};

export default ProductItem;
