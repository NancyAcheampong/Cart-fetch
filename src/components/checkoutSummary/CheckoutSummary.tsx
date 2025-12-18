import { Link } from "react-router-dom";
import styles from  "./CheckoutSummary.module.css";

type Subtotal={
    title: string;
    subtotalAmount: number;
}
type Discount={
    label: string;
    discountAmount: number;
}
type DeliveryFee={
    label: string;
    deliveryFeeAmount: number;
}
type Total={
    label: string;
    totalAmount: number;
}

type CheckoutSummaryProps = {
    header: string;
    subtotal: Subtotal;
    discount: Discount;
    deliveryFee: DeliveryFee;
    total: Total;
    onCheckout: () => void;
};

const CheckoutSummary = ({header, subtotal, discount, deliveryFee, total, onCheckout}: CheckoutSummaryProps) => {
  return (
    <div className={styles.checkoutSummaryContainer}>
      <div className={styles.summaryHeader}>{header}</div>
      <div className={styles.summaryDetails}>
        <div className={styles.summaryItems}>
        <p className={styles.detailsOrientation}>
          {subtotal.title}
          <span>{subtotal.subtotalAmount}</span>
        </p>
        <p className={styles.detailsOrientation}>
          {discount.label}
          <span>{discount.discountAmount}</span>
        </p>
        <p className={styles.detailsOrientation}>
          {deliveryFee.label}
          <span>{deliveryFee.deliveryFeeAmount}</span>
        </p>
        </div>
        <p className= {`${styles.detailsOrientation} ${styles.totalAmount}`}>
          { total.label}
          <span>{total.totalAmount}</span>
        </p>
      </div>
<Link to= "/create" >
      <button 
        onClick={onCheckout}
      className={styles.checkoutButton}
      >Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default CheckoutSummary;