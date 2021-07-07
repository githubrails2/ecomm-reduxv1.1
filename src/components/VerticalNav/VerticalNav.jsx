import "./VerticalNav.scss";
import { selectCurrentUser } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { UserProfile } from "../index";
const VerticalNav = ({ children }) => {
	const currentUser = useSelector(selectCurrentUser);
	const configUserProfile = {
		currentUser,
	};
	return (
		<div className="verticalNav">
			<UserProfile {...configUserProfile} />

			<div className="menu">{children}</div>
		</div>
	);
};

export default VerticalNav;
