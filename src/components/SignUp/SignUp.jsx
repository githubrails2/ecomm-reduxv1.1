import "./SignUp.scss";
import { useState, useEffect } from "react";
import { Button, FormInput } from "../Forms";

import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	signUpUser,
	selectSignUpStatus,
	resetAuthForms,
} from "../../redux/slices/userSlice";

const SignUp = ({ history }) => {
	const dispatch = useDispatch();
	const { signUpSuccess, signUpError } = useSelector(selectSignUpStatus);
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	useEffect(() => {
		if (signUpSuccess) {
			resetForm();
			dispatch(resetAuthForms());
			history.push("/");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signUpSuccess]);
	useEffect(() => {
		if (Array.isArray(signUpError) && signUpError.length > 0) {
			setErrors(signUpError);
		}
	}, [signUpError]);

	const resetForm = () => {
		setDisplayName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setErrors([]);
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		dispatch(signUpUser({ displayName, email, password, confirmPassword }));
	};
	const configAuthWrapper = {
		headline: "Registration",
	};
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
				<form onSubmit={handleFormSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						placeholder="Full Name"
						handleChange={(e) => setDisplayName(e.target.value)}
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						handleChange={(e) => setPassword(e.target.value)}
					/>
					<FormInput
						type="password"
						name="password"
						value={confirmPassword}
						placeholder="Confirm Password"
						handleChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button type="submit">Register</Button>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default withRouter(SignUp);
