import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/slices/cartSlice";
import { useHistory } from "react-router-dom";
import { Button } from "../Forms";
import "./Checkout.scss";
import Item from "./Item/Item";
const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const TotalPrice = useSelector(selectCartTotal);
	const history = useHistory();
	return (
		<div className="checkout">
			<h1>Checkout</h1>
			<div className="cart">
				{cartItems.length > 0 ? (
					<table border="0" cellPadding="0" cellSpacing="0">
						<tbody>
							<tr>
								<td>
									<table
										className="checkouther"
										border="0"
										cellPadding="0"
										cellSpacing="0">
										<tbody>
											<tr>
												<th>Product</th>
												<th>Description</th>
												<th>Quantity</th>
												<th>Price</th>
												<th>Remove</th>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<table border="0" cellSpacing="0" cellPadding="0">
										<tbody>
											{cartItems.map((item, pos) => {
												return (
													<tr key={pos}>
														<td>
															<Item {...item} />
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<table border="0" cellPadding="0" cellSpacing="0">
										<tbody>
											<tr>
												<td>
													<table border="0" cellPadding="10" cellSpacing="0">
														<tbody>
															<tr>
																<td>
																	<h3>Total: {TotalPrice}</h3>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr>
												<td>
													<table border="0" cellPadding="10" cellSpacing="0">
														<tbody>
															<tr>
																<td>
																	<Button onClick={() => history.goBack()}>
																		Continue Shopping
																	</Button>
																</td>
																<td>
																	<Button onClick={()=>history.push('/payment') }>Checkout</Button>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				) : (
					<p>Your cart is empty</p>
				)}
			</div>
		</div>
	);
};

export default Checkout;
