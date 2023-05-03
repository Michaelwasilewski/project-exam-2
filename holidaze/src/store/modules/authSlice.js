import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: null,
	user: null,
	isLoggedIn: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
	},
});

export const {
	setAccessToken,
	setUser,
	setIsLoggedIn,
} = authSlice.actions;

export default authSlice.reducer;
