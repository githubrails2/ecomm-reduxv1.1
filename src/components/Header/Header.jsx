import "./Header.scss";
import { Link } from "react-router-dom";
const Header = () => {
	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<img src="" alt="Simple Tut" />
					</Link>
				</div>
				<div className="callToActions">
					<ul>
						<li>
							<Link to="/registration">Register</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};
export default Header;
