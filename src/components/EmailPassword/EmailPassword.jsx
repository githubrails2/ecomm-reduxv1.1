import AuthWrapper from "../AuthWrapper/AuthWrapper";
import "./EmailPassword.scss";
import { Button, FormInput } from "../Forms";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	resetUserState,
	resetPasswordStart,
	selectResetPasswordStatus,
} from "../../redux/slices/userSlice";

const EmailPassword = ({ history }) => {
	const configAuthWrapper = {
		headline: "Recover Password",
	};
	const dispatch = useDispatch();
	const { resetPasswordSuccess, userError } = useSelector(
		selectResetPasswordStatus
	);
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPasswordStart({ email }));
	};
	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetUserState());
			history.push("/login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(userError) && userError.length > 0) {
			setErrors(userError);
		}
	}, [userError]);
	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className="formWrap">
				{errors.length > 0 && (
					<ul>
						{errors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				)}
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={email}
						handleChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
					<Button type="submit">Recover Password</Button>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default withRouter(EmailPassword);
