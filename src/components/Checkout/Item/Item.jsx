import { useDispatch } from "react-redux";
import {
	addToCart,
	removeCartItem,
	reduceCartItem,
} from "../../../redux/slices/cartSlice";

const Item = (product) => {
	const dispatch = useDispatch();
	const { productName, productPrice, productThumbnail, quantity, documentID } =
		product;

	const handleRemoveCartItem = (documentID) => {
		dispatch(removeCartItem(documentID));
	};
	const handleAddProduct = (product) => {
		dispatch(addToCart(product));
	};
	const handleReduceItem = (product) => {
		dispatch(reduceCartItem(product));
	};
	return (
		<table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
			<tbody>
				<tr>
					<td>
						<img src={productThumbnail} alt={productName} />
					</td>
					<td>{productName}</td>
					<td>
						<span>
							<span
								className="cartBtn"
								onClick={() => handleReduceItem(product)}>
								{"<"}
							</span>
							{quantity}
							<span
								className="cartBtn"
								onClick={() => handleAddProduct(product)}>
								{">"}
							</span>
						</span>
					</td>
					<td>{productPrice}</td>
					<td align="center">
						<span
							className="cartBtn"
							onClick={() => handleRemoveCartItem(documentID)}>
							X
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Item;
