// Navigation Bar Component
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Package } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { authApi } from '../../services/api';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Link to="/products" className={styles.homeLink}>
        <div className={styles.logo}>Blondes</div>
      </Link>

      <nav className={styles.nav}>
        <Link to="/products" className={styles.navLink}>
          <Package size={20} />
          <span>Products</span>
        </Link>

        <Link to="/cart" className={styles.cartLink}>
          <div className={styles.cartIconWrapper}>
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </div>
          <span>Cart</span>
        </Link>

        <button className={styles.logoutButton} onClick={handleLogout}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </nav>
    </header>
  );
};

export default NavigationBar;
