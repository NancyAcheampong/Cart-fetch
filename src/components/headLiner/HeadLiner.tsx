import styles from "./HeadLiner.module.css";
import { useCartStore } from "../../store/UseCartStore";

const HeadLiner = () => {
  const onClearCart = useCartStore((state) => state.onClearCart);

  return (
    <div className={styles.cartPage}>
      Check What's in my cart
      <button onClick={() => {
        onClearCart()
      }} className={styles.clearAllButton}>
        Clear All
      </button>
    </div>
  );
};

export default HeadLiner;
