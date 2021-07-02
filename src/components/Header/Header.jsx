import "./Header.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
<<<<<<< HEAD
import { selectCurrentUser } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
const Header = () => {
	const currentUser = useSelector(selectCurrentUser);
=======
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/userSlice";
const Header = () => {
	const currentUser = useSelector(selectCurrentUser);

>>>>>>> main
	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<img src="" alt="Simple Tut" />
					</Link>
				</div>
				<div className="callToActions">
					{currentUser && (
						<ul>
							<li>
								<Link to="/dashboard">my account </Link>
							</li>
							<li>
								<span onClick={() => auth.signOut()}>LogOut</span>
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
