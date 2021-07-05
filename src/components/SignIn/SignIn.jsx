//react defined
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
//user defined
import {
	signInUser,
	selectSignIn,
	signInWithGoogle,
	resetAuthForms,
} from "../../redux/slices/userSlice";
import "./Signin.scss";
import { Button, FormInput } from "../Forms";

import AuthWrapper from "../AuthWrapper/AuthWrapper";

const SignIn = ({ history }) => {
	const dispatch = useDispatch();
	const signInSuccess = useSelector(selectSignIn);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	useEffect(() => {
		if (signInSuccess) {
			resetForm();
			dispatch(resetAuthForms());
			history.push("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signInSuccess]);
	const resetForm = () => {
		setEmail("");
		setPassword("");
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signInUser({ email, password }));
	};
	const handleGoogleSignIn = () => {
		dispatch(signInWithGoogle());
	};
	const configAuthWrapper = {
		headline: "Login",
	};
	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className="formWrap">
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={email}
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						handleChange={(e) => setPassword(e.target.value)}
					/>
					<Button type="submit">Login</Button>
					<div className="socialSignIn">
						<div className="row">
							<Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
						</div>
					</div>
					<div className="links">
						<Link to="/recovery"> Forgot password?</Link>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default withRouter(SignIn);
