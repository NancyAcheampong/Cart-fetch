import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/UseCartStore";
// import type { CartItems } from "../cartItem/CartItem";



const NavigationBar = () => {

  const { cart } = useCartStore();

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // remove token
    // navigate("/login"); // send user back to login page
    window.location.href = '/login'
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.homeLink}>
        <div className={styles.logo}>Blondes</div>
      </Link>
      <Link to="/cart" className={styles.cartLink}>
        <ShoppingCart size={44} />
        <span>{cart.length}</span>
      </Link>
      
      <button onClick={handleLogout}>Log Out</button>
    </header>
  );
};

export default NavigationBar;