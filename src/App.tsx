import { Routes, Route } from "react-router-dom";

// import { useState } from "react";
// import styles from "./App.module.css";
import Index from "./pages/indexPage/Index";
import CartPage from "./pages/cartPage/CartPage";
import NavigationBar from "./components/navigationBar/NavigationBar";
// import React, { useEffect, useState } from "react";
// import { useCartStore } from "./store/UseCartStore";

// import { useReducer } from "react";

// type CartItem


function App() {
  

  // function onClearCart(action: CartAction): void {
  // throw new Error("Function not implemented.");
  // }

  // const [cart, setCart] = useState<CartItems[]>(() => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   return cart || [];
  // });
  // console.log(cart);

  // function onAddToCart(newItem: CartItems) {
  //   const existingItemIndex = cart.findIndex(
  //     (item) =>
  //       item.product.price === newItem.product.price &&
  //       item.product.productSize === newItem.product.productSize &&
  //       item.product.productColor === newItem.product.productColor
  //   );

  //   if (existingItemIndex !== -1) {
  //     const updatedCart = [...cart];
  //     // updatedCart[existingItemIndex].quantity += newItem.quantity;
  //     updatedCart[existingItemIndex].quantity =
  //       updatedCart[existingItemIndex].quantity + newItem.quantity;
  //     setCart(updatedCart);
  //     //save cart item to local storage
  //     const storedCartItem = JSON.parse(localStorage.getItem("cart") || "[]");
  //     const updatedCartItem = [updatedCart, ...storedCartItem];
  //     localStorage.setItem("cart", JSON.stringify(updatedCartItem));
  //   } else {
  //     setCart([...cart, newItem]);
  //     // save added to cart to local storage
  //     localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
  //   }
  // }

  // Alternative approach
  //   const existingItem = cart.find(
  //   (item) =>
  //     item.product.price === newItem.product.price &&
  //     item.product.productSize === newItem.product.productSize &&
  //     item.product.productColor === newItem.product.productColor
  // );

  // if (existingItem) {
  //   existingItem.quantity += newItem.quantity;
  //   setCart([...cart]); // update
  // } else {
  //   setCart([...cart, newItem]);
  // }

  // function onRemoveFromCart(index: number) {
  //   const updatedCart = cart.filter(function (_, currentIndex) {
  //     if (currentIndex !== index) {
  //       return true; // keep this item
  //     } else {
  //       return false; // remove this item
  //     }
  //   });

  //   setCart(updatedCart);

  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // }
  // Alternative approach
  // const updatedCart = cart.filter((_, i) => i !== index);

  // function onIncreaseQuantity(index: number) {
  //   const updatedCart = [...cart];
  //   updatedCart[index].quantity += 1;
  //   setCart(updatedCart);
  //   // update local storage
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // }

  // function onDecreaseQuantity(index: number) {
  //   const updatedCart = [...cart];
  //   if (updatedCart[index].quantity > 1) {
  //     updatedCart[index].quantity -= 1;
  //     setCart(updatedCart);
  //     // upated local storage
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   }
  // }

  // function onClearCart() {
  //   setCart([]);
  //   localStorage.removeItem("cart");
  // }

  return (
    <div className="App">

      <NavigationBar
      />

      <Routes>
        <Route
          path="/"
          element={
            <Index
              // dispatch={dispatch}
              // cart={cart}
              // onAddToCart={onAddToCart}
            />
          }
          index
        />
        <Route
          path="/cart"
          element={
            <CartPage
              // dispatch={dispatch}
              // cart={cart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
