import {
	Link,
	useParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { fetchSingleVenue } from '../../store/modules/venueSlice';
import { bookVenue } from '../../store/modules/venueSlice';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setLoadingState } from '../../store/modules/loaderSlice';
import { format } from 'date-fns';
import Calendar from '../Calendar';
import Logo from '../../img/holidazelogo.png';

const CreateBooking = () => {
	const { id } = useParams();
	const [formSubmitted, setFormSubmitted] =
		useState(false);
	const dispatch = useDispatch();
	const [
		selectedStartDate,
		setSelectedStartDate,
	] = useState(null);
	const [selectedEndDate, setSelectedEndDate] =
		useState(null);
	const validationSchema = Yup.object().shape({
		dateFrom: Yup.date().required(
			'Date from is required'
		),
		dateTo: Yup.date().required(
			'Date to is required'
		),
		guests: Yup.number()
			.min(1, 'Must be at least 1 guest')
			.required('Required'),
	});

	const formik = useFormik({
		initialValues: {
			dateFrom: '',
			dateTo: '',
			guests: '',
			venueId: id,
		},
		validationSchema,
		onSubmit: async (values) => {
			const bookingData = {
				dateFrom:
					selectedStartDate || values.dateFrom,
				dateTo: selectedEndDate || values.dateTo,
				guests: values.guests,
				venueId: values.venueId,
			};
			dispatch(setLoadingState(true));
			await dispatch(bookVenue(bookingData));
			dispatch(setLoadingState(false));
			setFormSubmitted(true);
			window.scrollTo(0, 0);
		},
	});

	useEffect(() => {
		dispatch(fetchSingleVenue(id));
	}, [dispatch, id]);

	const calculatePrice = (
		dateFrom,
		dateTo,
		pricePerNight
	) => {
		if (!dateFrom || !dateTo || !pricePerNight) {
			return 0;
		}
		const start = new Date(dateFrom);
		const end = new Date(dateTo);
		if (isNaN(start) || isNaN(end)) {
			return 0;
		}
		const timeDiff = Math.abs(end - start);
		const numberOfNights = Math.ceil(
			timeDiff / (1000 * 60 * 60 * 24)
		);
		const totalPrice =
			numberOfNights * pricePerNight;
		return totalPrice;
	};

	const singleVenue = useSelector(
		(state) => state.venues.singleVenue
	);

	const totalPrice =
		singleVenue && singleVenue.price
			? calculatePrice(
					selectedStartDate ||
						formik.values.dateFrom,
					selectedEndDate || formik.values.dateTo,
					singleVenue.price
			  )
			: 0;
	const formattedTotalPrice = !isNaN(totalPrice)
		? totalPrice.toLocaleString('nb-NO', {
				style: 'currency',
				currency: 'NOK',
		  })
		: 'NOK 0';

	const setStartDate = (date) => {
		setSelectedStartDate(date);
		formik.setFieldValue('dateFrom', date);
	};

	const setEndDate = (date) => {
		setSelectedEndDate(date);
		formik.setFieldValue('dateTo', date);
	};

	const handleDayClick = (date) => {
		if (
			!selectedStartDate ||
			(selectedStartDate && selectedEndDate)
		) {
			setSelectedStartDate(date);
			setSelectedEndDate(null);
			formik.setFieldValue('dateFrom', date);
			formik.setFieldValue('dateTo', '');
		} else {
			if (date < selectedStartDate) {
				setSelectedStartDate(date);
				formik.setFieldValue('dateFrom', date);
			} else {
				setSelectedEndDate(date);
				formik.setFieldValue('dateTo', date);
			}
		}
	};
	const maxGuests =
		singleVenue && singleVenue.maxGuests
			? singleVenue.maxGuests
			: 0;

	return (
		<div className="flex items-center justify-center min-h-screen px-4 sm:px-0">
			{formSubmitted ? (
				<div className="text-center p-5">
					<h1 className="text-2xl font-semibold text-white mb-4">
						Booking successfully completed!
					</h1>
					<Link
						to="/"
						className="bg-white hover:bg-gray-200 text-blue-500 font-bold py-2 px-4 rounded inline-block mt-4"
					>
						Back to home
					</Link>
				</div>
			) : (
				<div className="max-w-2xl mx-auto">
					<p className="text-lg text-gray-700 mb-6">
						Please select the desired dates and
						number of guests for your booking:
					</p>
					<form
						onSubmit={formik.handleSubmit}
						className="max-w-2xl mx-auto p-8 rounded shadow-md bg-white flex flex-col sm:flex-row items-start"
					>
						<div className="space-y-6 w-full sm:pr-8 sm:flex-grow">
							<div className="text-center mb-6">
								<h1 className="text-2xl font-semibold mb-2">
									Holidaze
								</h1>
								<img
									className="w-auto h-auto max-w-full max-h-12 md:max-w-none md:max-h-12 mx-auto"
									src={Logo}
									alt="Holidaze logo"
								/>
							</div>
							<div className="flex justify-center items-center">
								<Calendar
									formik={formik}
									setStartDate={setStartDate}
									setEndDate={setEndDate}
									bookings={
										singleVenue.bookings || []
									}
								/>
							</div>
							<div className="space-y-4">
								<div>
									<label
										htmlFor="dateFrom"
										className="block text-sm font-medium text-gray-700"
									>
										Date From
									</label>
									<input
										id="dateFrom"
										type="date"
										className="mt-1 block w-full border-gray-300 rounded-md"
										value={
											formik.values.dateFrom ||
											selectedStartDate
												? format(
														formik.values
															.dateFrom ||
															selectedStartDate,
														'yyyy-MM-dd'
												  )
												: ''
										}
										readOnly
									/>
								</div>

								<div>
									<label
										htmlFor="dateTo"
										className="block text-sm font-medium text-gray-700"
									>
										Date To
									</label>
									<input
										id="dateTo"
										type="date"
										className="mt-1 block w-full border-gray-300 rounded-md"
										value={
											formik.values.dateTo ||
											selectedEndDate
												? format(
														formik.values
															.dateTo ||
															selectedEndDate,
														'yyyy-MM-dd'
												  )
												: ''
										}
										readOnly
									/>
								</div>

								<div>
									<label
										htmlFor="guests"
										className="block text-sm font-medium text-gray-700"
									>
										Number of Guests
									</label>
									<input
										id="guests"
										name="guests"
										type="number"
										onChange={formik.handleChange}
										value={formik.values.guests}
										className="mt-1 block w-full border-gray-300 rounded-md"
									/>
									{formik.errors.guests &&
									formik.touched.guests ? (
										<div className="text-red-500 text-xs mt-1">
											{formik.errors.guests}
										</div>
									) : null}
								</div>
								<div>
									<p className="text-sm font-medium text-gray-700">
										Maximum Guests: {maxGuests}
									</p>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm font-medium text-gray-700">
										Total Price
									</label>
									<span className="text-sm font-medium text-blue-600">
										{formattedTotalPrice}
									</span>
								</div>
							</div>
							<div className="text-sm text-red-700 mt-2">
								Note: Red color on the calendar
								indicates that the selected date
								is not available.
							</div>
							<button
								type="submit"
								className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition duration-200"
							>
								Book Venue
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default CreateBooking;
