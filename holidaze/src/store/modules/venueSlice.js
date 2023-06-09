import { createSlice } from '@reduxjs/toolkit';
import { setLoadingState } from './loaderSlice';
import { setError } from './errorSlice';

const venueSlice = createSlice({
	name: 'venues',
	initialState: {
		venues: [],
		singleVenue: null,
		cheapestHouses: [],
		topRatedHouses: [],
		totalVenues: 0,
		createVenue: null,
		bookVenue: null,
		singleBooking: null,
	},
	reducers: {
		setVenues: (state, action) => {
			state.venues = action.payload;
			const lowestPrice = Math.min(
				...state.venues.map((v) => v.price)
			);
			state.cheapestHouses = state.venues.filter(
				(v) => v.price === lowestPrice
			);
			const highestRating = Math.max(
				...state.venues.map((v) => v.rating)
			);
			state.topRatedHouses = state.venues.filter(
				(v) => v.rating === highestRating
			);
		},
		removeBooking: (state) => {
			state.singleBooking = null;
		},
		setSingleVenue: (state, action) => {
			state.singleVenue = action.payload;
		},
		setTotalVenues: (state, action) => {
			state.totalVenues = action.payload;
		},
		SET_CREATE_VENUE: (state, action) => {
			state.createVenue = action.payload;
		},
		SET_DELETE_VENUE: (state, action) => {
			state.deleteVenue = action.payload;
		},
		SET_UPDATE_VENUE: (state, action) => {
			state.updateVenue = action.payload;
		},
		SET_SINGLE_BOOKING: (state, action) => {
			state.singleBooking = action.payload;
		},
		SET_BOOK_VENUE: (state, action) => {
			state.bookVenue = action.payload;
		},
	},
});

export default venueSlice.reducer;

export const {
	setVenues,
	setSingleVenue,
	setTotalVenues,
	SET_DELETE_VENUE,
	removeBooking,
	SET_CREATE_VENUE,
	SET_UPDATE_VENUE,
	SET_SINGLE_BOOKING,
	SET_BOOK_VENUE,
} = venueSlice.actions;
const accessToken = localStorage.getItem(
	'accessToken'
);
export const fetchVenues =
	() => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/venues'
			);
			const data = await response.json();
			dispatch(setVenues(data));
			dispatch(setLoadingState(false));
			return data;
		} catch (e) {
			dispatch(setError(true, e.message));
			dispatch(setLoadingState(false));
		}
	};

export const fetchSingleVenue =
	(id) => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
			);
			const data = await response.json();
			dispatch(setSingleVenue(data));
			dispatch(setLoadingState(false));
		} catch (e) {
			console.error(
				`Failed to fetch venue ${id}`,
				e
			);
			dispatch(setError(true, e.message));
			dispatch(setLoadingState(false));
		}
	};
export const fetchTotalVenues =
	() => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/venues'
			);
			const data = await response.json();
			dispatch(setTotalVenues(data.totalVenues));
			dispatch(setLoadingState(false));
		} catch (e) {
			console.error(
				'Failed to fetch total venues',
				e
			);
			dispatch(setError(true, e.message));
			dispatch(setLoadingState(false));
		}
	};
export const newVenue =
	(venueData) => async (dispatch) => {
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/venues',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(venueData),
				}
			);
			const data = await response.json();
			console.log(data);
			dispatch(SET_CREATE_VENUE(data));
			window.location.href = '/';
		} catch (e) {
			console.log(e);
			dispatch(setError(true, e.message));
			dispatch(setLoadingState(false));
		}
	};

export const deleteVenue =
	(id) => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to delete venue');
			}

			dispatch(SET_DELETE_VENUE(id));
			dispatch(setLoadingState(false));
			window.location.href = '/profile';
		} catch (e) {
			console.error(
				`Failed to delete venue ${id}`,
				e
			);
			dispatch(setError(true, e.message));
			dispatch(setLoadingState(false));
		}
	};

export const updateVenue =
	(id, venueData) => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(venueData),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to update venue');
			}

			const data = await response.json();
			console.log(data);
			dispatch(SET_UPDATE_VENUE(data));
			dispatch(setLoadingState(false));
			window.location.href = '/profile';
		} catch (e) {
			console.error(
				`Failed to update venue ${id}`,
				e
			);
			dispatch(setError(true, e.message));
			dispatch(setLoadingState(false));
		}
	};
export const fetchSingleBooking =
	(id) => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/bookings/${id}?_customer=true`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await response.json();
			console.log(data);
			dispatch(SET_SINGLE_BOOKING(data));
			dispatch(setLoadingState(false));
		} catch (e) {
			dispatch(setLoadingState(false));
			dispatch(setError(true, e.message));
		}
	};

export const bookVenue =
	(venueData) => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/bookings`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(venueData),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to book venue');
			}

			const data = await response.json();
			console.log(data);
			dispatch(SET_BOOK_VENUE(data));
			dispatch(setLoadingState(false));
		} catch (e) {
			console.error(`Failed to book venue`, e);
			dispatch(setError(true, e.message));
			dispatch(setLoadingState(false));
		}
	};

export const deleteBooking =
	(id) => async (dispatch) => {
		dispatch(setLoadingState(true));
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/bookings/${id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(
					`Failed to delete booking ${id}`
				);
			}

			// Remove booking from the state
			dispatch(removeBooking());

			window.location.href = '/profile';
		} catch (e) {
			console.error(
				`Failed to delete booking ${id}`,
				e
			);
			dispatch(setError(true, e.message));
		} finally {
			dispatch(setLoadingState(false));
		}
	};
