import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItems } from "../components/cartItem/CartItem";

// Define the Zustand store type
type CartState = {
  cart: CartItems[];

  handleAddToCart: (newItem: CartItems) => void;
  onRemoveFromCart: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onClearCart: () => void;
};

// Create the Zustand store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      handleAddToCart: (newItem: CartItems) => {
        const addQty = (newItem).quantity ?? 1;
        const existing = get().cart.find((item) => item.product.id === newItem.product.id);
        if (existing) {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.product.id === newItem.product.id
                ? { ...item, quantity: (item.quantity ?? 1) + addQty }
                : item
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { ...newItem , quantity: addQty }],
          }));
        }
      },

      onRemoveFromCart: (id: string) => {
        set((state) => ({ cart: state.cart.filter((item) => item.product.id !== id) }));
      },

      onIncreaseQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === id ? { ...item, quantity: ((item ).quantity ?? 1) + 1 } : item
          ),
        }));
      },

      onDecreaseQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.product.id === id ? { ...item, quantity: ((item ).quantity ?? 1) - 1 } : item
            )
            .filter((item) => (item ).quantity > 0),
        }));
      },

      onClearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);
