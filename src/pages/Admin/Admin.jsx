import "./Admin.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewProductStart,
	deleteProductStart,
	fetchProductsStart,
	selectProducts,
} from "../../redux/slices/productSlice";
import { FormInput, Button, FormSelect } from "../../components/Forms";
import { Modal } from "../../components";
import LoadMore from "../../components/LoadMore/LoadMore";
import { CKEditor } from "ckeditor4-react";
const Admin = () => {
	const dispatch = useDispatch();
	const products = useSelector(selectProducts);
	const [hideModal, setHideModal] = useState(true);
	const [productCategory, setProductCategory] = useState("mens");
	const [productName, setProductName] = useState("");
	const [productThumbnail, setProductThumbnail] = useState("");
	const [productPrice, setProductPrice] = useState(0);
	const [productDesc, setProductDesc] = useState("");
	const { data, queryDoc, isLastPage } = products;
	useEffect(() => {
		dispatch(fetchProductsStart());
	}, [dispatch]);
	const toggleModal = () => setHideModal(!hideModal);
	const configModal = {
		hideModal,
		toggleModal,
	};
	const resetForm = () => {
		setHideModal(true);
		setProductCategory("mens");
		setProductName("");
		setProductThumbnail("");
		setProductPrice(0);
		setProductDesc("");
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addNewProductStart({
				productCategory,
				productName,
				productThumbnail,
				productPrice,
				productDesc,
			})
		);
		resetForm();
	};
	const handleLoadMore = () => {
		dispatch(
			fetchProductsStart({
				startAfterDoc: queryDoc,
				persisProducts: data,
			})
		);
	};
	const configLoadMore = {
		onLoadMoreEvt: handleLoadMore,
	};
	return (
		<div className="admin">
			<div className="callToActions">
				<ul>
					<li>
						<Button onClick={() => toggleModal()}>Add new product</Button>
					</li>
				</ul>
			</div>

			<Modal {...configModal}>
				<div className="addNewProductForm">
					<form onSubmit={handleSubmit}>
						<h2>Add new product</h2>

						<FormSelect
							label="Category"
							options={[
								{
									value: "mens",
									name: "Mens",
								},
								{
									value: "womens",
									name: "Womens",
								},
							]}
							handleChange={(e) => setProductCategory(e.target.value)}
						/>

						<FormInput
							label="Name"
							type="text"
							value={productName}
							handleChange={(e) => setProductName(e.target.value)}
						/>

						<FormInput
							label="Main image URL"
							type="url"
							value={productThumbnail}
							handleChange={(e) => setProductThumbnail(e.target.value)}
						/>

						<FormInput
							label="Price"
							type="number"
							min="0.00"
							max="10000.00"
							step="0.01"
							value={productPrice}
							handleChange={(e) => setProductPrice(e.target.value)}
						/>
						<CKEditor onChange={(e) => setProductDesc(e.editor.getData())} />
						<br />

						<Button type="submit">Add product</Button>
					</form>
				</div>
			</Modal>

			<div className="manageProducts">
				<table border="0" cellPadding="0" cellSpacing="0">
					<tbody>
						<tr>
							<th>
								<h1>Manage Products</h1>
							</th>
						</tr>
						<tr>
							<td>
								<table
									className="results"
									border="0"
									cellPadding="10"
									cellSpacing="0">
									<tbody>
										{Array.isArray(data) &&
											data.length > 0 &&
											data.map((product, index) => {
												const {
													productName,
													productThumbnail,
													productPrice,
													documentID,
												} = product;

												return (
													<tr key={index}>
														<td>
															<img
																className="thumb"
																src={productThumbnail}
																alt={productName}
															/>
														</td>
														<td>{productName}</td>
														<td>&#x0024;{productPrice}</td>
														<td>
															<Button
																onClick={() =>
																	dispatch(deleteProductStart(documentID))
																}>
																Delete
															</Button>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr>
							<td>
								<table border="0" cellPadding="10" cellSpacing="0">
									<tbody>
										<tr>
											<td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Admin;
