import { all, call } from "redux-saga/effects";
import userSagas from "./user.sagas";
import productSagas from "./products.sagas";
export default function* rootSaga() {
	yield all([call(userSagas), call(productSagas)]);
}
