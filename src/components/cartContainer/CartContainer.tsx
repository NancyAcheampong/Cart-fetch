import styles from "./CartContainer.module.css";


interface CartContainerProps {
    children: React.ReactNode;
    
}


const CartContainer = ({ children }:CartContainerProps) => {
  return <div className={styles.cartContainer}>{children}</div>;
};

export default CartContainer;