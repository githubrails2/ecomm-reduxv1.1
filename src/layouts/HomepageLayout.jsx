import React from "react";
import { Header, Footer } from "../components";
const HomepageLayout = (props) => {
	return (
		<div>
			<Header {...props} />
			<div className="main">{props.children}</div>
			<Footer />
		</div>
	);
};

export default HomepageLayout;
