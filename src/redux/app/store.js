import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";

const addedmiddleware = [...getDefaultMiddleware()];
export default configureStore({
	reducer: {
		user: userReducer,
	},
	middleware: addedmiddleware,
});
