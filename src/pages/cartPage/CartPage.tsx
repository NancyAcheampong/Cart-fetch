// Cart Page Component
import styles from './CartPage.module.css';
import CartItem from '../../components/cartItem/CartItem';
import CartContainer from '../../components/cartContainer/CartContainer';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';
import HeadLiner from '../../components/headLiner/HeadLiner';
import { EmptyState } from '../../components/ui';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const {
    cart,
    summary,
    isEmpty,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (isEmpty) {
    return (
      <div className={styles.emptyContainer}>
        <EmptyState
          icon={<ShoppingCart size={48} />}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
          actionLabel="Browse Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <HeadLiner />
      <div className={styles.cartContent}>
        <CartContainer>
          {cart.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              onRemoveFromCart={() => removeFromCart(item.product.id)}
              onDecreaseQuantity={() => decreaseQuantity(item.product.id)}
              onIncreaseQuantity={() => increaseQuantity(item.product.id)}
            />
          ))}
        </CartContainer>
        <CheckoutSummary
          header="Order Summary"
          subtotal={{ title: 'Subtotal', subtotalAmount: summary.subtotal }}
          discount={{ label: 'Discount (10%)', discountAmount: -summary.discount }}
          deliveryFee={{ label: 'Delivery Fee', deliveryFeeAmount: summary.deliveryFee }}
          total={{ label: 'Total', totalAmount: summary.total }}
          itemCount={summary.itemCount}
        />
      </div>
    </div>
  );
};

export default CartPage;
