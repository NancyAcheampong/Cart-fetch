// Cart Item Component
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import type { Product } from '../../types';
import styles from './CartItem.module.css';

type CartItemProps = {
  product: Product;
  quantity: number;
  onRemoveFromCart?: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
};

const CartItem = ({
  product,
  quantity,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartItemProps) => {
  const itemTotal = product.price * quantity;

  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.cartItem}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.productName}
            className={styles.productImage}
          />
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productDetails}>
            <h3 className={styles.productName}>{product.productName}</h3>
            <div className={styles.productMeta}>
              {product.productSize && (
                <span className={styles.metaItem}>{product.productSize}</span>
              )}
              {product.productColor && (
                <span className={styles.metaItem}>{product.productColor}</span>
              )}
            </div>
            <p className={styles.productPrice}>
              {formatCurrency(product.price)}
              <span className={styles.perUnit}> / unit</span>
            </p>
          </div>

          <div className={styles.actions}>
            <div className={styles.quantityControl}>
              <button
                className={styles.quantityButton}
                onClick={onDecreaseQuantity}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={onIncreaseQuantity}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className={styles.priceAndRemove}>
              <p className={styles.itemTotal}>{formatCurrency(itemTotal)}</p>
              <button
                className={styles.removeButton}
                onClick={onRemoveFromCart}
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

// Re-export types for backward compatibility
export type { Product as ProductDetails, CartItem as CartItems } from '../../types';
