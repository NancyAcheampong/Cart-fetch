// Checkout Summary Component
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import styles from './CheckoutSummary.module.css';

type CheckoutSummaryProps = {
  header: string;
  subtotal: { title: string; subtotalAmount: number };
  discount: { label: string; discountAmount: number };
  deliveryFee: { label: string; deliveryFeeAmount: number };
  total: { label: string; totalAmount: number };
  itemCount?: number;
};

const CheckoutSummary = ({
  header,
  subtotal,
  discount,
  deliveryFee,
  total,
  itemCount = 0,
}: CheckoutSummaryProps) => {
  return (
    <div className={styles.checkoutSummaryContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.summaryHeader}>{header}</h2>
        {itemCount > 0 && (
          <span className={styles.itemCount}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      <div className={styles.summaryDetails}>
        <div className={styles.summaryItems}>
          <div className={styles.detailsOrientation}>
            <span>{subtotal.title}</span>
            <span className={styles.amount}>{formatCurrency(subtotal.subtotalAmount)}</span>
          </div>
          <div className={styles.detailsOrientation}>
            <span className={styles.discountLabel}>{discount.label}</span>
            <span className={styles.discountAmount}>{formatCurrency(discount.discountAmount)}</span>
          </div>
          <div className={styles.detailsOrientation}>
            <span>{deliveryFee.label}</span>
            <span className={styles.amount}>{formatCurrency(deliveryFee.deliveryFeeAmount)}</span>
          </div>
        </div>

        <div className={`${styles.detailsOrientation} ${styles.totalAmount}`}>
          <span>{total.label}</span>
          <span className={styles.totalValue}>{formatCurrency(total.totalAmount)}</span>
        </div>
      </div>

      <Link to="/create" className={styles.checkoutLink}>
        <button className={styles.checkoutButton}>
          <ShoppingBag size={20} />
          <span>Proceed to Checkout</span>
        </button>
      </Link>

      <p className={styles.secureNote}>
        Secure checkout powered by Blondes
      </p>
    </div>
  );
};

export default CheckoutSummary;
