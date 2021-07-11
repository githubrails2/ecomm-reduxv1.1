import "./Header.scss";
import { Link } from "react-router-dom";
import {
	selectCurrentUser,
	signOutUserStart,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
const Header = () => {
	const currentUser = useSelector(selectCurrentUser);
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
							<Link to="/search">Search</Link>
						</li>
						<li> <Link to="/">Home</Link></li>

					</ul>
				</nav>

				<div className="callToActions">
					{currentUser && (
						<ul>
							<li>
								<Link to="/dashboard">my account </Link>
							</li>
							<li>
								<span onClick={() => handleSignOut()}>LogOut</span>
							</li>
						</ul>
					)}

					{!currentUser && (
						<ul>
							<li>
								<Link to="/registration">Register</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</header>
	);
};
Header.defaultProps = {
	currentUser: null,
};
export default Header;
