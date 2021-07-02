import "./SignUp.scss";
import { useState } from "react";
import { Button, FormInput } from "../Forms";
import { handleUserProfile, auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
const SignUp = () => {
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const resetForm = () => {
		setDisplayName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setErrors([]);
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			const err = ["Passwords don't match"];
			setErrors(err);
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await handleUserProfile(user, { displayName });
			resetForm();
		} catch (error) {
			//console.log(error)
		}
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

export default SignUp;
