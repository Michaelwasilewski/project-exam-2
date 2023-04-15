import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import loaderSlice from './modules/loaderSlice';
import venueSlice from './modules/venueSlice';
const reducer = combineReducers({
	venue: venueSlice,
	loader: loaderSlice,
});

const index = configureStore({
	reducer,
});

export default index;
