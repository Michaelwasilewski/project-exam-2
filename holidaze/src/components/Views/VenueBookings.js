import React, { useEffect } from 'react';
import {
	useSelector,
	useDispatch,
} from 'react-redux';
import { fetchBookings } from '../../store/modules/profileSlice';
import Breadcrumbs from '../Breadcrumbs';
const VenueBookings = () => {
	const dispatch = useDispatch();
	const name = localStorage.getItem('userName');
	const venues = useSelector(
		(state) => state.profile.venueBookings
	);

	const bookings =
		venues?.flatMap((venue) =>
			venue.bookings.map((booking) => ({
				...booking,
				media: venue.media,
			}))
		) || [];

	useEffect(() => {
		dispatch(fetchBookings(name));
	}, [dispatch, name]);

	return (
		<div className="container mx-auto py-4 px-4 bg-gray-100 min-h-screen">
			<Breadcrumbs />
			<h1 className="text-4xl font-bold mb-8 text-center text-gray-700">
				Venue Bookings
			</h1>
			<ul className="space-y-4">
				{bookings.map((booking, index) => (
					<li
						key={index}
						className="border-2 border-blue-200 p-4 rounded shadow-lg bg-white"
					>
						{booking.media &&
							booking.media.map(
								(imgUrl, index) => (
									<img
										key={index}
										src={imgUrl}
										alt="Venue"
										className="w-full h-64 object-cover rounded-md mb-4 shadow-md"
									/>
								)
							)}
						<div className="text-xl font-semibold text-blue-600 mb-2">
							<strong>ID:</strong> {booking.id}
						</div>
						<div className="text-lg text-gray-700">
							<strong>Date From:</strong>{' '}
							{new Date(
								booking.dateFrom
							).toLocaleDateString()}
						</div>
						<div className="text-lg text-gray-700">
							<strong>Date To:</strong>{' '}
							{new Date(
								booking.dateTo
							).toLocaleDateString()}
						</div>
						<div className="text-lg text-gray-700">
							<strong>Guests:</strong>{' '}
							{booking.guests}
						</div>
						<div className="text-lg text-gray-700">
							<strong>Created:</strong>{' '}
							{new Date(
								booking.created
							).toLocaleDateString()}
						</div>
						<div className="text-lg text-gray-700">
							<strong>Updated:</strong>{' '}
							{new Date(
								booking.updated
							).toLocaleDateString()}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default VenueBookings;
