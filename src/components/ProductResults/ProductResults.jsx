//react defined
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

//programmer defined
import "./ProductResults.scss";
import {
	fetchProductsStart,
	selectPage,
	selectProducts,
	selectQueryDoc,
} from "../../redux/slices/productSlice";
import Product from "./Product/Product";
import { FormSelect } from "../Forms";
import LoadMore from "../LoadMore/LoadMore";
const ProductResults = () => {
	const dispatch = useDispatch();
	const data = useSelector(selectProducts);
	const history = useHistory();
	const { filterType } = useParams();
	const queryDoc = useSelector(selectQueryDoc);
	const isLastPage = useSelector(selectPage);

	useEffect(() => {
		dispatch(fetchProductsStart({ filterType }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterType]);

	if (!Array.isArray(data)) return null;

	if (data.length < 1) {
		return (
			<div className="products">
				<p>No Results Found</p>
			</div>
		);
	}
	const handleFilter = (e) => {
		let nextFilter = e.target.value;

		history.push(`/search/${nextFilter}`);
	};
	const configFilter = {
		defaultValue: filterType,
		options: [
			{
				name: "Show all",
				value: "",
			},
			{
				name: "Mens",
				value: "mens",
			},
			{ name: "Womens", value: "womens" },
		],
		handleChange: handleFilter,
	};
	const handleLoadMore = () => {
		dispatch(
			fetchProductsStart({
				filterType,
				startAfterdoc: queryDoc,
				persistProducts: data,
			})
		);
	};
	const configLoadMore = {
		onLoadMoreEvt: handleLoadMore,
	};
	return (
		<div className="products">
			<h1>Browse Products</h1>

			<FormSelect {...configFilter} />
			<div className="productResults">
				{data.map((product, i) => {
					const { productThumbnail, productName, productPrice } = product;
					if (
						!productThumbnail ||
						!productName ||
						typeof productPrice === "undefined"
					) {
						return null;
					}
					const configProduct = {
						productThumbnail,
						productName,
						productPrice,
					};
					return <Product key={i} {...configProduct} />;
				})}
			</div>
			{!isLastPage && <LoadMore {...configLoadMore} />}
		</div>
	);
};

export default ProductResults;
