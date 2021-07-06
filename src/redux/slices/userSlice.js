import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	userError: [],
	resetPasswordSuccess: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		googleSignInStart: () => {},
		emailSigninStart: () => {},
		checkUserSession: () => {},
		signOutUserStart: () => {},
		signUpUserStart: () => {},
		signOutUserSuccess: (state) => {
			state.currentUser = null;
			state.userError = [];
			state.resetPasswordSuccess = false;
		},
		userError: (state, action) => {
			state.userError = action.payload;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.userError = [];
		},
		resetUserState: (state) => {
			state.currentUser = null;
			state.userError = [];
			state.resetPasswordSuccess = false;
		},
		signUpError: (state, action) => void (state.signUpError = action.payload),

		signUpSuccess: (state, action) =>
			void (state.signUpSuccess = action.payload),

		resetPasswordStart: (state, action) =>
			void (state.resetPasswordSuccess = action.payload),

		resetPasswordSuccess: (state, action) => {
			state.resetPasswordSuccess = action.payload;
		},
	},
});

export const {
	signInSuccess,
	signUpError,
	signUpSuccess,
	resetPasswordSuccess,
	resetPasswordStart,
	googleSignInStart,
	emailSigninStart,
	checkUserSession,
	signOutUserStart,
	signOutUserSuccess,
	signUpUserStart,
	userError,
	resetUserState,
} = userSlice.actions;

export const selectCurrentUser = ({ user }) => user.currentUser;
export const selectSignUpStatus = ({ user }) => ({
	currentUser: user.currentUser,
	userError: user.userError,
});
export const selectResetPasswordStatus = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	userError: user.userError,
});

export default userSlice.reducer;
