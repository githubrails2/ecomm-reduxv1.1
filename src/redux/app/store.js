import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import productsReducer from "../slices/productSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import logger from "redux-logger";
const sagaMiddleware = createSagaMiddleware();
const addedmiddleware = [...getDefaultMiddleware(), sagaMiddleware, logger];

export default configureStore({
  reducer: {
    user: userReducer,
    productsData: productsReducer,
  },
  middleware: addedmiddleware,
});
sagaMiddleware.run(rootSaga);
