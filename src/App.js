import { useEffect } from "react";
import "./default.scss";
import {
	Homepage,
	Registration,
	Login,
	Recovery,
	Dashboard,
	Admin,
	Search,
	ProductDetails,
	Cart,
	Payment,
	Order
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
import DashBoardLayout from "./layouts/DashBoardLayout";
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
					exact
					path="/search"
					render={() => (
						<MainLayout>
							<Search />
						</MainLayout>
					)}
				/>
				<Route
					path="/search/:filterType"
					render={() => (
						<MainLayout>
							<Search />
						</MainLayout>
					)}
				/>
				<Route
					path="/product/:productID"
					render={() => (
						<MainLayout>
							<ProductDetails />
						</MainLayout>
					)}
				/>
				<Route
					path="/cart"
					render={() => (
						<MainLayout>
							<Cart />
						</MainLayout>
					)}
				/>
				<Route
					path="/payment"
					render={() => (
						<WithAuth>
							<MainLayout>
								<Payment />
							</MainLayout>
						</WithAuth>
					)}
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
				<Route path='/orders/:orderID' render={() => (
					<WithAuth>
						<DashBoardLayout>
							<Order/>
						</DashBoardLayout>
					</WithAuth>
				)}/>
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
