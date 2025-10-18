import styles from "./CartItem.module.css";
import { Trash2 } from "lucide-react";
// import { useState } from "react";

export type ProductDetails = {
  id: string;
  price: number;
  productSize: string;
  productColor: string;
  productName: string;
  image: string;
  inStock: boolean;
  isLiked: boolean;
};

type CartItemProps = {
  product: ProductDetails;
  onRemoveFromCart?: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  quantity: number;
};

export type CartItems = {
  product: ProductDetails;
  quantity: number;
};

const CartItem = ({ product, quantity, onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,}: CartItemProps) => {
  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.cartItem}>
        <img src={product.image} className={styles.productImage} />
        <div className={styles.productInfo}>
          <div className={styles.productDetails}>
            <h3 className={styles.productName}>{product.productName}</h3>
            <p className={styles.productDescription}>
              {product.productSize}
              <span> {product.productColor}</span>
            </p>

            <p className={styles.productPrice}>{product.price}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.removeButton} onClick={onRemoveFromCart}>
              <Trash2 />
            </button>
            <div className={styles.quantityControl}>
              <button
                className={styles.quantityButton}
                onClick={onDecreaseQuantity}
              >
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                onClick={onIncreaseQuantity}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
