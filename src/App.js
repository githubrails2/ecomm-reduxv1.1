import { useEffect } from "react";
import "./default.scss";
import { Homepage, Registration, Login, Recovery, Dashboard } from "./pages";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import { auth, handleUserProfile } from "./firebase/utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/slices/userSlice";
import WithAuth from "./HOC/WithAuth";

const App = () => {
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
