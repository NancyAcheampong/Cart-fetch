import styles from "./ProductCardContainer.module.css";


interface ProductCardContainerProps {
    children: React.ReactNode;
    
}


const ProductCardContainer = ({ children }:ProductCardContainerProps) => {
  return <div className={styles.productContainer}>{children}</div>;
};

export default ProductCardContainer;