import "./Signin.scss";
import Button from "../Forms/Button/Button";
import { signInWithGoogle } from "../../firebase/utils";
const SignIn = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
	};
	return (
		<div className="signin">
			<div className="wrap">
				<h2>LogIn</h2>
				<div className="formWrap">
					<form onSubmit={handleSubmit}>
						<div className="socalSignIn">
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
