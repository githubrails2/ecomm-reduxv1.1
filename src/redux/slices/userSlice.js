import { createSlice } from "@reduxjs/toolkit";
import { auth, handleUserProfile, GoogleProvider } from "../../firebase/utils";
const initialState = {
	currentUser: null,
	signInSuccess: false,
	signUpError: [],
	signUpSuccess: false,
	resetPasswordSuccess: false,
	resetPasswordError: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser: (state, action) =>
			void (state.currentUser = action.payload),
		signInSuccess: (state, action) =>
			void (state.signInSuccess = action.payload),
		signUpError: (state, action) => void (state.signUpError = action.payload),

		signUpSuccess: (state, action) =>
			void (state.signUpSuccess = action.payload),

		resetPasswordSuccess: (state, action) =>
			void (state.resetPasswordSuccess = action.payload),

		resetPasswordError: (state, action) => {
			state.resetPasswordError = action.payload;
		},
		resetAuthForms: (state) => {
			state.signUpSuccess = false;
			state.signInSuccess = false;
			state.signUpError = [];
			state.resetPasswordSuccess = false;
			state.resetPasswordError = [];
		},
	},
});

export const {
	setCurrentUser,
	signInSuccess,
	signUpError,
	signUpSuccess,
	resetPasswordSuccess,
	resetPasswordError,
	resetAuthForms,
} = userSlice.actions;

export const selectSignIn = ({ user }) => user.signInSuccess;
export const selectCurrentUser = ({ user }) => user.currentUser;
export const selectSignUpStatus = ({ user }) => ({
	signUpSuccess: user.signUpSuccess,
	signUpError: user.signUpError,
});
export const selectResetPasswordStatus = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	resetPasswordError: user.resetPasswordError,
});

export const signInUser =
	({ email, password }) =>
	async (dispatch) => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			dispatch(signInSuccess(true));
		} catch (error) {
			//console.log(error);
		}
	};
export const signUpUser =
	({ displayName, email, password, confirmPassword }) =>
	async (dispatch) => {
		if (password !== confirmPassword) {
			const err = ["Passwords don't match"];
			dispatch(signUpError(err));
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await handleUserProfile(user, { displayName });
			dispatch(signUpSuccess(true));
		} catch (error) {
			//console.log(error)
		}
	};
export const resetPassword =
	({ email }) =>
	async (dispatch) => {
		const config = {
			url: "http://localhost:3000/login",
		};
		try {
			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					dispatch(resetPasswordSuccess(true));
				})
				.catch(() => {
					const err = ["Email not found or entered incorrectly"];
					dispatch(resetPasswordError(err));
				});
		} catch (error) {
			console.log(error);
		}
	};
export const signInWithGoogle = () => async (dispatch) => {
	try {
		await auth.signInWithPopup(GoogleProvider).then(() => {
			dispatch(signInSuccess(true));
		});
	} catch (error) {
		//console.log(error)
	}
};
export default userSlice.reducer;
