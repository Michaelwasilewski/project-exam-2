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
							className="h-8 md:h-10"
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
						className="block mt-4 md:inline-block md:mt-0 mx-4 text-gray-600 hover:text-gray-900"
					>
						Destinations
					</Link>
					<Link
						to="/my-bookings"
						className="block mt-4 md:inline-block md:mt-0 mx-4 text-gray-600 hover:text-gray-900"
					>
						Bookings
					</Link>
					<Link
						to="/my-venues"
						className="block mt-4 md:inline-block md:mt-0 mx-4 text-gray-600 hover:text-gray-900"
					>
						Venues
					</Link>
					<Link
						to="/register"
						className="block mt-4 md:inline-block md:mt-0 mx-4 text-gray-600 hover:text-gray-900"
					>
						Login
					</Link>
					<Link
						to="/create-venue"
						className="block mt-4 md:inline-block md:mt-0 mx-4 font-bold hover:bg-black transition-colors text-black hover:text-white  rounded-md px-3 py-2 bg-gray-300"
					>
						Add Venue
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Header;
