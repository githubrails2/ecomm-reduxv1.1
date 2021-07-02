import AuthWrapper from "../AuthWrapper/AuthWrapper";
import "./EmailPassword.scss";
import { Button, FormInput } from "../Forms";
import { useState } from "react";
import { auth } from "../../firebase/utils";
import { useHistory } from "react-router-dom";

const EmailPassword = () => {
	const configAuthWrapper = {
		headline: "Recover Password",
	};

	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = {
				url: "http://localhost:3000/login",
			};
			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					history.push("/login");
				})
				.catch(() => {
					const err = ["Email not found or entered incorrectly"];
					setErrors(err);
				});
		} catch (error) {
			console.log(error);
		}
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
