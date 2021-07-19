import "./Dashboard.scss";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUserOrderHistoryStart, selectOrderHistory } from '../../redux/slices/orderSlice';
import { selectCurrentUser } from '../../redux/slices/userSlice';
import OrderHistory from "../../components/OrderHistory/OrderHistory";

const Dashboard = () => {
	const dispatch = useDispatch();
	
	const currentUser = useSelector(selectCurrentUser);
	const orderHistory = useSelector(selectOrderHistory);
	useEffect(() => {
		dispatch(getUserOrderHistoryStart(currentUser.id));
	}, [currentUser.id,dispatch]);

	return <div>
		<h1>Order History</h1>
		<OrderHistory orders={orderHistory}/>
	</div>
};

export default Dashboard;
