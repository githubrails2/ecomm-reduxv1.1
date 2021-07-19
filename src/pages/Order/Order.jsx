import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailsStart, selectOrderDetails } from '../../redux/slices/orderSlice';
import { useDispatch,useSelector } from 'react-redux';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
const Order = () => {
    const { orderID } = useParams();
    const dispatch = useDispatch();
    const orderDetails = useSelector(selectOrderDetails);
    const { orderTotal } = orderDetails;
    console.log(orderDetails);
    useEffect(() => {
        dispatch(getOrderDetailsStart(orderID))
    }, [dispatch,orderID]);
    return (
        <div>
            <h1>Order ID: {orderID}</h1>
            <OrderDetails order={orderDetails}/>
            <h3>Total: {orderTotal}</h3>
        </div>
    )
}

export default Order
