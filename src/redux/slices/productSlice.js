import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		addNewProductStart: (state, action) => {},
		fetchProductsStart: (state, action) => {
			console.log("FetchProductStart", action.payload);
		},
		setProducts: (state, action) => {
			console.log("Set Products", action.payload);
			state.products.shift(action.payload);
		},
	},
});

export const { addNewProductStart, fetchProductsStart, setProducts } =
	productSlice.actions;

export const selectProducts = ({ productsData }) => productsData.products;
export default productSlice.reducer;
