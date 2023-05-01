import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="bg-gray-800 shadow-lg">
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-wrap -mx-2">
					<div className="w-full md:w-1/3 lg:w-1/4 mb-8">
						<h2 className="text-white text-lg font-semibold mb-4">
							Links
						</h2>
						<ul className="list-none">
							<li className="mb-2">
								<Link
									to="/browse-destinations"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									Browse Destinations
								</Link>
							</li>
							<li className="mb-2">
								<Link
									to="/my-bookings"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									My Bookings
								</Link>
							</li>
							<li className="mb-2">
								<Link
									to="/my-venues"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									My Venues
								</Link>
							</li>
							<li className="mb-2">
								<Link
									to="/add-venue"
									className="text-white bg-red-600 hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium"
								>
									Add Venue
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/3 lg:w-1/4 mb-8">
						<h2 className="text-white text-lg font-semibold mb-4">
							Contact Us
						</h2>
						<ul className="list-none">
							<li className="mb-2">
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									Email
								</a>
							</li>
							<li className="mb-2">
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									Phone
								</a>
							</li>
							<li className="mb-2">
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									Address
								</a>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/3 lg:w-1/4 mb-8">
						<h2 className="text-white text-lg font-semibold mb-4">
							About Us
						</h2>
						<ul className="list-none">
							<li className="mb-2">
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									Company
								</a>
							</li>
							<li className="mb-2">
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									Team
								</a>
							</li>
							<li className="mb-2">
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									Careers
								</a>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/3 lg:w-1/4 mb-8">
						<h2 className="text-white text-lg font-semibold mb-4">
							Follow Us
						</h2>
						<ul className="list-none">
							<li className="mb-2">
								{' '}
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									<i className="fab fa-facebook-square mr-2"></i>
									Facebook
								</a>
							</li>
							<li className="mb-2">
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									<i className="fab fa-twitter-square mr-2"></i>
									Twitter
								</a>
							</li>
							<li className="mb-2">
								<a
									href="#"
									className="text-gray-400 hover:text-gray-200 block font-medium"
								>
									<i className="fab fa-instagram-square mr-2"></i>
									Instagram
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t border-gray-200 pt-8">
					<p className="text-base text-gray-500">
						&copy; 2023 Your Company. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
