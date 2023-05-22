import {
	combineReducers,
	configureStore,
} from '@reduxjs/toolkit';
import loaderSlice from './modules/loaderSlice';
import venueSlice from './modules/venueSlice';
import authSlice from './modules/authSlice';
import profileSlice from './modules/profileSlice';
import errorSlice from './modules/errorSlice';
const rootReducer = combineReducers({
	venues: venueSlice,
	loader: loaderSlice,
	auth: authSlice,
	profile: profileSlice,
	error: errorSlice,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
