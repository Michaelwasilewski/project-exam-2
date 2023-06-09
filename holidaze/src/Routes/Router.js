import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../components/Views/RegisterPage';
import VenuesCarousel from '../components/Views/VenuesCarousel';
import CreateVenueForm from '../components/Views/CreateVenueForm';
import VenueDetail from '../components/Views/VenueDetail';
import Bookings from '../components/Views/CreateBooking';
import VenuePage from '../components/Views/AllVenues';
import ProfilePage from '../components/Views/profilePage';
import AccessDenied from '../components/Views/AccessDenied';
import UpdateVenue from '../components/Views/UpdateVenue';
import VenueBookings from '../components/Views/VenueBookings';
const Router = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<VenuesCarousel />}
				/>
				<Route
					path="/register"
					element={<AuthForm mode="register" />}
				/>
				<Route
					path="/login"
					element={<AuthForm mode="login" />}
				/>
				<Route
					path="/create-venue"
					element={<CreateVenueForm />}
				/>
				<Route
					path="/access-denied"
					element={<AccessDenied />}
				/>
				<Route
					path="/venue-detail/:id"
					element={<VenueDetail />}
				/>
				<Route
					path="/bookings/:id"
					element={<Bookings />}
				/>
				<Route
					path="/venues"
					element={<VenuePage />}
				/>
				<Route
					path="/venue-bookings"
					element={<VenueBookings />}
				/>
				<Route
					path="/profile"
					element={<ProfilePage />}
				/>
				<Route
					path="/venues/:id/edit"
					element={<UpdateVenue />}
				/>

				<Route
					path="*"
					element={<AccessDenied />}
				/>
			</Routes>
		</>
	);
};

export default Router;
