import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addNewProductStart: (state, action) => {
      state.products.push(action.payload);
    },
    fetchProductsStart: (state, action) => {},
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteProductsStart: () => {},
  },
});

export const {
  addNewProductStart,
  fetchProductsStart,
  setProducts,
  deleteProductsStart,
} = productSlice.actions;

export const selectProducts = ({ productsData }) => productsData.products;
export default productSlice.reducer;
