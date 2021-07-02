import { useEffect } from "react";
import "./default.scss";
import { Homepage, Registration, Login, Recovery, Dashboard } from "./pages";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import { auth, handleUserProfile } from "./firebase/utils";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/slices/userSlice";
import WithAuth from "./HOC/WithAuth";
const App = () => {
=======
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "./redux/slices/userSlice";
const App = () => {
	const currentUser = useSelector(selectCurrentUser);
>>>>>>> main
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snapshot) => {
					dispatch(
						setCurrentUser({
							id: snapshot.id,
							...snapshot.data(),
						})
					);
				});
			}
			dispatch(setCurrentUser(userAuth));
		});
		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	return (
		<div className="App">
			<Switch>
				<Route
					exact
					path="/"
					render={() => {
						return (
							<HomepageLayout>
								<Homepage />
							</HomepageLayout>
						);
					}}
				/>
				<Route
					path="/registration"
<<<<<<< HEAD
					render={() => (
						<MainLayout>
							<Registration />
						</MainLayout>
					)}
				/>
				<Route
					path="/login"
					render={() => (
						<MainLayout>
							<Login />
						</MainLayout>
					)}
=======
					render={() =>
						currentUser ? (
							<Redirect to="/" />
						) : (
							<MainLayout>
								<Registration />
							</MainLayout>
						)
					}
				/>
				<Route
					path="/login"
					render={() =>
						currentUser ? (
							<Redirect to="/" />
						) : (
							<MainLayout>
								<Login />
							</MainLayout>
						)
					}
>>>>>>> main
				/>
				<Route
					path="/recovery"
					render={() => (
						<MainLayout>
							<Recovery />
						</MainLayout>
					)}
				/>
				<Route
					path="/dashboard"
					render={() => (
						<WithAuth>
							<MainLayout>
								<Dashboard />
							</MainLayout>
						</WithAuth>
					)}
				/>
			</Switch>
		</div>
	);
};

export default App;
