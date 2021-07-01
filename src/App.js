import { useState, useEffect } from "react";
import "./default.scss";
import { Homepage, Registration, Login } from "./pages";
import { Switch, Route, Redirect } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import { auth, handleUserProfile } from "./firebase/utils";
const App = () => {
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snapshot) => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			}
			setCurrentUser(userAuth);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className="App">
			<Switch>
				<Route
					exact
					path="/"
					render={() => {
						return (
							<HomepageLayout currentUser={currentUser}>
								<Homepage />
							</HomepageLayout>
						);
					}}
				/>
				<Route
					path="/registration"
					render={() => (
						<MainLayout currentUser={currentUser}>
							<Registration />
						</MainLayout>
					)}
				/>
				<Route
					path="/login"
					render={() =>
						currentUser ? (
							<Redirect to="/" />
						) : (
							<MainLayout currentUser={currentUser}>
								<Login />
							</MainLayout>
						)
					}
				/>
			</Switch>
		</div>
	);
};

export default App;
