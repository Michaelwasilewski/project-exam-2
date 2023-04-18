import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
	FaGlobe,
	FaBookmark,
	FaMapMarkedAlt,
	FaPlus,
	FaSignInAlt,
} from 'react-icons/fa';
import Logo from '../../img/holidazelogo.png';
import SearchBar from '../SearchBar';

function Header() {
	const [isMenuOpen, setIsMenuOpen] =
		useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="bg-white shadow-lg">
			<div className="mx-auto px-2 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex-shrink-0 flex items-center">
						<NavLink to="/">
							<img
								className="h-16 w-auto"
								src={Logo}
								alt="Holidaze logo"
							/>
						</NavLink>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 mt-3 flex items-baseline space-x-4">
							<NavLink
								to="/browse-destinations"
								className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
							>
								<FaGlobe className="mr-2" />
								Browse Destinations
							</NavLink>
							<NavLink
								to="/my-bookings"
								className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
							>
								<FaBookmark className="mr-2" />
								My Bookings
							</NavLink>
							<NavLink
								to="/my-venues"
								className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
							>
								<FaMapMarkedAlt className="mr-2" />
								My Venues
							</NavLink>
							<NavLink
								to="/register"
								className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
							>
								<FaSignInAlt className="mr-2" />
								Login
							</NavLink>
							<NavLink
								to="/create-venue"
								className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
							>
								<FaPlus className="mr-2" />
								Add Venue
							</NavLink>
						</div>
						<div className="mt-3">
							<SearchBar />
						</div>
					</div>
					<div className="-mr-2 flex items-center md:hidden">
						<button
							onClick={toggleMenu}
							type="button"
							className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							aria-expanded="false"
						>
							<span className="sr-only">
								Open main menu
							</span>
							<svg
								className={`${
									isMenuOpen ? 'hidden' : 'block'
								} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							<svg
								className={`${
									isMenuOpen ? 'block' : 'hidden'
								} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div
				className={`${
					isMenuOpen ? 'block' : 'hidden'
				} md:hidden`}
			>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					<NavLink
						to="/browse-destinations"
						className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
					>
						<FaGlobe className="inline-block mr-2 text-lg" />
						Browse Destinations
					</NavLink>
					<NavLink
						to="/my-bookings"
						className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
					>
						<FaBookmark className="inline-block mr-2 text-lg" />
						My Bookings
					</NavLink>
					<NavLink
						to="/my-venues"
						className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
					>
						<FaMapMarkedAlt className="inline-block mr-2 text-lg" />
						My Venues
					</NavLink>
					<NavLink
						to="/add-venue"
						className="text-white bg-red-600 hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium"
					>
						<FaPlus className="inline-block mr-2 text-lg" />
						Add Venue
					</NavLink>
				</div>
			</div>
		</nav>
	);
}

export default Header;
