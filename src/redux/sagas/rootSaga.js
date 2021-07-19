import { all, call } from "redux-saga/effects";
import userSagas from "./user.sagas";
import productSagas from "./products.sagas";
import ordersSaga from "./orderSagas";
export default function* rootSaga() {
	yield all([call(userSagas), call(productSagas),call(ordersSaga)]);
}
