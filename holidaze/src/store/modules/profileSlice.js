import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		name: '',
		email: '',
		avatar: '',
		venueManager: false,
		venues: [],
	},
	reducers: {
		setProfileData: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.avatar = action.payload.avatar;
			state.venueManager =
				action.payload.venueManager;
			state.venues = action.payload.venues;
		},
	},
});

export const { setProfileData } =
	profileSlice.actions;

export default profileSlice.reducer;

export const fetchProfileData =
	(accessToken, name) => async (dispatch) => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}?_venues=true`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(
					'Failed to fetch profile data'
				);
			}

			const data = await response.json();
			dispatch(setProfileData(data));
		} catch (error) {
			console.error(error);
		}
	};
