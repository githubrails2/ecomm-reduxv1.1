//react functions
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//auth Wrapper
import AuthWrapper from "../AuthWrapper/AuthWrapper";

//scss styles
import "./EmailPassword.scss";

//form components
import { Button, FormInput } from "../Forms";

//action types and selectors from slices
import {
	resetAuthForms,
	resetPassword,
	selectResetPasswordStatus,
} from "../../redux/slices/userSlice";

const EmailPassword = ({ history }) => {
	const configAuthWrapper = {
		headline: "Recover Password",
	};
	const history = useHistory();
	const dispatch = useDispatch();
	const { resetPasswordSuccess, resetPasswordError } = useSelector(
		selectResetPasswordStatus
	);
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPassword({ email }));
	};
	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetAuthForms());
			history.push("/login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
			setErrors(resetPasswordError);
		}
	}, [resetPasswordError]);
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

export default EmailPassword;
