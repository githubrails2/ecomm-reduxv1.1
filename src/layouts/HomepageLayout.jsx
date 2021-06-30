import React from "react";
import { Header, Footer } from "../components";
const HomepageLayout = ({ children }) => {
	return (
		<div>
			<Header />
			<div className="main">{children}</div>
			<Footer />
		</div>
	);
};

export default HomepageLayout;
