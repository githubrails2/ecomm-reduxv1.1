import "./Signin.scss";
import { Button, FormInput } from "../Forms";
import { auth,signInWithGoogle } from "../../firebase/utils";
import { useState } from "react";
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
			console.log(error)
		}
		
	};
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div className="signin">
			<div className="wrap">
				<h2>LogIn</h2>
				<div className="formWrap">
					<form onSubmit={handleSubmit}>
						<FormInput type="email" name="email" value={email} handleChange={(e) => setEmail(e.target.value)} />
						<FormInput type="password" name="password" value={password} handleChange={(e) => setPassword(e.target.value)} />
						<Button type="submit">Login</Button>
						<div className="socialSignIn">
							<div className="row">
								<Button onClick={signInWithGoogle}>Sign In with Google</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
