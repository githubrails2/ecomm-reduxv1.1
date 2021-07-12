import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	queryDoc: {},
	isLastPage: false,
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		addNewProductStart: (state, action) => {
			state.products.push(action.payload);
		},
		fetchProductsStart: () => {},
		setProducts: (state, action) => {
			state.products = action.payload.data;
			state.queryDoc = action.payload.queryDoc;
			state.isLastPage = action.payload.isLastPage;
		},
		deleteProductStart: () => {},
	},
});

export const {
	addNewProductStart,
	fetchProductsStart,
	setProducts,
	deleteProductStart,
} = productSlice.actions;

export const selectProducts = ({ productsData }) => productsData.products;
export const selectQueryDoc = ({ productsData }) => productsData.queryDoc;
export const selectPage = ({ productsData }) => productsData.isLastPage;
export default productSlice.reducer;
