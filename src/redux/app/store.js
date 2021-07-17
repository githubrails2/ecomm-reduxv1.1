import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import rootSaga from "../sagas/rootSaga";
import addedmiddleware, { sagaMiddleware } from "./middleware";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/lib/persistStore";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cartData"],
};

const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
	middleware: addedmiddleware,
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
