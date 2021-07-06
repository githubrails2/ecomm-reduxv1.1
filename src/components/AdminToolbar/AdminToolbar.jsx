import "./AdminToolbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/userSlice";
import { checkUserIsAdmin } from "../../utils/";
const AdminToolbar = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isAdmin = checkUserIsAdmin(currentUser);
	if (!isAdmin) return null;
	return (
		<div className="adminToolbar">
			<ul>
				<li>
					<Link to="/admin">My Admin</Link>
				</li>
			</ul>
		</div>
	);
};

export default AdminToolbar;
