import React, {
	useEffect,
	useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { fetchSingleProfile } from '../../store/modules/profileSlice';
import {
	deleteVenue,
	deleteBooking,
	fetchSingleBooking,
} from '../../store/modules/venueSlice';
import { useSelector } from 'react-redux';
import { updateLocalStorage } from '../utils/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	useParams,
	Link,
} from 'react-router-dom';

const ProfilePage = () => {
	const accessToken = localStorage.getItem(
		'accessToken'
	);
	let name = localStorage.getItem('userName');
	const { id } = useParams();
	const validationSchema = Yup.object().shape({
		avatar: Yup.string()
			.url('Invalid URL')
			.matches(
				/\.(gif|jpe?g|png)$/i,
				'Invalid image URL'
			),
	});
	const dispatch = useDispatch();
	const { singleProfile } = useSelector(
		(state) => state.profile
	);
	const bookings = singleProfile?.bookings;

	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser =
			localStorage.getItem('user');
		if (
			storedUser &&
			storedUser !== 'undefined'
		) {
			try {
				const userData = JSON.parse(storedUser);
				setUser(userData);
				console.log(userData);
			} catch (error) {
				console.error(
					'Error parsing storedUser:',
					error
				);
			}
		}
	}, []);

	useEffect(() => {
		if (name) {
			dispatch(fetchSingleProfile(name));
			if (id) {
				dispatch(fetchSingleBooking(id));
			}
		}
	}, [dispatch, name, id]);

	const formik = useFormik({
		initialValues: {
			avatar: '',
		},
		validationSchema,
		onSubmit: (values) => {
			const data = { avatar: values.avatar };
			fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}/media`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(data),
				}
			)
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then((data) => {
					console.log(data);
					updateLocalStorage(
						`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}`
					);
				})
				.catch((error) => {
					console.error(error);
				});
		},
	});

	const handleChangeAvatar = () => {
		formik.handleSubmit();
	};

	const venueManager = localStorage.getItem(
		'venueManager'
	);

	const [activeTab, setActiveTab] = useState(
		venueManager === 'true'
			? 'venues'
			: 'bookings'
	);

	const { isError } = useSelector(
		(state) => state.error
	);
	const { errorMessage } = useSelector(
		(state) => state.error
	);

	const handleDeleteVenue = (id) => {
		dispatch(deleteVenue(id));
	};

	const handleDeleteBooking = (id) => {
		dispatch(deleteBooking(id));
	};
	const formatDate = (dateString) => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		return new Date(
			dateString
		).toLocaleDateString(undefined, options);
	};
	return (
		<div className="rounded-lg shadow p-6">
			<div className="flex flex-col items-center mb-6">
				<h2 className="text-2xl font-semibold mb-4">
					Profile
				</h2>
				<div className="bg-white shadow rounded-lg p-6 w-full flex md:flex-row flex-col md:space-x-6 space-y-4 md:space-y-0">
					<div className="md:w-1/2">
						<div className="relative w-32 h-32 mx-auto">
							<img
								src={user?.avatar}
								alt="user avatar"
								className="w-full h-full rounded-full object-cover"
							/>
						</div>
						<div className="text-center mt-4">
							<p className="text-lg font-semibold mb-1">
								<span className="text-gray-500">
									Name:
								</span>{' '}
								{user?.name}
							</p>
							<p className="text-lg font-semibold mb-1">
								<span className="text-gray-500">
									Email:
								</span>{' '}
								{user?.email}
							</p>
							<p className="text-lg font-semibold">
								<span className="text-gray-500">
									Venue Manager:
								</span>{' '}
								{user?.venueManager
									? 'Yes'
									: 'No'}
							</p>
						</div>
					</div>
					<div className="md:w-1/2">
						<form className="flex flex-col space-y-2">
							<label
								htmlFor="avatar"
								className="font-semibold text-gray-600"
							>
								Avatar URL
							</label>
							<input
								id="avatar"
								name="avatar"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.avatar}
								className="border-2 border-gray-300 p-2 rounded"
								placeholder="Enter Avatar URL"
							/>
							{formik.errors.avatar && (
								<div className="text-red-500">
									{formik.errors.avatar}
								</div>
							)}
							<button
								onClick={handleChangeAvatar}
								type="button"
								className="mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 self-start"
							>
								Change Avatar
							</button>
						</form>
					</div>
				</div>
			</div>

			<div className="flex justify-around">
				<button
					onClick={() => setActiveTab('venues')}
					className={`py-2 px-4 rounded ${
						activeTab === 'venues'
							? 'bg-blue-500 text-white'
							: 'bg-white border-2 border-blue-500 text-blue-500'
					}`}
				>
					Venues
				</button>
				<button
					onClick={() => setActiveTab('bookings')}
					className={`py-2 px-4 rounded ${
						activeTab === 'bookings'
							? 'bg-blue-500 text-white'
							: 'bg-white border-2 border-blue-500 text-blue-500'
					}`}
				>
					Bookings
				</button>
			</div>

			{activeTab === 'venues' && (
				<div className="mt-4">
					{singleProfile?.venues?.map((venue) => (
						<div
							key={venue.id}
							className="bg-white my-4 shadow-lg rounded-lg overflow-hidden"
						>
							<div className="relative">
								<img
									src={venue.media[0]}
									alt={venue.name}
									className="w-full h-48 object-cover"
								/>
								<div className="absolute top-2 left-2 bg-white rounded-full p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</div>
							<div className="p-4">
								<h3 className="text-2xl font-semibold mb-2">
									{venue.name}
								</h3>
								<p className="text-gray-600 mb-2">
									<span className="font-semibold">
										Address:
									</span>{' '}
									{venue.location.address},{' '}
									{venue.location.city},{' '}
									{venue.location.zip},{' '}
									{venue.location.country},{' '}
									{venue.location.continent}
								</p>
								<p className="text-gray-600 mb-2">
									<span className="font-semibold">
										Price:
									</span>{' '}
									${venue.price}
								</p>
								<div className="flex flex-wrap mb-2">
									{venue.media.map(
										(mediaItem, index) => (
											<img
												key={index}
												src={mediaItem}
												alt={`Venue Media ${
													index + 1
												}`}
												className="w-16 h-16 object-cover rounded-md mr-2 mb-2"
											/>
										)
									)}
								</div>
								<button
									onClick={() =>
										handleDeleteVenue(venue.id)
									}
									className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
								>
									Delete Venue
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			{activeTab === 'bookings' && (
				<div className="mt-4">
					{bookings?.map((booking) => (
						<div
							key={booking.id}
							className="bg-white my-4 shadow-lg rounded-lg overflow-hidden"
						>
							<div className="relative">
								<img
									src={booking.venue.media[0]}
									alt={booking.venue.name}
									className="w-full h-48 object-cover"
								/>
								<div className="absolute top-2 left-2 bg-white rounded-full p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</div>
							<div className="p-4">
								<h3 className="text-2xl font-semibold mb-2">
									{booking.venue.name}
								</h3>
								<div className="bg-backgroundwhite p-2 flex flex-col md:flex-row my-2 rounded-md">
									<div className="flex items-center justify-center md:h-40 md:w-40">
										<img
											className="rounded-md object-cover h-60 w-full md:h-full md:w-auto"
											src={booking.venue.media[0]}
											alt={booking.venue.name}
										/>
									</div>
									<div className="md:w-96 lg:w-60 flex flex-col">
										<p className="font-header text-center md:text-left font-bold text-md px-2 mt-4">
											{booking.venue.name}
										</p>
										<div className="mx-auto shadow-md w-40 md:w-60 my-4 border-t border-main"></div>
										<p className="font-paragraph text-sm px-2 my-2">
											Booked from:{' '}
											{formatDate(
												booking.dateFrom
											)}
										</p>
										<p className="font-paragraph text-sm px-2 my-2">
											To:{' '}
											{formatDate(booking.dateTo)}
										</p>
										<p className="font-paragraph text-sm px-2 my-2">
											Guests: {booking.guests}
										</p>
									</div>
									<div className="flex justify-center md:items-end">
										<Link
											to={`/bookings/${booking.id}`}
										>
											<button
												type="submit"
												className="flex w-32 md:mx-auto font-header justify-center rounded-md bg-main hover:bg-hovercolor px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm my-4"
											>
												View
											</button>
										</Link>
										<button
											onClick={() =>
												handleDeleteBooking(
													booking.id
												)
											}
											className="flex w-32 md:mx-auto font-header justify-center rounded-md bg-red-500 hover:bg-red-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm my-4 ml-2"
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{isError && (
				<div className="mt-4 text-red-500">
					{errorMessage}
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
