import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
	name: 'bookings',
	initialState: {
		bookings: [],
		singleBooking: null,
	},
	reducers: {
		setBookings: (state, action) => {
			state.bookings = action.payload;
		},
		setSingleBooking: (state, action) => {
			state.singleBooking = action.payload;
		},
		SET_DELETE_BOOKING: (state, action) => {
			state.bookings = state.bookings.filter(
				(booking) => booking.id !== action.payload
			);
		},
		SET_CREATE_BOOKING: (state, action) => {
			state.bookings.push(action.payload);
		},
		SET_UPDATE_BOOKING: (state, action) => {
			const index = state.bookings.findIndex(
				(booking) =>
					booking.id === action.payload.id
			);
			if (index !== -1) {
				state.bookings[index] = action.payload;
			}
		},
	},
});

export default bookingSlice.reducer;

export const {
	setBookings,
	setSingleBooking,
	SET_DELETE_BOOKING,
	SET_CREATE_BOOKING,
	SET_UPDATE_BOOKING,
} = bookingSlice.actions;
const accessToken = localStorage.getItem(
	'accessToken'
);

export const fetchBookings =
	() => async (dispatch) => {
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/bookings'
			);
			const data = await response.json();
			dispatch(setBookings(data));
		} catch (e) {
			console.error(
				'Failed to fetch bookings',
				e
			);
		}
	};

export const fetchSingleBooking =
	(id) => async (dispatch) => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/bookings/${id}`
			);
			const data = await response.json();
			dispatch(setSingleBooking(data));
		} catch (e) {
			console.error(
				`Failed to fetch booking ${id}`,
				e
			);
		}
	};

export const createBooking =
	(bookingData) => async (dispatch) => {
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/bookings',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(bookingData),
				}
			);
			const data = await response.json();
			dispatch(SET_CREATE_BOOKING(data));
		} catch (e) {
			console.log(e);
		}
	};

export const deleteBooking =
	(id) => async (dispatch) => {
		try {
			await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/bookings/${id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			dispatch(SET_DELETE_BOOKING(id));
		} catch (e) {
			console.log(e);
		}
	};

export const updateBooking =
	(id, bookingData) => async (dispatch) => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/bookings/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(bookingData),
				}
			);
			const data = await response.json();
			dispatch(SET_UPDATE_BOOKING(data));
		} catch (e) {
			console.log(e);
		}
	};
