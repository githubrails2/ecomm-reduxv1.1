import "./Directory.scss";
import shopMens from "../../assets/shopMens.jpg";
import shopWomens from "../../assets/shopWomens.jpg";
const Directory = () => {
	return (
		<div className="directory">
			<div className="wrap">
				<div className="item" style={{ backgroundImage: `url(${shopWomens})` }}>
					<a href="">Shop Womens</a>
				</div>
				<div className="item" style={{ backgroundImage: `url(${shopMens})` }}>
					<a href="">Shop Mens</a>
				</div>
			</div>
		</div>
	);
};

export default Directory;
