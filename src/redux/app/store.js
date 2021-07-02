import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
//import logger from "redux-logger";

const addedmiddleware = [...getDefaultMiddleware()];
export default configureStore({
	reducer: {
		user: userReducer,
	},
	middleware: addedmiddleware,
});
