import { useEffect } from "react";
import "./default.scss";
import { Homepage, Registration, Login, Recovery } from "./pages";
import { Switch, Route, Redirect } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import { auth, handleUserProfile } from "./firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "./redux/slices/userSlice";
const App = () => {
	const currentUser = useSelector(selectCurrentUser);
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
				/>
				<Route
					path="/recovery"
					render={() => (
						<MainLayout>
							<Recovery />
						</MainLayout>
					)}
				/>
			</Switch>
		</div>
	);
};

export default App;
