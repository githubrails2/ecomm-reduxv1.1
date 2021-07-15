import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductStart,
	setProduct,
	selectProductDetails,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import "./ProductCard.scss";
import { Button } from "../Forms";
const ProductCard = () => {
	const { productID } = useParams();
	const product = useSelector(selectProductDetails);
	const dispatch = useDispatch();
	const { productName, productThumbnail, productPrice, productDesc } = product;
	useEffect(() => {
		dispatch(fetchProductStart(productID));
		return () => {
			dispatch(setProduct({}));
		};
	}, [dispatch, productID]);
	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(addToCart(product));
	};
	const configAddToCartBtn = {
		type: "button",
	};
	return (
		<div className="productCard">
			<div className="hero">
				<img src={productThumbnail} alt={productName} />
			</div>
			<div className="productDetails">
				<ul>
					<li>
						<h1>{productName}</h1>
					</li>
					<li>
						<span>{productPrice}</span>
					</li>
					<li>
						<div className="addToCart" onClick={() => handleAddToCart(product)}>
							<Button {...configAddToCartBtn}>Add To Cart</Button>
						</div>
					</li>
					<li>
						<span dangerouslySetInnerHTML={{ __html: productDesc }} />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProductCard;
