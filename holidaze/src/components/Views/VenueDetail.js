import React, {
	useState,
	useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import {
	FaWifi,
	FaDog,
	FaCar,
	FaUtensils,
	FaUsers,
	FaStar,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookNowButton = () => (
	<button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
		Book now
	</button>
);
const BackToHomepageButton = () => (
	<Link to="/">
		<button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
			Back to Homepage
		</button>
	</Link>
);
const VenueDetail = () => {
	const { id } = useParams();
	const [venue, setVenue] = useState(null);
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		const fetchVenue = async () => {
			try {
				const response = await axios.get(
					`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`
				);
				setVenue(response.data);
			} catch (error) {
				console.error(
					'Error fetching venue data:',
					error
				);
			}
		};

		fetchVenue();
	}, [id]);
	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	const truncateDescription = (
		text,
		maxLength = 150
	) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...';
		}
		return text;
	};

	if (!venue) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-gray-900 min-h-screen">
			<div
				className="relative h-64 md:h-96 bg-cover bg-center"
				style={{
					backgroundImage: `url(${venue.media[0]})`,
				}}
			>
				<div className="absolute inset-0 bg-black opacity-40"></div>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
						{venue.name}
					</h1>
					<div className="space-x-4">
						<Link to={`/bookings/${id}`}>
							<BookNowButton />
						</Link>
					</div>
				</div>
			</div>
			<div className="container mx-auto py-12 px-4">
				<div className="bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-center p-4">
					<div className="w-full md:w-1/2 p-4">
						<h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
							{venue.name}
						</h2>
						<p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">
							{showMore
								? venue.description
								: truncateDescription(
										venue.description
								  )}
							<button
								onClick={toggleShowMore}
								className="text-indigo-500"
							>
								{showMore
									? 'Show Less'
									: 'Show More'}
							</button>
						</p>
						<div className="bg-gray-700 rounded-lg p-4 mb-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<p className="text-xl md:text-2xl font-bold text-white tracking-wide">
									Price:{' '}
									<span className="text-green-500 font-bold py-1 px-2 rounded-full">
										${venue.price}
									</span>
								</p>
								<p className="text-xl md:text-2xl font-bold text-white tracking-wide">
									<FaUsers className="inline-block mr-2 text-indigo-500" />
									Max Guests: {venue.maxGuests}
								</p>
								<p className="text-xl md:text-2xl font-bold text-white tracking-wide">
									Rating:{' '}
									{venue.rating.toFixed(1)}
									<FaStar className="inline-block ml-2 text-yellow-500" />
								</p>
							</div>
						</div>
						{venue.location.address ||
						venue.location.city ||
						venue.location.zip ||
						venue.location.country ? (
							<div className="bg-gray-700 rounded-lg p-4 mb-4">
								<h3 className="text-xl md:text-2xl font-semibold text-white mb-2 tracking-wide">
									Location
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									{venue.location.address && (
										<p className="text-base md:text-lg text-gray-300 leading-relaxed">
											Address:{' '}
											{venue.location.address}
										</p>
									)}
									{venue.location.city && (
										<p className="text-base md:text-lg text-gray-300 leading-relaxed">
											City: {venue.location.city}
										</p>
									)}
									{venue.location.zip && (
										<p className="text-base md:text-lg text-gray-300 leading-relaxed">
											Zip: {venue.location.zip}
										</p>
									)}
									{venue.location.country && (
										<p className="text-base md:text-lg text-gray-300 leading-relaxed">
											Country:{' '}
											{venue.location.country}
										</p>
									)}
								</div>
							</div>
						) : null}

						<ul className="grid grid-cols-2 gap-4 text-sm md:text-base text-gray-100">
							{[
								{
									icon: (
										<FaWifi className="mr-2" />
									),
									label: 'WiFi',
									value: venue.meta.wifi,
								},
								{
									icon: (
										<FaCar className="mr-2" />
									),
									label: 'Parking',
									value: venue.meta.parking,
								},
								{
									icon: (
										<FaUtensils className="mr-2" />
									),
									label: 'Breakfast',
									value: venue.meta.breakfast,
								},
								{
									icon: (
										<FaDog className="mr-2" />
									),
									label: 'Pets',
									value: venue.meta.pets,
								},
							].map(({ icon, label, value }) => (
								<li
									key={label}
									className="flex items-center bg-gray-700 p-2 rounded-lg"
								>
									{icon}
									{label}:{' '}
									{value ? (
										<span className="text-green-600 ml-1 font-semibold">
											Yes
										</span>
									) : (
										<span className="text-red-600 ml-1">
											No
										</span>
									)}
								</li>
							))}
						</ul>
					</div>
					<div className="w-full md:w-1/2 p-4">
						<div className="w-full h-full md:h-auto overflow-hidden rounded">
							<Carousel
								showThumbs={false}
								infiniteLoop
								useKeyboardArrows
								autoPlay
								emulateTouch
							>
								{venue.media.map(
									(image, index) => (
										<div key={index}>
											<img
												src={image}
												alt={`${venue.name}-${index}`}
												className="object-cover h-full md:h-64 w-full rounded"
											/>
										</div>
									)
								)}
							</Carousel>
						</div>
					</div>
				</div>
				<div className="mt-8 flex justify-center">
					<BookNowButton />
				</div>
				<BackToHomepageButton />
			</div>
		</div>
	);
};

export default VenueDetail;
