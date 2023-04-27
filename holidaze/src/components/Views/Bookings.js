import React, {
	useState,
	useEffect,
} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';

const formatDate = (date) => {
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	};
	return new Intl.DateTimeFormat(
		'en-US',
		options
	).format(date);
};

const Bookings = () => {
	const { id } = useParams();
	const [bookings, setBookings] = useState(null);
	const [date, setDate] = useState(new Date());
	const accessToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsIm5hbWUiOiJNaWtleV9NaWtlIiwiZW1haWwiOiJNaWtlVGhlSG90ZWxAbm9yb2ZmLm5vIiwiYXZhdGFyIjoiIiwidmVudWVNYW5hZ2VyIjpmYWxzZSwiaWF0IjoxNjgxMzIwODEwfQ.AJYvzF115NK-Evthvw9L6K7A3yE6fVbnU63GMe5V8vg'; // Replace with the actual access token

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await axios.get(
					'https://nf-api.onrender.com/api/v1/holidaze/bookings',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setBookings(response.data);
			} catch (error) {
				console.error(
					'Error fetching bookings data:',
					error
				);
			}
		};

		fetchBookings();
	}, [id]);

	const handleDateChange = (newDate) => {
		setDate(newDate);
	};

	const bookingsForSelectedDate = bookings
		? bookings.filter((booking) => {
				return (
					formatDate(
						new Date(booking.dateFrom)
					) === formatDate(date)
				);
		  })
		: [];

	if (!bookings) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="container mx-auto py-12">
				<h1 className="text-2xl font-bold mb-4">
					Bookings
				</h1>
				{/* Render the calendar component */}
				<Calendar
					onChange={handleDateChange}
					value={date}
				/>
				{/* Render the booking data */}
				<div className="mt-8">
					{bookingsForSelectedDate.length > 0 ? (
						bookingsForSelectedDate.map(
							(booking) => (
								<div
									key={booking.id}
									className="mb-4"
								>
									<h3 className="text-lg font-semibold mb-2">
										Booking ID: {booking.id}
									</h3>
									<p>
										Date from:{' '}
										{formatDate(
											new Date(booking.dateFrom)
										)}
									</p>
									<p>
										Date to:{' '}
										{formatDate(
											new Date(booking.dateTo)
										)}
									</p>
									<p>Guests: {booking.guests}</p>
								</div>
							)
						)
					) : (
						<p className="text-center">
							No bookings for the selected date.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Bookings;
