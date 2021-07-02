import "./Signin.scss";
import { Button, FormInput } from "../Forms";
import { auth, signInWithGoogle } from "../../firebase/utils";
import { useState } from "react";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { Link } from "react-router-dom";
const SignIn = () => {
	const resetForm = () => {
		setEmail("");
		setPassword("");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			resetForm();
		} catch (error) {
			console.log(error);
		}
	};
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
							<Button onClick={signInWithGoogle}>Sign In with Google</Button>
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
