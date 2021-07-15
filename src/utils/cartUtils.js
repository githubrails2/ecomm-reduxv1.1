export const existingCartItem = ({ prevCart, nextCart }) => {
	return prevCart.find(
		(cartItem) => cartItem.documentID === nextCart.documentID
	);
};
export const handleAddToCart = (prevCart, nextCart) => {
	const quantityIncrement = 1;
	const cartItemExists = existingCartItem({ prevCart, nextCart });

	if (cartItemExists) {
		return prevCart.map((cartItem) =>
			cartItem.documentID === nextCart.documentID
				? { ...cartItem, quantity: cartItem.quantity + quantityIncrement }
				: cartItem
		);
	}
	return [
		...prevCart,
		{
			...nextCart,
			quantity: quantityIncrement,
		},
	];
};
