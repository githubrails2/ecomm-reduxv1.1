import "./default.scss";
import { Header } from "./components";
import { Homepage } from "./pages";
const App = () => {
	return (
		<div className="App">
			<Header />
			<div className="main">
				<Homepage />
			</div>
		</div>
	);
};

export default App;
