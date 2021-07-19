import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderHistory: [],
    orderDetails: {}
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        saveOrderHistoryStart: () => {
            
        },
        getUserOrderHistoryStart: () => { },
        setUserOrderHistory: (state, action) => {
            state.orderHistory = action.payload;
        },
        getOrderDetailsStart: () => { },
        setOrderDetails: (state,action)=>{
            state.orderDetails = action.payload;
        }
    }
});
export const selectOrderHistory = ({ ordersData }) => ordersData.orderHistory
export const selectOrderDetails = ({ ordersData }) => ordersData.orderDetails;
export const {
    saveOrderHistoryStart,
    getUserOrderHistoryStart, setUserOrderHistory,
    getOrderDetailsStart,
    setOrderDetails
} = orderSlice.actions
export default orderSlice.reducer