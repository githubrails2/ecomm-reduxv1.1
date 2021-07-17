import "./Product.scss";
import { Button } from "../../Forms";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
const Product = (product) => {
	const { documentID, productThumbnail, productName, productPrice } = product;
	const dispatch = useDispatch();
	const history = useHistory();
	if (
		!documentID ||
		!productThumbnail ||
		!productName ||
		typeof productPrice === "undefined"
	) {
		return null;
	}
	const configAddToCartBtn = {
		type: "button",
	};
	const handleaddToCart = (product) => {
		if (!product) return;

		dispatch(addToCart(product));
		history.push("/cart");
	};
	return (
		<div className="product">
			<div className="thumb">
				<Link to={`/product/${documentID}`}>
					<img src={productThumbnail} alt={productName} />
				</Link>
			</div>
			<div className="details">
				<ul>
					<li>
						<span className="name">
							<Link to={`/product/${documentID}`}>{productName}</Link>
						</span>
					</li>
					<li>
						<span className="price">{productPrice}</span>
					</li>
					<li>
						<div className="addToCart">
							<Button
								{...configAddToCartBtn}
								onClick={() => handleaddToCart(product)}>
								Add to Cart
							</Button>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Product;
