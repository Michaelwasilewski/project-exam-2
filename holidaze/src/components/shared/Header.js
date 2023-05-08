import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../img/holidazelogo.png';

function Header({ isLoggedIn, onLogout }) {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<nav className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow">
			<div className="container mx-auto px-4 py-2 md:flex md:justify-between md:items-center">
				<div className="flex justify-between items-center">
					<Link to="/">
						<img
							className="w-auto h-auto max-w-full max-h-12 md:max-w-none md:max-h-12"
							src={Logo}
							alt="Holidaze logo"
						/>
					</Link>
					<button
						onClick={toggleMenu}
						className="md:hidden focus:outline-none"
					>
						{showMenu ? (
							<FaTimes className="w-6 h-6 text-gray-600" />
						) : (
							<FaBars className="w-6 h-6 text-gray-600" />
						)}
					</button>
				</div>
				<div
					className={`${
						showMenu ? 'block' : 'hidden'
					} md:flex md:items-center`}
				>
					<Link
						to="/venues"
						className="block mt-4 md:inline-block md:mt-0 mx-4 font-medium text-white hover:text-gray-800 hover:bg-white transition-colors duration-300 px-4 py-2 rounded-md"
					>
						Venues
					</Link>
					<Link
						to="/my-bookings"
						className="block mt-4 md:inline-block md:mt-0 mx-4 font-medium text-white hover:text-gray-800 hover:bg-white transition-colors duration-300 px-4 py-2 rounded-md"
					>
						Bookings
					</Link>

					{isLoggedIn ? (
						<>
							<Link
								to={`/profile`}
								className="block mt-4 md:inline-block md:mt-0 mx-4 font-medium text-white hover:text-gray-800 hover:bg-white transition-colors duration-300 px-4 py-2 rounded-md"
							>
								Profile
							</Link>
							<Link
								to="/create-venue"
								className="block mt-4 md:inline-block md:mt-0 mx-4 px-4 py-2 text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300 shadow-md"
							>
								Add Venue
							</Link>
							<Link
								to="/"
								onClick={onLogout}
								className="block mt-4 md:inline-block md:mt-0 mx-4 px-4 py-2 text-white font-bold bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-300 shadow-md"
							>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link
								to="/login"
								className="block mt-4 md:inline-block md:mt-0 mx-4 px-4 py-2 text-white font-bold bg-green-700 hover:bg-green-800 rounded-md transition-colors duration-300 shadow-md"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="block mt-4 md:inline-block md:mt-0 mx-4 px-4 py-2 text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300 shadow-md"
							>
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Header;
