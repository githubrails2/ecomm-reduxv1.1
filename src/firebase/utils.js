import { firebaseConfig } from "./config";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export const handleUserProfile = async ({ userAuth, additionalData }) => {
	if (!userAuth) return;
	const { uid } = userAuth;
	const userRef = firestore.doc(`users/${uid}`);
	const snapshot = await userRef.get();
	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const timestamp = new Date();
		const userRoles = ["user"];
		try {
			await userRef.set({
				displayName,
				email,
				createdDate: timestamp.toLocaleDateString(),
				userRoles,
				...additionalData,
			});
		} catch (error) {
			//console.log(error);
		}
	}
	return userRef;
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};
