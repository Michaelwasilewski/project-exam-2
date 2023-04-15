import { createSlice } from '@reduxjs/toolkit';
import { setLoadingState } from './loaderSlice';
const venueSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
		singleProduct: null,
		isError: false,
		filteredProducts: [],
	},
	reducers: {
		SET_PRODUCTS: (state, action) => {
			state.products = action.payload;
		},
		SET_SINGLE_PRODUCT: (state, action) => {
			state.singleProduct = action.payload;
		},
		SET_ERROR: (state, action) => {
			state.isError = action.payload;
		},
		SET_FILTERED_PRODUCTS: (state, action) => {
			state.filteredProducts = action.payload;
		},
	},
});

export default venueSlice.reducer;

const { SET_PRODUCTS } = venueSlice.actions;
const { SET_SINGLE_PRODUCT } = venueSlice.actions;
const { SET_ERROR } = venueSlice.actions;
const { SET_FILTERED_PRODUCTS } =
	venueSlice.actions;

export const FetchVenues =
	() => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/venues'
			);
			const data = await response.json();
			dispatch(SET_PRODUCTS(data));
			dispatch(setLoadingState(false));
		} catch (e) {
			return console.error(e.message);
		}
	};

export const FetchSingleVenue =
	(id) => async (dispatch) => {
		dispatch(setLoadingState(true));
		let response;
		try {
			response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`
			);
			const singleProductData =
				await response.json();
			dispatch(
				SET_SINGLE_PRODUCT(singleProductData)
			);
			dispatch(setLoadingState(false));
		} catch (e) {
			return console.error(e.message);
		}
		if (response.ok) {
			dispatch(handleResponseError(false));
		} else {
			dispatch(handleResponseError(true));
		}
	};

export const handleResponseError =
	(response) => (dispatch) => {
		dispatch(SET_ERROR(response));
	};

export const handleFilteredProducts =
	(filteredProducts) => (dispatch) => {
		dispatch(
			SET_FILTERED_PRODUCTS(filteredProducts)
		);
	};
