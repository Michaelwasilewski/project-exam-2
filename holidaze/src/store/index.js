import {
	combineReducers,
	configureStore,
} from '@reduxjs/toolkit';
import loaderSlice from './modules/loaderSlice';
import venueSlice from './modules/venueSlice';
import authSlice from './modules/authSlice';
import profileSlice from './modules/profileSlice';
import bookingSlice from './modules/bookingSlice';

const rootReducer = combineReducers({
	venues: venueSlice,
	loader: loaderSlice,
	auth: authSlice,
	profile: profileSlice,
	bookings: bookingSlice,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
