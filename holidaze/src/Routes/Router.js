import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Venues from '../components/Views/Venues';
import LoginPage from '../components/Views/Venues';
import VenuesCarousel from '../components/VenuesCarousel';
import RegisterPage from '../components/Views/RegisterPage';
import CreateVenueForm from '../components/Views/CreateVenueForm';

const Router = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<VenuesCarousel />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
				<Route
					path="/create-venue"
					element={<CreateVenueForm />}
				/>
			</Routes>
		</>
	);
};

export default Router;
