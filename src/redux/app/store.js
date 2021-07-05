import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
const sagaMiddleware = createSagaMiddleware();
const addedmiddleware = [...getDefaultMiddleware(), sagaMiddleware];

export default configureStore({
	reducer: {
		user: userReducer,
	},
	middleware: addedmiddleware,
});
sagaMiddleware.run(rootSaga);
