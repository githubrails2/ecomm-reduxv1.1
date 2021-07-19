import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	productDetail: {},
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
			state.products = action.payload;
		},
		deleteProductStart: () => {},
		fetchProductStart: () => {},
		setProduct: (state, action) => {
			state.productDetail = action.payload;
		},
	},
	
});

export const {
	addNewProductStart,
	fetchProductsStart,
	setProducts,
	deleteProductStart,
	fetchProductStart,
	setProduct,
} = productSlice.actions;

export const selectProducts = ({ productsData }) => productsData.products;
export const selectProductDetails = ({ productsData }) =>
	productsData.productDetail;
export default productSlice.reducer;
