import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
	name: 'loader',
	initialState: {
		isLoading: false,
	},
	reducers: {
		SET_LOADER: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export default loaderSlice.reducer;

const { SET_LOADER } = loaderSlice.actions;

export const setLoadingState =
	(loadingStatus) => async (dispatch) => {
		dispatch(SET_LOADER(loadingStatus));
	};
