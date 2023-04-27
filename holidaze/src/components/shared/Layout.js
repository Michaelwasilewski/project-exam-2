import Header from './Header';
import Footer from './Footer';

import React from 'react';

const Layout = ({ children }) => {
	return (
		<div className="bg-gray-800">
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
