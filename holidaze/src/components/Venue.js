import { useState } from 'react';

const Venue = ({ venue }) => {
	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = () =>
		setShowMore(!showMore);

	return (
		<div className="container bg-gray-900 rounded-lg shadow-lg overflow-hidden p-2">
			<div className="relative">
				<img
					src={venue.media[0]}
					alt={venue.name}
					className="w-full h-64 object-cover"
				/>
				<div className="absolute bottom-0 left-0 p-4">
					<h3 className="text-lg font-bold text-white">
						{venue.name}
					</h3>
				</div>
			</div>
			<div className="px-4 py-3">
				<p
					className={`text-white ${
						showMore ? '' : 'truncate'
					}`}
				>
					{venue.description}
				</p>
				{!showMore && (
					<button
						className="text-blue-500 hover:text-blue-700"
						onClick={toggleShowMore}
					>
						Show more
					</button>
				)}
				{showMore && (
					<button
						className="text-blue-500 hover:text-blue-700"
						onClick={toggleShowMore}
					>
						Show less
					</button>
				)}
				<p className="text-white">
					Price: ${venue.price} per night
				</p>
				<p className="text-white">
					Max guests: {venue.maxGuests}
				</p>
				<div className="flex items-center mt-2">
					{venue.meta.wifi && (
						<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
					)}
					<p className="text-white">
						{venue.meta.wifi
							? 'Free WiFi'
							: 'No WiFi'}
					</p>
				</div>
				<div className="flex items-center mt-2">
					{venue.meta.pets && (
						<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
					)}
					<p className="text-white">
						{venue.meta.pets
							? 'Pets Allowed'
							: 'No Pets Allowed'}
					</p>
				</div>
				<div className="flex items-center mt-2">
					{venue.meta.parking && (
						<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
					)}
					<p className="text-white">
						{venue.meta.parking
							? 'Free Parking'
							: 'No Parking'}
					</p>
				</div>
				<div className="flex items-center mt-2">
					{venue.meta.breakfast && (
						<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
					)}
					<p className="text-white">
						{venue.meta.breakfast
							? 'Free Breakfast'
							: 'No Breakfast'}
					</p>
				</div>
				<a
					href={`/hotels/${venue.id}`}
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
				>
					Book now
				</a>
			</div>
		</div>
	);
};

export default Venue;
