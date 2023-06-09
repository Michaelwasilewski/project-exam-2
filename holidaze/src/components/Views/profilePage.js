import React, {
	useEffect,
	useState,
} from 'react';
import {
	useDispatch,
	useSelector,
} from 'react-redux';
import { fetchSingleProfile } from '../../store/modules/profileSlice';
import {
	deleteVenue,
	deleteBooking,
	fetchSingleBooking,
} from '../../store/modules/venueSlice';
import { updateLocalStorage } from '../utils/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	useParams,
	Link,
} from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';
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
	const userDetails = useSelector(
		(state) => state.profile.singleProfile
	);
	const [userAvatar, setUserAvatar] =
		useState(null);

	useEffect(() => {
		if (userDetails) {
			setUserAvatar(userDetails.avatar);
		}
	}, [userDetails]);

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
		<div className="rounded-lg shadow p-6 ">
			<Breadcrumbs />
			<div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-14 px-10 md:px-20 mb-10 rounded-lg shadow-lg">
				<h1 className="text-4xl md:text-5xl font-extrabold mb-5">
					Your Profile
				</h1>
				<div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
					<div>
						<div className="flex justify-center md:justify-start">
							<div className="relative w-24 h-24 md:w-32 md:h-32">
								<img
									src={userAvatar}
									alt="user avatar"
									className="w-full h-full rounded-full object-cover border-2 border-indigo-600"
								/>
							</div>
						</div>
						<div className="text-center md:text-left mt-4">
							<p className="text-xl md:text-2xl font-bold mb-1 text-gray-600">
								{userDetails?.name}
							</p>
							<p className="text-md md:text-lg text-gray-600 mb-1">
								{userDetails?.email}
							</p>
							<p className="text-md md:text-lg text-gray-600">
								Venue Manager:{' '}
								{userDetails?.venueManager
									? 'Yes'
									: 'No'}
							</p>
						</div>
					</div>
					<div>
						<form className="flex flex-col space-y-4">
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
								className="mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
							>
								Change Avatar
							</button>
							<Link to="/venue-bookings">
								<button className="mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
									View Bookings on My Venues
								</button>
							</Link>
						</form>
					</div>
				</div>
				<p className="text-lg md:text-xl font-light mt-6">
					Manage your venues and bookings with
					ease. Feel free to view, add, or delete
					any venues or bookings as per your
					requirement. You are in control!
				</p>
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
								<div className="bg-backgroundwhite p-2 flex flex-col md:flex-row my-2 rounded-md">
									<div className="flex items-center justify-center md:h-40 md:w-40">
										<img
											className="rounded-md object-cover h-60 w-full md:h-full md:w-auto"
											src={venue.media[0]}
											alt={venue.name}
										/>
									</div>
									<div className="md:w-96 lg:w-60 flex flex-col">
										<p className="font-header text-center md:text-left font-bold text-md px-2 mt-4">
											{venue.name}
										</p>
										<div className="mx-auto shadow-md w-40 md:w-60 my-4 border-t border-main"></div>
										<p className="font-paragraph text-sm px-2 my-2">
											Address:{' '}
											{venue.location.address},{' '}
											{venue.location.city},{' '}
											{venue.location.zip},{' '}
										</p>
										<p className="font-paragraph text-sm px-2 my-2">
											Price: ${venue.price}
										</p>
									</div>
									<div className="flex justify-center md:items-end space-x-4 mt-4">
										<Link
											to={`/venues/${venue.id}/edit`}
										>
											<button
												type="button"
												className="flex w-32 md:mx-auto font-header justify-center rounded-md bg-green-500 hover:bg-green-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
											>
												Update
											</button>
										</Link>
										<button
											onClick={() =>
												handleDeleteVenue(
													venue.id
												)
											}
											className="flex w-32 md:mx-auto font-header justify-center rounded-md bg-red-500 hover:bg-red-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
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
