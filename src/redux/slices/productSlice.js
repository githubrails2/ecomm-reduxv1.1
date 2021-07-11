import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
<<<<<<< HEAD
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
		deleteProductStart: (state, action) => {},
	},
});

export const {
	addNewProductStart,
	fetchProductsStart,
	setProducts,
	deleteProductStart,
=======
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
>>>>>>> c53b7e80e9114c2707533553469913af1efe6a1f
} = productSlice.actions;

export const selectProducts = ({ productsData }) => productsData.products;
export default productSlice.reducer;
