import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Venues from '../components/Views/Venues';
import LoginPage from '../components/Views/Venues';
import RegisterPage from '../components/Views/RegisterPage';

const Router = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Venues />} />
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
			</Routes>
		</>
	);
};

export default Router;
