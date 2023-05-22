import React, {
	useState,
	useEffect,
} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../BookingCalendar.css';
import {
	Formik,
	Field,
	Form,
	ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

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
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsIm5hbWUiOiJNaWtleV9NaWtlIiwiZW1haWwiOiJNaWtlVGhlSG90ZWxAbm9yb2ZmLm5vIiwiYXZhdGFyIjoiIiwidmVudWVNYW5hZ2VyIjpmYWxzZSwiaWF0IjoxNjgxMzIwODEwfQ.AJYvzF115NK-Evthvw9L6K7A3yE6fVbnU63GMe5V8vg';
	const [selectedDates, setSelectedDates] =
		useState([new Date(), new Date()]);
	const initialDates = [new Date(), new Date()];

	const validationSchema = Yup.object().shape({
		dateFrom: Yup.date().required('Required'),
		dateTo: Yup.date()
			.required('Required')
			.min(
				Yup.ref('dateFrom'),
				'End date cannot be before start date'
			),
		guests: Yup.number()
			.required('Required')
			.min(1, 'Must be at least 1 guest'),
		venueId: Yup.string().required('Required'),
	});

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

	const handleBookingSubmit = async (
		values,
		{ setSubmitting, resetForm }
	) => {
		try {
			const response = await axios.post(
				'https://nf-api.onrender.com/api/v1/holidaze/bookings',
				values,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 201) {
				setBookings([...bookings, response.data]);
				resetForm(); // Reset form
			}
		} catch (error) {
			console.error(
				'Error creating booking:',
				error
			);
		}
		setSubmitting(false);
	};

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
				<Formik
					initialValues={{
						dateFrom: formatDate(
							selectedDates[0]
						),
						dateTo: formatDate(selectedDates[1]),
						guests: 1,
						venueId: '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleBookingSubmit}
				>
					{({ isSubmitting, setFieldValue }) => (
						<>
							<Form className="space-y-4">
								<div>
									<Field
										type="text"
										name="venueId"
										placeholder="Enter venue id"
										className="w-full p-2 border rounded"
									/>
									<ErrorMessage
										name="venueId"
										component="div"
										className="text-red-500"
									/>
								</div>
								<div>
									<Field
										type="text"
										name="dateFrom"
										readOnly
										className="w-full p-2 border rounded"
									/>
									<ErrorMessage
										name="dateFrom"
										component="div"
										className="text-red-500"
									/>
								</div>
								<div>
									<Field
										type="text"
										name="dateTo"
										readOnly
										className="w-full p-2 border rounded"
									/>
									<ErrorMessage
										name="dateTo"
										component="div"
										className="text-red-500"
									/>
								</div>
								<div>
									<Field
										type="number"
										name="guests"
										placeholder="Number of guests"
										className="w-full p-2 border rounded"
									/>
									<ErrorMessage
										name="guests"
										component="div"
										className="text-red-500"
									/>
								</div>
								<div>
									<button
										type="submit"
										disabled={isSubmitting}
										className="px-4 py-2 bg-blue-500 text-white rounded"
									>
										Create Booking
									</button>
								</div>
							</Form>
							<div className="mt-12">
								<h2 className="text-xl font-bold mb-4">
									Calendar
								</h2>
								<Calendar
									onChange={(newDate) => {
										setDate(newDate[0]);
										setSelectedDates(newDate);
										setFieldValue(
											'dateFrom',
											formatDate(newDate[0])
										);
										setFieldValue(
											'dateTo',
											formatDate(newDate[1])
										);
									}}
									value={date}
									selectRange={true}
								/>
							</div>
						</>
					)}
				</Formik>
				<div className="mt-12">
					<h2 className="text-xl font-bold mb-4">
						All Bookings
					</h2>
					{bookings.length > 0 ? (
						bookings.map((booking) => (
							<div
								key={booking.id}
								className="p-4 border rounded mb-4"
							>
								<p>Booking ID: {booking.id}</p>
								<p>
									From:{' '}
									{formatDate(
										new Date(booking.dateFrom)
									)}
								</p>
								<p>
									To:{' '}
									{formatDate(
										new Date(booking.dateTo)
									)}
								</p>
								<p>Guests: {booking.guests}</p>
							</div>
						))
					) : (
						<p>No bookings</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Bookings;
