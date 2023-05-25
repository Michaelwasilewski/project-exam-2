import { useState, useEffect } from 'react';
import {
	useDispatch,
	useSelector,
} from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	fetchSingleVenue,
	updateVenue,
} from '../../store/modules/venueSlice';
import { setLoadingState } from '../../store/modules/loaderSlice';
import { useParams } from 'react-router-dom';
import Logo from '../../img/holidazelogo.png';

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(6, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.required('Required'),
	description: Yup.string()
		.min(6, 'Must be 6 chars or more')
		.max(
			1000,
			'Can not be longer than 1000 chars'
		)
		.required('Required'),
	media: Yup.string()
		.url('Invalid URL')
		.matches(
			/\.(gif|jpe?g|png)(\?.*)*$/i,
			'Invalid image URL'
		),
	price: Yup.number().required('Required'),
	maxGuests: Yup.number().required('Required'),
	address: Yup.string()
		.min(2, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.optional('Optional'),
	continent: Yup.string()
		.min(2, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.optional('Optional'),
	country: Yup.string()
		.min(2, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.optional('Optional'),
	city: Yup.string()
		.min(2, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.optional('Optional'),
	zip: Yup.string().optional('Optional'),
});

const EditVenueForm = () => {
	const dispatch = useDispatch();
	let { id } = useParams();
	const venue = useSelector(
		(state) => state.venues.singleVenue
	);

	useEffect(() => {
		if (!venue) {
			dispatch(fetchSingleVenue(id));
		}
	}, [dispatch, id, venue]);
	const [mediaArray, setMediaArray] = useState(
		venue ? venue.media : []
	);
	useEffect(() => {
		if (venue && venue.media) {
			setMediaArray(venue.media);
		}
	}, [venue]);

	const handleSubmit = async (values) => {
		dispatch(updateVenue(values));
	};
	const formik = useFormik({
		initialValues: {
			name: venue?.name || '',
			description: venue?.description || '',
			price: venue?.price || 0,
			maxGuests: venue?.maxGuests || 1,
			rating: 5,
			meta: {
				wifi: venue?.meta?.wifi || false,
				parking: venue?.meta?.parking || false,
				breakfast:
					venue?.meta?.breakfast || false,
				pets: venue?.meta?.pets || false,
			},
			location: {
				address: venue?.location?.address || '',
				city: venue?.location?.city || '',
				country: venue?.location?.country || '',
				continent:
					venue?.location?.continent || '',
				lat: 0,
				lng: 0,
			},
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: (values) => {
			const venueData = {
				name: values.name,
				description: values.description,
				media: mediaArray,
				price: values.price,
				maxGuests: values.maxGuests,
				rating: 5,
				meta: {
					wifi: values.meta.wifi,
					parking: values.meta.parking,
					breakfast: values.meta.breakfast,
					pets: values.meta.pets,
				},
				location: {
					address: values.location.address,
					city: values.location.city,
					zip: values.location.zip,
					country: values.location.country,
					continent: values.location.continent,
					lat: 0,
					lng: 0,
				},
			};
			console.log(venueData);
			console.log('form is submitted');
			dispatch(setLoadingState(true));

			dispatch(updateVenue(id, venueData))
				.then(() => {
					window.scrollTo(0, 0);
					dispatch(setLoadingState(false));
				})
				.catch((error) => {
					console.log(error);
					dispatch(setLoadingState(false));
				});
		},
	});
	useEffect(() => {
		if (venue) {
			setMediaArray(venue.media);
		}
	}, [venue]);

	useEffect(() => {
		if (id) {
			dispatch(fetchSingleVenue(id)).catch(
				(error) => {
					console.log(error);
				}
			);
		}
	}, [dispatch, id]);

	function pushToMediaArray() {
		const mediaValue = formik.values.mediaUrl;
		const urlRegex =
			/(ftp|http|https):\/\/[^ "]+$/;
		if (urlRegex.test(mediaValue)) {
			const newMediaArray = [
				...mediaArray,
				mediaValue,
			];
			setMediaArray(newMediaArray);
			formik.setFieldValue('mediaUrl', '');
		} else {
			return null;
		}
	}

	function deleteMedia(media) {
		const newMediaArray = mediaArray.filter(
			(item) => item !== media
		);
		setMediaArray(newMediaArray);
	}
	return (
		<div className="hero-section bg-gradient-to-r from-blue-500 to-indigo-600 text-white min-h-full">
			<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full max-w-2xl space-y-8 bg-white rounded-lg shadow-lg p-8">
					<div className="text-center">
						<img
							className="mx-auto h-24 w-auto"
							src={Logo}
							alt="Holidaze Logo"
						/>
						<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
							Update a listing
						</h2>
						<p className="mt-2 text-gray-600">
							Fill in the details below to update
							your venue listing.
						</p>
					</div>
					<form
						onSubmit={formik.handleSubmit}
						className="w-full md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-8 text-[#125C85]"
					>
						<div className="flex flex-col">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								name="name"
								id="name"
								autoComplete="name"
								placeholder="Enter the title"
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.name}
							/>
							{formik.touched.name &&
							formik.errors.name ? (
								<div className="text-red-600">
									{formik.errors.name}
								</div>
							) : null}
						</div>

						<div className="flex flex-col">
							<label htmlFor="description">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								placeholder="Enter the description"
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.description}
							/>
							{formik.touched.description &&
							formik.errors.description ? (
								<div className="text-red-600">
									{formik.errors.description}
								</div>
							) : null}
						</div>

						{/* Gallery field */}
						<div className="flex flex-col items-start">
							<label htmlFor="gallery">
								Images for the venue
							</label>
							{mediaArray && (
								<div className="flex gap-1 flex-wrap mt-4">
									{mediaArray.map((media) => (
										<div
											key={media}
											className="w-24 h-24 bg-gray-200 rounded relative"
										>
											<img
												src={media}
												alt="gallery"
												className="w-full h-full object-cover rounded"
											/>
											<button
												type="button"
												onClick={() =>
													deleteMedia(media)
												}
												className="flex justify-center items-center absolute top-[-4px] right-[-4px] h-4 w-4 bg-gray-200 rounded-full text-sm"
											>
												x
											</button>
										</div>
									))}
								</div>
							)}
							<div className="w-full flex gap-4 mt-4">
								<input
									type="text"
									name="mediaUrl"
									id="media"
									placeholder="Enter the gallery URL"
									className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mediaUrl}
								/>
							</div>
							{formik.touched.media &&
							formik.errors.media ? (
								<div className="text-red-600">
									{formik.errors.media}
								</div>
							) : null}
							<button
								type="button"
								onClick={pushToMediaArray}
								className="px-4 py-2 rounded my-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Add
							</button>
						</div>

						{/* Price per night and max guests fields */}
						<div className="flex justify-between">
							<div className="flex flex-col w-2/5">
								<label htmlFor="pricePerNight">
									Price per night
								</label>
								<input
									type="number"
									name="price"
									id="pricePerNight"
									placeholder="Enter the price per night"
									className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.price}
								/>
								{formik.touched.price &&
								formik.errors.price ? (
									<div className="text-red-600">
										{formik.errors.price}
									</div>
								) : null}
							</div>
							<div className="flex flex-col w-2/5">
								<label htmlFor="maxGuests">
									Max guests
								</label>
								<input
									type="number"
									name="maxGuests"
									id="maxGuests"
									placeholder="Enter the maximum number of guests"
									className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.maxGuests}
								/>
								{formik.touched.maxGuests &&
								formik.errors.maxGuests ? (
									<div className="text-red-600">
										{formik.errors.maxGuests}
									</div>
								) : null}
							</div>
						</div>

						{/* Amenities checkboxes */}
						<div>
							<label htmlFor="facilities">
								Facilities
							</label>
							<div className="grid grid-cols-2 gap-16">
								<div className="flex items-center">
									<input
										type="checkbox"
										name="wifi"
										id="wifi"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.wifi}
									/>
									<label
										htmlFor="wifi"
										className="ml-2"
									>
										Wifi
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										name="pets"
										id="pets"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.pets}
									/>
									<label
										htmlFor="pets"
										className="ml-2"
									>
										Pets
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										name="breakfast"
										id="breakfast"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={
											formik.values.breakfast
										}
									/>
									<label
										htmlFor="breakfast"
										className="ml-2"
									>
										Breakfast
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										name="parking"
										id="parking"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.parking}
									/>
									<label
										htmlFor="parking"
										className="ml-2"
									>
										Parking
									</label>
								</div>
							</div>
						</div>

						{/* Address fields */}
						<div className="flex flex-col">
							<label htmlFor="address">
								Address
							</label>
							<input
								type="text"
								name="address"
								id="address"
								placeholder="Enter the address"
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.address}
							/>
							{formik.touched.address &&
							formik.errors.address ? (
								<div className="text-red-600">
									{formik.errors.address}
								</div>
							) : null}
						</div>

						<div className="flex flex-col">
							<label htmlFor="city">City</label>
							<input
								type="text"
								name="city"
								id="city"
								placeholder="Enter the city"
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.city}
							/>
							{formik.touched.city &&
							formik.errors.city ? (
								<div className="text-red-600">
									{formik.errors.city}
								</div>
							) : null}
						</div>

						<div className="flex flex-col">
							<label htmlFor="state">State</label>
							<input
								type="text"
								name="state"
								id="state"
								placeholder="Enter the state"
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.state}
							/>
							{formik.touched.state &&
							formik.errors.state ? (
								<div className="text-red-600">
									{formik.errors.state}
								</div>
							) : null}
						</div>

						<div className="flex flex-col">
							<label htmlFor="zip">Zip</label>
							<input
								type="text"
								name="zip"
								id="zip"
								placeholder="Enter the zip code"
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.zip}
							/>
							{formik.touched.zip &&
							formik.errors.zip ? (
								<div className="text-red-600">
									{formik.errors.zip}
								</div>
							) : null}
						</div>

						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Update Venue
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditVenueForm;
