import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		singleProfile: null,
		venueBookings: null,
	},
	reducers: {
		SET_SINGLE_PROFILE: (state, action) => {
			state.singleProfile = action.payload;
		},
		SET_VENUE_BOOKINGS: (state, action) => {
			state.venueBookings = action.payload;
		},
	},
});

export default profileSlice.reducer;

const { SET_SINGLE_PROFILE, SET_VENUE_BOOKINGS } =
	profileSlice.actions;
const accessToken = localStorage.getItem(
	'accessToken'
);

export const fetchSingleProfile =
	(name, profileData) => async (dispatch) => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(profileData),
				}
			);
			const data = await response.json();
			console.log(data);
			dispatch(SET_SINGLE_PROFILE(data));
		} catch (e) {
			console.log(e);
		}
	};
export const logInUser = (userData) => {
	fetch(
		'https://nf-api.onrender.com/api/v1/holidaze/auth/login',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			localStorage.setItem('userName', data.name);
			localStorage.setItem('email', data.email);
			localStorage.setItem('avatar', data.avatar);
			localStorage.setItem(
				'accessToken',
				data.accessToken
			);
			localStorage.setItem(
				'venueManager',
				data.venueManager
			);
			window.location.href = '/';
		})
		.catch((error) => {
			alert('Wrong password or email');
		});
};

export const registerUser = (userData) => {
	fetch(
		'https://nf-api.onrender.com/api/v1/holidaze/auth/register',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			window.location.href = '/login';
		})
		.catch((error) => {
			alert('There was an error, try again');
		});
};

export const fetchBookings =
	(name, profileData) => async (dispatch) => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}/venues?_bookings=true&_owner=true`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(profileData),
				}
			);
			const data = await response.json();
			dispatch(SET_VENUE_BOOKINGS(data));
		} catch (e) {
			console.error(e);
		}
	};
