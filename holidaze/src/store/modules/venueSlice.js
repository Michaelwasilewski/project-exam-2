import {
	createSlice,
	createAction,
} from '@reduxjs/toolkit';

const venueSlice = createSlice({
	name: 'venues',
	initialState: {
		venues: [],
		singleVenue: null,
		cheapestHouses: [],
		topRatedHouses: [],
		totalVenues: 0,
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
	},
});

export default venueSlice.reducer;

export const {
	setVenues,
	setSingleVenue,
	setTotalVenues,
} = venueSlice.actions;

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
