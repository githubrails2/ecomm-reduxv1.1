import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser: (state, action) =>
			void (state.currentUser = action.payload),
	},
});

export const { setCurrentUser } = userSlice.actions;

export const selectCurrentUser = ({ user }) => user.currentUser;

export default userSlice.reducer;
