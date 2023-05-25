import React from 'react';
import { Link } from 'react-router-dom';
import {
	HomeIcon,
	UsersIcon,
	CurrencyDollarIcon,
	GlobeAltIcon,
} from '@heroicons/react/outline';

const AccessDenied = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
			<div className="py-16 px-10 text-center bg-white shadow rounded-lg">
				<h1 className="mb-4 text-3xl font-extrabold text-gray-900">
					Access Denied
				</h1>
				<p className="mb-4 text-lg text-gray-600">
					TIP: You must be registered as a venue
					manager to create a venue. Registering
					as a venue manager will allow you to
					access a host of benefits.
				</p>
				<h2 className="mb-4 text-2xl font-semibold text-gray-800">
					Why become a Venue Manager?
				</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
					<div className="flex flex-col items-center">
						<HomeIcon
							className="h-10 w-10 text-blue-500"
							aria-hidden="true"
						/>
						<p className="mt-2 text-gray-500">
							Rent out your house, apartment, or
							any venue.
						</p>
					</div>
					<div className="flex flex-col items-center">
						<UsersIcon
							className="h-10 w-10 text-blue-500"
							aria-hidden="true"
						/>
						<p className="mt-2 text-gray-500">
							Meet people from all over the world.
						</p>
					</div>
					<div className="flex flex-col items-center">
						<CurrencyDollarIcon
							className="h-10 w-10 text-blue-500"
							aria-hidden="true"
						/>
						<p className="mt-2 text-gray-500">
							Earn an additional income stream.
						</p>
					</div>
					<div className="flex flex-col items-center">
						<GlobeAltIcon
							className="h-10 w-10 text-blue-500"
							aria-hidden="true"
						/>
						<p className="mt-2 text-gray-500">
							Join a growing global community.
						</p>
					</div>
				</div>

				<Link
					to="/register"
					className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
				>
					Register as Venue Manager
				</Link>
				<p className="mt-4 text-gray-600">
					Want to learn more about becoming a
					venue manager?{' '}
					<Link
						to="/learnmore"
						className="text-blue-500 underline"
					>
						Learn More
					</Link>
				</p>
			</div>
		</div>
	);
};

export default AccessDenied;
