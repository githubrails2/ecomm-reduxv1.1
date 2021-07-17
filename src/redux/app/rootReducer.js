import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import productsReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";

export const rootReducer = combineReducers({
	user: userReducer,
	productsData: productsReducer,
	cartData: cartReducer,
});
