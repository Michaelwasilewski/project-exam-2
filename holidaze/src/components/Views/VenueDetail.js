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
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookNowButton = () => (
	<button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
		Book now
	</button>
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
					<h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
						{venue.name}
					</h1>
					<Link to="/bookings/id">
						<BookNowButton />
					</Link>
				</div>
			</div>
			<div className="container mx-auto py-12 px-4">
				<div className="bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-center p-4">
					<div className="w-full md:w-1/2 p-4">
						<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
							{venue.name}
						</h2>
						<p className="text-sm md:text-base text-gray-300 mb-4">
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
						<p className="text-lg font-semibold text-white mb-2">
							Price:{' '}
							<span className="text-green-500">
								${venue.price}
							</span>
						</p>
						<p className="text-lg font-semibold text-white mb-4">
							Max Guests: {venue.maxGuests}
						</p>
						<ul className="text-sm md:text-base text-gray-100">
							<li className="flex items-center">
								<FaWifi className="mr-2" />
								WiFi:{' '}
								{venue.meta.wifi ? (
									<span className="text-green-600 ml-1 font-semibold">
										Yes
									</span>
								) : (
									<span className="text-red-600 ml-1">
										No
									</span>
								)}
							</li>
							<li className="flex items-center">
								<FaCar className="mr-2" />
								Parking:{' '}
								{venue.meta.parking ? (
									<span className="text-green-600 ml-1 font-semibold">
										Yes
									</span>
								) : (
									<span className="text-red-600 ml-1">
										No
									</span>
								)}
							</li>
							<li className="flex items-center">
								<FaUtensils className="mr-2" />
								Breakfast:{' '}
								{venue.meta.breakfast ? (
									<span className="text-green-600 ml-1 font-semibold">
										Yes
									</span>
								) : (
									<span className="text-red-600 ml-1">
										No
									</span>
								)}
							</li>
							<li className="flex items-center">
								<FaDog className="mr-2" />
								Pets:{' '}
								{venue.meta.pets ? (
									<span className="text-green-600 ml-1 font-semibold">
										Yes
									</span>
								) : (
									<span className="text-red-600 ml-1">
										No
									</span>
								)}
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/2 p-4">
						<div className="w-full h-84 md:h-64 overflow-hidden rounded">
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
												className="object-cover h-48 md:h-64 w-full rounded"
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
			</div>
		</div>
	);
};

export default VenueDetail;
