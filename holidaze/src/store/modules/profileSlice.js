import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	profiles: [],
	singleProfile: null,
	loggedInUser: null,
};

const profileSlice = createSlice({
	name: 'profiles',
	initialState,
	reducers: {
		setProfiles: (state, action) => {
			state.profiles = action.payload;
		},
		setSingleProfile: (state, action) => {
			state.singleProfile = action.payload;
		},
		setLoggedInUser: (state, action) => {
			state.loggedInUser = action.payload;
		},
		updateAvatar: (state, action) => {
			const { name, avatar } = action.payload;
			if (state.loggedInUser.name === name) {
				state.loggedInUser.avatar = avatar;
			}
			const profileIndex =
				state.profiles.findIndex(
					(profile) => profile.name === name
				);
			if (profileIndex !== -1) {
				state.profiles[profileIndex].avatar =
					avatar;
			}
			if (
				state.singleProfile &&
				state.singleProfile.name === name
			) {
				state.singleProfile.avatar = avatar;
			}
		},
	},
});

export default profileSlice.reducer;

export const {
	setProfiles,
	setSingleProfile,
	setLoggedInUser,
	updateAvatar,
} = profileSlice.actions;
export const updateLoggedInUserAvatar =
	(name, accessToken, avatarUrl) =>
	async (dispatch) => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}/media`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						avatar: avatarUrl,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(
					`HTTP error! status: ${response.status}`
				);
			}

			const data = await response.json();
			dispatch(setLoggedInUser(data));
		} catch (e) {
			console.error(
				'Failed to update profile avatar',
				e
			);
		}
	};

export const storeLoggedInUser =
	(user) => (dispatch) => {
		dispatch(setLoggedInUser(user));
		localStorage.setItem(
			'user',
			JSON.stringify(user)
		);
	};
export const fetchProfiles =
	(accessToken) => async (dispatch) => {
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/profiles',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await response.json();
			dispatch(setProfiles(data));
		} catch (e) {
			console.error(
				'Failed to fetch profiles',
				e
			);
		}
	};

export const fetchSingleProfile =
	(name, accessToken) => async (dispatch) => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await response.json();
			dispatch(setSingleProfile(data));
		} catch (e) {
			console.error(
				`Failed to fetch profile ${name}`,
				e
			);
		}
	};
