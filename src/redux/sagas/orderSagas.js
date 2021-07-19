
import { takeLatest,put,all,call} from 'redux-saga/effects';
import { auth } from '../../firebase/utils';
import { clearCart } from '../slices/cartSlice';
import { getOrderDetailsStart, getUserOrderHistoryStart, saveOrderHistoryStart, setOrderDetails, setUserOrderHistory, } from '../slices/orderSlice';
import { handleGetHistoryOrderDetails, handleGetOrderHistory, handleSaveOrder } from './helpers/order_saga.helper';
export function* saveOrder({ payload }) {
  
    try {
        const timestamp = new Date()
        yield handleSaveOrder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamp
        })
        yield(put(clearCart()))
    } catch (error) {
        //console.log(error)
    }
}
export function* onSaveOrderHistoryStart() {
    yield takeLatest(saveOrderHistoryStart, saveOrder);
}
export function* getUserOrderHistory({ payload }) {
    
    try {
        const history = yield handleGetOrderHistory(payload);
      
        yield put(
            setUserOrderHistory(history)
        )
    } catch (error) {
        console.log(error)
    }

}
export function* getOrderHistoryDetails({ payload }) {
    try {
        const order = yield handleGetHistoryOrderDetails(payload);
        yield put(
            setOrderDetails(order)
        )
    } catch (error) {
        //console.log(error)
    }

}
export function* onGetUserOrderHistoryStart() {
    yield takeLatest(getUserOrderHistoryStart,getUserOrderHistory)
}
export function* onGetOrderDetailsStart() {
    yield takeLatest(getOrderDetailsStart,getOrderHistoryDetails);
}
export default function* ordersSaga() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart)
    ])
}