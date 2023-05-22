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
const CreateBooking = () => {
	const { id } = useParams();
	const [formSubmitted, setFormSubmitted] =
		useState(false);
	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		dateFrom: Yup.date().required('Required'),
		dateTo: Yup.date().required('Required'),
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
				dateFrom: values.dateFrom,
				dateTo: values.dateTo,
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
					formik.values.dateFrom,
					formik.values.dateTo,
					singleVenue.price
			  )
			: 0;
	const formattedTotalPrice = !isNaN(totalPrice)
		? totalPrice.toLocaleString('nb-NO', {
				style: 'currency',
				currency: 'NOK',
		  })
		: 'NOK 0';

	return (
		<div className="w-full max-w-sm mx-auto mt-4">
			<div className="mb-6">
				<h1 className="font-bold text-3xl mb-2">
					Book a Venue
				</h1>
				<p>
					Choose your dates and number of guests
					to proceed with your booking. We're
					excited to have you!
				</p>
			</div>
			{formSubmitted ? (
				<div
					className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<strong className="font-bold">
						Success!
					</strong>
					<span className="block sm:inline">
						{' '}
						Your booking was successfully created.
					</span>
					<div className="mt-4 flex justify-center">
						<Link
							to="/profile"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
						>
							Go to Profile
						</Link>
						<Link
							to="/venues"
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
						>
							Back to Venues
						</Link>
					</div>
				</div>
			) : (
				<form onSubmit={formik.handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="dateFrom"
						>
							From
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="dateFrom"
							type="date"
							onChange={formik.handleChange}
							value={formik.values.dateFrom}
						/>
						{formik.errors.dateFrom &&
						formik.touched.dateFrom ? (
							<p className="text-red-500 text-xs italic">
								{formik.errors.dateFrom}
							</p>
						) : null}
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="dateTo"
						>
							To
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="dateTo"
							type="date"
							onChange={formik.handleChange}
							value={formik.values.dateTo}
						/>
						{formik.errors.dateTo &&
						formik.touched.dateTo ? (
							<p className="text-red-500 text-xs italic">
								{formik.errors.dateTo}
							</p>
						) : null}
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="guests"
						>
							Guests
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="guests"
							type="number"
							onChange={formik.handleChange}
							value={formik.values.guests}
						/>
						{formik.errors.guests &&
						formik.touched.guests ? (
							<p className="text-red-500 text-xs italic">
								{formik.errors.guests}
							</p>
						) : null}
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Book
						</button>
					</div>
				</form>
			)}
			{totalPrice > 0 && (
				<div className="text-center mt-4">
					<h2>
						Total Price: {formattedTotalPrice}
					</h2>
				</div>
			)}
		</div>
	);
};

export default CreateBooking;
