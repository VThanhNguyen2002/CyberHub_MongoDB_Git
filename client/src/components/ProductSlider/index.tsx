import React, { useState } from 'react';
import ProductItem from '@components/ProductItem';
import styles from './ProductSlider.module.css';

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

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < products.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.sliderBtn} onClick={prevSlide}>&lt;</button>
      <div className={styles.slider}>
        <div
          className={styles.productTrack}
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {products.map((product) => (
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
      </div>
      <button className={styles.sliderBtn} onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default ProductSlider;
