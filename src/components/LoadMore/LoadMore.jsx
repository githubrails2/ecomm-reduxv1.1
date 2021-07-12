import "./LoadMore.scss";
import { Button } from "../Forms";
const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
	return <Button onClick={() => onLoadMoreEvt()}>Load More</Button>;
};

export default LoadMore;
