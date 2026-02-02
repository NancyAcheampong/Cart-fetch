// HeadLiner Component for Cart Page
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import styles from './HeadLiner.module.css';

const HeadLiner = () => {
  const { clearCart, itemCount } = useCart();

  return (
    <div className={styles.headLiner}>
      <div className={styles.titleSection}>
        <ShoppingCart size={28} />
        <div>
          <h1 className={styles.title}>Shopping Cart</h1>
          <p className={styles.subtitle}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>
      <button onClick={clearCart} className={styles.clearAllButton}>
        <Trash2 size={18} />
        <span>Clear All</span>
      </button>
    </div>
  );
};

export default HeadLiner;
