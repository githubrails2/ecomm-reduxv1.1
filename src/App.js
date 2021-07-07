import { useEffect } from "react";
import "./default.scss";
import {
	Homepage,
	Registration,
	Login,
	Recovery,
	Dashboard,
	Admin,
} from "./pages";
import { AdminToolbar } from "./components";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import { checkUserSession } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";

import WithAuth from "./HOC/WithAuth";
import WithAdminAuth from "./HOC/WithAdminAuth";
import AdminLayout from "./layouts/AdminLayout";
const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);

	return (
		<div className="App">
			<AdminToolbar />
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
				<Route
					path="/admin"
					render={() => (
						<WithAdminAuth>
							<AdminLayout>
								<Admin />
							</AdminLayout>
						</WithAdminAuth>
					)}
				/>
			</Switch>
		</div>
	);
};

export default App;
