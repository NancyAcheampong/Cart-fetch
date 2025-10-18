import styles from "./CartPage.module.css";
import CartItem from "../../components/cartItem/CartItem";
// import cartDummy from "../../lib/dummyData/cartDummy";
import CartContainer from "../../components/cartContainer/CartContainer";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";
import HeadLiner from "../../components/headLiner/HeadLiner";
import { useCartStore } from "../../store/UseCartStore";
// import type { CartAction } from "../../App";

const CartPage = () => {

  

  const cart = useCartStore((state) => state.cart)
  const onRemoveFromCart = useCartStore((state) => state.onRemoveFromCart)
  const onDecreaseQuantity = useCartStore((state) => state.onDecreaseQuantity)
  const onIncreaseQuantity = useCartStore((state) => state.onIncreaseQuantity)

  console.log(cart);
  return (
    <div>
      <HeadLiner />
      <div className={styles.cartContent}>
        <CartContainer>
          {cart.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              onRemoveFromCart={() => {
                onRemoveFromCart(item.product.id);
              }}
              onDecreaseQuantity={() => {
                onDecreaseQuantity(item.product.id)
              }}
              onIncreaseQuantity={() => {
                onIncreaseQuantity(item.product.id)
              }}
            />
          ))}
        </CartContainer>
        <CheckoutSummary
          header="Order Summary"
          subtotal={{ title: "Subtotal", subtotalAmount: 100 }}
          discount={{ label: "Discount", discountAmount: -10 }}
          deliveryFee={{ label: "Delivery Fee", deliveryFeeAmount: 5 }}
          total={{ label: "Total", totalAmount: 95 }}
          onCheckout={() => console.log("Proceed to checkout")}
        />
      </div>
    </div>
  );
};

export default CartPage;
