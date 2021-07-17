import { createSlice, current, createSelector } from "@reduxjs/toolkit";
import {
	handleAddToCart,
	handleRemoveCartItem,
	handleReduceCartItem,
} from "../../utils/cartUtils";

const initialState = {
	cartItems: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const prevCart = current(state.cartItems);
			const nextCartItem = action.payload;
			state.cartItems = handleAddToCart(prevCart, nextCartItem);
		},
		removeCartItem: (state, action) => {
			const prevCart = current(state.cartItems);
			const ItemToRemove = action.payload;

			state.cartItems = handleRemoveCartItem(prevCart, ItemToRemove);
		},
		reduceCartItem: (state, action) => {
			const prevCart = current(state.cartItems);
			const itemtoReduce = action.payload;

			state.cartItems = handleReduceCartItem(prevCart, itemtoReduce);
		},
	},
});
export const selectCartItems = ({ cartData }) => cartData.cartItems;

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(quantity, cartItem) =>
			quantity + cartItem.quantity * cartItem.productPrice,
		0
	)
);
export const { addToCart, removeCartItem, reduceCartItem } = cartSlice.actions;
export default cartSlice.reducer;
