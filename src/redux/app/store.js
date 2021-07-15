import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import productsReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import logger from "redux-logger";
const sagaMiddleware = createSagaMiddleware();
const addedmiddleware = [
	...getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: ["products/setProducts", "products/fetchProductsStart"],
		},
	}),
	sagaMiddleware,
	logger,
];

export default configureStore({
	reducer: {
		user: userReducer,
		productsData: productsReducer,
		cartData: cartReducer,
	},
	middleware: addedmiddleware,
});
sagaMiddleware.run(rootSaga);
