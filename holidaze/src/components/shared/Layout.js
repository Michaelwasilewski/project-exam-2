import Header from './Header';
import Footer from './Footer';
import React, {
	useState,
	useEffect,
} from 'react';

const Layout = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] =
		useState(false);
	useEffect(() => {
		const accessToken = localStorage.getItem(
			'accessToken'
		);
		if (accessToken) {
			setIsLoggedIn(true);
		}
	}, []);

	const onLogout = () => {
		// Clear access token from local storage and update the 'isLoggedIn' state
		localStorage.removeItem('accessToken');
		setIsLoggedIn(false);
	};
	return (
		<div className="bg-gradient-to-b from-gray-100 to-purple-200 min-h-screen">
			<Header
				isLoggedIn={isLoggedIn}
				onLogout={onLogout}
			/>
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
