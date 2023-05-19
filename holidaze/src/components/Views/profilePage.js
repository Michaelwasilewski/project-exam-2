import React, {
	useEffect,
	useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
	storeLoggedInUser,
	fetchSingleProfile,
} from '../../store/modules/profileSlice';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { updateLoggedInUserAvatar } from '../../store/modules/profileSlice';

const ProfilePage = () => {
	const accessToken = localStorage.getItem(
		'accessToken'
	);
	const singleProfile = useSelector(
		(state) => state.profile.singleProfile
	);
	const venues = singleProfile?.venues || [];
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();
	useEffect(() => {
		const storedUser =
			localStorage.getItem('user');
		console.log('stored user: ', storedUser);
		if (
			storedUser &&
			storedUser !== 'undefined'
		) {
			try {
				const userData = JSON.parse(storedUser);
				setUser(userData);
				dispatch(storeLoggedInUser(userData));
				console.log(userData);
			} catch (error) {
				console.error(
					'Error parsing storedUser:',
					error
				);
			}
		}
	}, [dispatch]);
	useEffect(() => {
		if (user && user.name) {
			dispatch(
				fetchSingleProfile(user.name, accessToken)
			);
		}
	}, [user, accessToken, dispatch]);
	if (!user) {
		return <p>Loading profile...</p>;
	}
	const handleChangeAvatar = () => {
		const newAvatarUrl = prompt(
			'Please enter the new avatar URL:'
		);
		if (newAvatarUrl) {
			dispatch(
				updateLoggedInUserAvatar(
					user.name,
					newAvatarUrl,
					user.accessToken
				)
			);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
					{/* Sidebar */}
					<aside className="col-span-12 md:col-span-3 bg-white rounded-lg shadow-lg p-8">
						{/* User profile summary */}
						<div className="flex flex-col items-center mb-8">
							<img
								className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
								src={
									user.avatar ||
									'https://via.placeholder.com/150'
								}
								alt={user.name}
							/>
							<h2 className="text-xl font-semibold mt-2">
								{user.name}
							</h2>
							<button
								className="mt-2 text-sm text-gray-500 hover:text-gray-600"
								onClick={handleChangeAvatar}
							>
								Change Avatar
							</button>
						</div>

						{/* Navigation menu */}
						<nav className="space-y-4 mb-8">
							<a
								href="/dashboard"
								className="block text-gray-700 hover:text-gray-900"
							>
								Dashboard
							</a>
							<a
								href="/events"
								className="block text-gray-700 hover:text-gray-900"
							>
								Events
							</a>
							<a
								href="/bookings"
								className="block text-gray-700 hover:text-gray-900"
							>
								Bookings
							</a>
							<a
								href="/settings"
								className="block text-gray-700 hover:text-gray-900"
							>
								Settings
							</a>
						</nav>

						{/* Search bar */}
						<div className="relative">
							<input
								type="text"
								className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
								placeholder="Search..."
							/>
							<button className="absolute right-0 top-0 mt-2 mr-4 text-gray-600 hover:text-gray-800">
								<i className="fas fa-search"></i>
							</button>
						</div>
					</aside>

					{/* Main content */}
					<main className="col-span-12 md:col-span-9 space-y-8">
						{/* Profile card */}
						<div className="bg-white rounded-lg shadow-lg w-full p-8">
							<div className="flex flex-col items-center">
								<img
									className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
									src={
										user.avatar ||
										'https://via.placeholder.com/150'
									}
									alt={user.name}
								/>
								<button
									className=" text-sm text-gray-500 hover:text-gray-600"
									onClick={handleChangeAvatar}
								>
									Change Avatar
								</button>
								<h1 className="text-4xl font-extrabold mb-2 text-gray-800">
									{user.name}
								</h1>
								<p className="text-xl font-semibold mb-1 text-gray-700">
									Email: {user.email}
								</p>
								<p className="text-xl font-semibold text-gray-700">
									Venue Manager:{' '}
									{user.venueManager
										? 'Yes'
										: 'No'}
								</p>
							</div>
						</div>

						{/* Venue carousel */}
						<div className="bg-white rounded-lg shadow-lg w-full p-8">
							<h2 className="text-2xl font-bold mb-4">
								Venues
							</h2>
							{venues.length > 0 ? (
								<Carousel
									showArrows={true}
									showStatus={false}
									showThumbs={false}
									infiniteLoop={true}
									autoPlay={false}
									swipeable={true}
									emulateTouch={true}
								>
									{venues.map((venue) => (
										<div
											key={venue.id}
											className="relative rounded-lg overflow-hidden"
										>
											<img
												className="w-full h-48 object-cover"
												src={venue.media}
												alt={venue.name}
											/>
											<div className="absolute inset-0 bg-black bg-opacity-50 p-4">
												<h3 className="text-xl font-semibold mb-2 text-center text-white">
													{venue.name}
												</h3>
												<p className="text-gray-200 mb-2 text-center">
													{venue.description}
												</p>
											</div>
										</div>
									))}
								</Carousel>
							) : (
								<p>No venues found.</p>
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
