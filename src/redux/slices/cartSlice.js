import { createSlice, current, createSelector } from "@reduxjs/toolkit";
import { handleAddToCart } from "../../utils/cartUtils";

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
	},
});
export const selectCartItems = ({ cartData }) => cartData.cartItems;

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
