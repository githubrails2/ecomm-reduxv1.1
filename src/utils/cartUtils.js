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
export const handleRemoveCartItem = (prevCart, cartItemtoRemove) => {
	return prevCart.filter((item) => item.documentID !== cartItemtoRemove);
};
export const handleReduceCartItem = (prevCart, ItemToReduce) => {
	const existingCartItem = prevCart.find(
		(cartItem) => cartItem.documentID === ItemToReduce.documentID
	);

	if (existingCartItem.quantity === 1) {
		return prevCart.filter(
			(cartItem) => cartItem.documentID !== existingCartItem.documentID
		);
	}
	return prevCart.map((cartItem) =>
		cartItem.documentID === existingCartItem.documentID
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};
