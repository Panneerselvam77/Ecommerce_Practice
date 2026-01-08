import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Thunk - Middlewear */
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      return res.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch products",
        status: error.response?.status || 500,
      });
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    isError: null,
    productsList: [],
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isError = null;
        state.isLoading = false;
        state.productsList = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        console.log("Rejected Error", action.error);

        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
