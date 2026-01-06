import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";

const store = configureStore({
  reducer: {
    procutsState: productReducer,
  },
});

export default store;
