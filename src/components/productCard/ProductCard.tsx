import { Heart } from "lucide-react";
// import { useState } from 'react';
import styles from "./ProductCard.module.css";
// import type { CartItem } from "../cartItem/CartItem";

type ProductCardProps = {
  // cart: CartItem,
  inStock: boolean;
  isLiked?: boolean;
  image: string;
  productName: string;
  price: number;
  handleAddToCart: () => void;
  // onToggleLike:(id:string)=>void;
};

const ProductCard = ({
  inStock,
  image,
  productName,
  price,
  handleAddToCart,
}: ProductCardProps) => {
  return (
    <div className={`${styles.featureImage}  ${styles.orientation}`}>
      <div className="in-stock">
        <p className={styles.stockText}>{inStock}</p>
      </div>

      <div className={styles.heart}>
        <Heart className={styles.likeThis} />
        <button onClick={handleAddToCart} className={styles.cartCircle}>
          <img src="shopping-bag.png" className={styles.shoppingBag} />
        </button>
      </div>
      <div className={styles.productInStock}>
        <img src={image} className="leaveInImage" />
      </div>
      <div className={styles.product}>
        <p className="product-name">{productName}</p>
        <p className={styles.prices}>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
