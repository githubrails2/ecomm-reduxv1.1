import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/userSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const useAuth = () => {
	const currentUser = useSelector(selectCurrentUser);
	const history = useHistory();
	useEffect(() => {
		if (!currentUser) {
			history.push("/login");
		}
	}, [currentUser, history]);
	return currentUser;
};

export default useAuth;
