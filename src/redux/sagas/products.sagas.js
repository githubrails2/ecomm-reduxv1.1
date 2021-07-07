import { takeLatest, put, all, call } from "redux-saga/effects";
import {
	addNewProductStart,
	fetchProductsStart,
	setProducts,
} from "../slices/productSlice";
import {
	handleAddProduct,
	handleFetchProducts,
} from "./helpers/product_saga.helpers";
import { auth } from "../../firebase/utils";
export function* addProduct({
	payload: { productCategory, productName, productThumbnail, productPrice },
}) {
	try {
		const timestamp = new Date();
		yield handleAddProduct({
			productCategory,
			productName,
			productThumbnail,
			productPrice,
			productAdminuserUID: auth.currentUser.uid,
			createdDate: timestamp,
		});
		yield put(fetchProductsStart());
	} catch (error) {
		//console.log(error)
	}
}
export function* fetchProducts() {
	try {
		const products = yield handleFetchProducts();
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

export default function* productSagas() {
	yield all([call(onAddNewProductStart), call(onFetchProductsStart)]);
}