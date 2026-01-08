import { createSlice } from "@reduxjs/toolkit";

const MAX_QUANTITY_PER_ITEM = 99;

/**
 * Utility to calculate cart totals
 */
const calculateCartTotals = (items) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    totalItems,
  };
};

const initialState = {
  cartItems: [],
  subtotal: 0,
  totalItems: 0,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add item to cart
     * payload: { id, price, quantity? }
     */
    addToCart: (state, action) => {
      const { id, price, quantity = 1 } = action.payload;

      if (!id || !price) return;

      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY_PER_ITEM) {
          existingItem.quantity = Math.min(
            existingItem.quantity + quantity,
            MAX_QUANTITY_PER_ITEM
          );
        }
      } else {
        state.cartItems.push({
          id,
          price,
          quantity,
          addedAt: new Date().toISOString(),
        });
      }

      Object.assign(state, calculateCartTotals(state.cartItems));
      state.lastUpdated = new Date().toISOString();
    },

    /**
     * Remove item completely from cart
     */
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      Object.assign(state, calculateCartTotals(state.cartItems));
      state.lastUpdated = new Date().toISOString();
    },

    /**
     * Increase item quantity
     */
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);

      if (item && item.quantity < MAX_QUANTITY_PER_ITEM) {
        item.quantity += 1;
      }

      Object.assign(state, calculateCartTotals(state.cartItems));
    },

    /**
     * Decrease item quantity
     * Removes item if quantity reaches 0
     */
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload
        );
      }

      Object.assign(state, calculateCartTotals(state.cartItems));
    },

    /**
     * Clear entire cart
     */
    clearCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
