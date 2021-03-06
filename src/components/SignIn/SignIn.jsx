//react defined
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
//user defined
import {
	googleSignInStart,
	emailSigninStart,
	selectCurrentUser,
} from "../../redux/slices/userSlice";
import "./Signin.scss";
import { Button, FormInput } from "../Forms";
import AuthWrapper from "../AuthWrapper/AuthWrapper";

const SignIn = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	useEffect(() => {
		if (currentUser) {
			resetForm();
			history.push("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);
	const resetForm = () => {
		setEmail("");
		setPassword("");
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(emailSigninStart({ email, password }));
	};
	const handleGoogleSignIn = () => {
		dispatch(googleSignInStart());
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

export default SignIn;
