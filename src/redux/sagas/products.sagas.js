import { takeLatest, put, all, call } from "redux-saga/effects";
import {
	addNewProductStart,
	deleteProductStart,
	fetchProductsStart,
	fetchProductStart,
	setProducts,
	setProduct,
} from "../slices/productSlice";
import {
	handleAddProduct,
	handleDeleteProducts,
	handleFetchProducts,
	handleFetchProduct,
} from "./helpers/product_saga.helpers";
import { auth } from "../../firebase/utils";
export function* addProduct({ payload }) {
	try {
		const timestamp = new Date().toLocaleDateString();
		yield handleAddProduct({
			...payload,
			productAdminuserUID: auth.currentUser.uid,
			createdDate: timestamp,
		});
		yield put(fetchProductsStart());
	} catch (error) {
		//console.log(error)
	}
}
export function* fetchProducts({ payload }) {
	try {
		const products = yield handleFetchProducts(payload);
		yield put(setProducts(products));
	} catch (error) {
		//console.log(error)
	}
}
export function* onFetchProductsStart() {
	yield takeLatest(fetchProductsStart, fetchProducts);
}
export function* onAddNewProductStart() {
	yield takeLatest(addNewProductStart, addProduct);
}

export function* deleteProduct(payload) {
	try {
		yield handleDeleteProducts(payload);
		yield put(fetchProductsStart());
	} catch (error) {}
}
export function* fetchProduct({ payload }) {
	try {
		const product = yield handleFetchProduct(payload);
		yield put(setProduct(product));
	} catch (error) {
		//console.log(error)
	}
}
export function* onDeleteProductStart() {
	yield takeLatest(deleteProductStart, deleteProduct);
}
export function* onFetchProductStart() {
	yield takeLatest(fetchProductStart, fetchProduct);
}
export default function* productSagas() {
	yield all([
		call(onAddNewProductStart),
		call(onFetchProductsStart),
		call(onDeleteProductStart),
		call(onFetchProductStart),
	]);
}
