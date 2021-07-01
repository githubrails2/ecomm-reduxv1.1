import React from "react";
import { Header, Footer } from "../components";
const MainLayout = (props) => {
	return (
		<div className="fullHeight">
			<Header {...props} />
			<div className="main">{props.children}</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
