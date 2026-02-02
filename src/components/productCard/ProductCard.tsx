// Product Card Component
import { useState } from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
  handleAddToCart: () => void;
};

const ProductCard = ({ product, handleAddToCart }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(product.isLiked ?? false);
  const [isAdding, setIsAdding] = useState(false);

  // Default inStock to true if not provided
  const inStock = product.inStock ?? true;

  const handleAdd = () => {
    if (!inStock) return;
    setIsAdding(true);
    handleAddToCart();
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className={styles.productCard}>
      {/* Stock Badge */}
      <div className={styles.stockBadge}>
        <span className={inStock ? styles.inStock : styles.outOfStock}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Like Button */}
      <button
        className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
        onClick={() => setIsLiked(!isLiked)}
        aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={20} fill={isLiked ? '#ff6b6b' : 'none'} />
      </button>

      {/* Product Image */}
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.productName}
          className={styles.productImage}
        />
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.productName}</h3>
        <div className={styles.productMeta}>
          {product.productSize && (
            <span className={styles.metaItem}>{product.productSize}</span>
          )}
          {product.productColor && (
            <span className={styles.metaItem}>{product.productColor}</span>
          )}
        </div>
        <p className={styles.productPrice}>{formatCurrency(product.price)}</p>
      </div>

      {/* Add to Cart Button */}
      <button
        className={`${styles.addToCartButton} ${isAdding ? styles.added : ''}`}
        onClick={handleAdd}
        disabled={!inStock || isAdding}
      >
        {isAdding ? (
          <>
            <Check size={18} />
            <span>Added!</span>
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;
