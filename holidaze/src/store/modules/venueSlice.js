import { createSlice } from '@reduxjs/toolkit';

const venueSlice = createSlice({
	name: 'venues',
	initialState: {
		venues: [],
		singleVenue: null,
		cheapestHouses: [],
		topRatedHouses: [],
		totalVenues: 0,
		createVenue: null,
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
			state.createVenue = action.payload;
		},
		SET_UPDATE_VENUE: (state, action) => {
			state.createVenue = action.payload;
		},
	},
});

export default venueSlice.reducer;

export const {
	setVenues,
	setSingleVenue,
	setTotalVenues,
	SET_DELETE_VENUE,
	SET_CREATE_VENUE,
	SET_UPDATE_VENUE,
} = venueSlice.actions;
const accessToken = localStorage.getItem(
	'accessToken'
);
export const fetchVenues =
	() => async (dispatch) => {
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/venues'
			);
			const data = await response.json();
			dispatch(setVenues(data));
			return data; // Add this line
		} catch (e) {
			console.error('Failed to fetch venues', e);
		}
	};

export const fetchSingleVenue =
	(id) => async (dispatch) => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`
			);
			const data = await response.json();
			dispatch(setSingleVenue(data));
		} catch (e) {
			console.error(
				`Failed to fetch venue ${id}`,
				e
			);
		}
	};
export const fetchTotalVenues =
	() => async (dispatch) => {
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/venues'
			);
			const data = await response.json();
			dispatch(setTotalVenues(data.totalVenues));
		} catch (e) {
			console.error(
				'Failed to fetch total venues',
				e
			);
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
			// window.location.href = '/';
		} catch (e) {
			console.log(e);
		}
	};

export const deleteVenue = (id) => {
	fetch(
		`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		}
	).then(() => {
		window.location.href = '/profile';
	});
};

export const updateVenue =
	(id, venueData) => async (dispatch) => {
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
			const data = await response.json();
			console.log(data);
			dispatch(SET_UPDATE_VENUE(data));
			window.location.href = '/profile';
		} catch (e) {
			console.log(e);
		}
	};
