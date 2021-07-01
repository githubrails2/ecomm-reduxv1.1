import "./Header.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
const Header = ({ currentUser }) => {
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
