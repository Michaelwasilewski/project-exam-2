import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../img/holidazelogo.png';
import SearchBar from '../SearchBar';

function Header() {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<nav className="bg-white shadow">
			<div className="container mx-auto px-4 py-2 md:flex md:justify-between md:items-center">
				<div className="flex justify-between items-center">
					<Link to="/">
						<img
							className="h-16 md:h-10"
							src={Logo}
							alt="Holidaze logo"
						/>
					</Link>
					<button
						onClick={toggleMenu}
						className="md:hidden focus:outline-none"
					>
						{showMenu ? (
							<FaTimes className="w-6 h-6 text-gray-500" />
						) : (
							<FaBars className="w-6 h-6 text-gray-500" />
						)}
					</button>
				</div>
				<div
					className={`${
						showMenu ? 'block' : 'hidden'
					} md:flex md:items-center`}
				>
					<Link
						to="/browse-destinations"
						className="block mt-4 md:inline-block md:mt-0 mx-4 font-medium text-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 px-4 py-2 rounded-md"
					>
						Destinations
					</Link>
					<Link
						to="/my-bookings"
						className="block mt-4 md:inline-block md:mt-0 mx-4 font-medium text-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 px-4 py-2 rounded-md"
					>
						Bookings
					</Link>
					<Link
						to="/venues"
						className="block mt-4 md:inline-block md:mt-0 mx-4 font-medium text-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 px-4 py-2 rounded-md"
					>
						Venues
					</Link>
					<Link
						to="/register"
						className="block mt-4 md:inline-block md:mt-0 mx-4 px-4 py-2 text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300 shadow-md"
					>
						Register
					</Link>
					<Link
						to="/create-venue"
						className="block mt-4 md:inline-block md:mt-0 mx-4 px-4 py-2 text-gray-800 font-bold bg-orange-400 hover:bg-orange-500 rounded-md transition-colors duration-300 shadow-md"
					>
						Add Venue
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Header;
