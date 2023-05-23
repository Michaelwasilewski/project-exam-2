import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../components/Views/RegisterPage';
import VenuesCarousel from '../components/VenuesCarousel';
import CreateVenueForm from '../components/Views/CreateVenueForm';
import VenueDetail from '../components/Views/VenueDetail';
import Bookings from '../components/Views/CreateBooking';
import VenuePage from '../components/Views/AllVenues';
import ProfilePage from '../components/Views/profilePage';
import AccessDenied from '../components/Views/AccessDenied';
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
					path="/profile"
					element={<ProfilePage />}
				/>
			</Routes>
		</>
	);
};

export default Router;
