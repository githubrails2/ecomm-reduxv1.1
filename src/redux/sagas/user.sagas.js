import { takeLatest, call, all, put } from "redux-saga/effects";
import {
	auth,
	handleUserProfile,
	GoogleProvider,
	getCurrentUser,
} from "../../firebase/utils";
import {
	signInSuccess,
	emailSigninStart,
	checkUserSession,
	signOutUserSuccess,
	signOutUserStart,
	signUpUserStart,
	userError,
	resetPasswordSuccess,
	resetPasswordStart,
	googleSignInStart,
} from "../slices/userSlice";
import { handleResetPasswordAPI } from "./helpers/user_saga.helpers";
export function* getSnapShotFromUserAuth(user, additionalData = {}) {
	try {
		const userRef = yield call(handleUserProfile, {
			userAuth: user,
			additionalData,
		});
		const snapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: snapshot.id,
				...snapshot.data(),
			})
		);
	} catch (error) {
		console.log(error);
	}
}
export function* emailSignIn({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapShotFromUserAuth(user);
	} catch (error) {
		//console.log(error);
	}
}
export function* onEmailSignInStart() {
	yield takeLatest(emailSigninStart, emailSignIn);
}
export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapShotFromUserAuth(userAuth);
	} catch (error) {
		//console.log(error)
	}
}
export function* onCheckUserSession() {
	yield takeLatest(checkUserSession, isUserAuthenticated);
}
export function* signOutUser() {
	try {
		yield auth.signOut();
		yield put(signOutUserSuccess());
	} catch (error) {
		//console.log(error)
	}
}
export function* onSignOutUserStart() {
	yield takeLatest(signOutUserStart, signOutUser);
}
export function* signUpUser({
	payload: { displayName, email, password, confirmPassword },
}) {
	if (password !== confirmPassword) {
		const err = ["Passwords don't match"];
		yield put(userError(err));
		return;
	}

	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		const additionalData = { displayName };
		yield getSnapShotFromUserAuth(user, additionalData);
	} catch (error) {
		//console.log(error)
	}
}
export function* onSignUpUserStart() {
	yield takeLatest(signUpUserStart, signUpUser);
}
export function* resetPassword({ payload: { email } }) {
	try {
		yield call(handleResetPasswordAPI, email);
		yield put(resetPasswordSuccess(true));
	} catch (error) {
		yield put(userError(error));
	}
}
export function* onResetPasswordStart() {
	yield takeLatest(resetPasswordStart, resetPassword);
}
export function* googleSignIn() {
	try {
		const { user } = yield auth.signInWithPopup(GoogleProvider);
		yield getSnapShotFromUserAuth(user);
	} catch (error) {
		//console.log(error)
	}
}
export function* onGoogleSignInStart() {
	yield takeLatest(googleSignInStart, googleSignIn);
}
export default function* userSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutUserStart),
		call(onSignUpUserStart),
		call(onResetPasswordStart),
		call(onGoogleSignInStart),
	]);
}
