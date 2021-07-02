import "./AuthWrapper.scss";
const AuthWrapper = ({ headline, children }) => {
	return (
		<div className="authWrapper">
			{headline && <h2>{headline}</h2>}
			<div className="wrap">
				<div className="children">{children && children}</div>
			</div>
		</div>
	);
};

export default AuthWrapper;
