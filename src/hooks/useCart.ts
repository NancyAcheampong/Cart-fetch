// Cart hooks with computed values
import { useMemo } from 'react';
import { useCartStore } from '../store/UseCartStore';
import { config } from '../config';
import { calculateDiscount, calculateTotal } from '../utils/currency';
import type { CartSummary } from '../types';

export const useCart = () => {
  const cart = useCartStore((state) => state.cart);
  const handleAddToCart = useCartStore((state) => state.handleAddToCart);
  const onRemoveFromCart = useCartStore((state) => state.onRemoveFromCart);
  const onIncreaseQuantity = useCartStore((state) => state.onIncreaseQuantity);
  const onDecreaseQuantity = useCartStore((state) => state.onDecreaseQuantity);
  const onClearCart = useCartStore((state) => state.onClearCart);

  // Compute cart summary
  const summary: CartSummary = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const discount = calculateDiscount(subtotal);
    const deliveryFee = cart.length > 0 ? config.deliveryFee : 0;
    const total = calculateTotal(subtotal, discount, deliveryFee);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      discount,
      deliveryFee,
      total,
      itemCount,
    };
  }, [cart]);

  return {
    cart,
    summary,
    isEmpty: cart.length === 0,
    itemCount: summary.itemCount,
    addToCart: handleAddToCart,
    removeFromCart: onRemoveFromCart,
    increaseQuantity: onIncreaseQuantity,
    decreaseQuantity: onDecreaseQuantity,
    clearCart: onClearCart,
  };
};
