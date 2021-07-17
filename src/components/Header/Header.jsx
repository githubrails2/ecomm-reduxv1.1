import "./Header.scss";
import { Link } from "react-router-dom";
import {
	selectCurrentUser,
	signOutUserStart,
} from "../../redux/slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
import { selectCartItemsCount } from "../../redux/slices/cartSlice";
import { Fragment } from "react";
const Header = () => {
	const currentUser = useSelector(selectCurrentUser);
	const totalNumCartItems = useSelector(selectCartItemsCount);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		dispatch(signOutUserStart());
	};
	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<img src={Logo} alt="Simple Tut" />
					</Link>
				</div>
				<nav>
					<ul>
						<li>
							{" "}
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/search">Search</Link>
						</li>
					</ul>
				</nav>

				<div className="callToActions">
					<ul>
						<li>
							<Link to="/cart">Your Cart ({totalNumCartItems})</Link>
						</li>
						{currentUser ? (
							<Fragment>
								<li>
									<Link to="/dashboard">my account </Link>
								</li>

								<li>
									<span onClick={() => handleSignOut()}>LogOut</span>
								</li>
							</Fragment>
						) : (
							<Fragment>
								<li>
									<Link to="/registration">Register</Link>
								</li>

								<li>
									<Link to="/login">Login</Link>
								</li>
							</Fragment>
						)}
					</ul>
				</div>
			</div>
		</header>
	);
};
Header.defaultProps = {
	currentUser: null,
};
export default Header;
