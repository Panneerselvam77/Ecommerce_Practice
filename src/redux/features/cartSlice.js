import { createSlice } from "@reduxjs/toolkit";

const MAX_QUANTITY_PER_ITEM = 99;

const initialState = {
  cartItems: [],
  subtotal: 0,
  totalItems: 0,
  total: 0,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItemId = action.payload;
      if (!newItemId) {
        console.error("Invalid item: missing id");
        return;
      }
      const existingItem = state.cartItems.find(
        (item) => item.id === newItemId
      );
      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY_PER_ITEM) {
          existingItem.quantity += 1;
        }
      } else {
        state.cartItems.push({
          id: newItemId,
          quantity: newItemId.quantity || 1,
          addedAt: new Date().toISOString(),
        });
      }
      state.lastUpdated = new Date().toISOString();
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
      if (!itemId) {
        console.error("Invalid item id");
        return;
      }
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.lastUpdated = new Date().toISOString();
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item && item.quantity < MAX_QUANTITY_PER_ITEM) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemid = action.payload;
      const item = state.cartItems.find((item) => item.id === itemid);
      if (item && item.quantity < MAX_QUANTITY_PER_ITEM) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== itemid
          );
        }
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (!itemId) {
        console.error("Invalid item id");
        return;
      }

      state.items = state.items.filter((item) => item.id !== itemId);
    },
    clearCart: () => {},
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeCartItem,
  clearCart,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;
