import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";

const store = configureStore({
  reducer: {
    procutsState: productReducer,
    cartItemData: cartReducer,
  },
});

export default store;
