import { useState } from 'react';
import { Link } from 'react-router-dom';
const Venue = ({ venue }) => {
	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = () =>
		setShowMore(!showMore);

	return (
		<div className="bg-gray-800 rounded-sm shadow-lg overflow-hidden p-4 my-2 mx-2">
			<div className="relative">
				<img
					src={venue.media[0]}
					alt={venue.name}
					className="w-full h-96 object-cover"
				/>
				<div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50">
					<h3 className="text-2xl font-bold text-white">
						{venue.name}
					</h3>
				</div>
			</div>
			<div className="px-4 py-3 text-gray-100">
				<p
					className={`text-gray-200 ${
						showMore ? '' : 'truncate'
					}`}
					style={{ lineHeight: '1.6' }}
				>
					{venue.description}
				</p>
				{!showMore && (
					<button
						className="text-blue-500 hover:text-blue-700"
						onClick={toggleShowMore}
						style={{
							marginTop: '8px',
							fontSize: '14px',
						}}
					>
						Show more
					</button>
				)}
				{showMore && (
					<button
						className="text-blue-500 hover:text-blue-700"
						onClick={toggleShowMore}
						style={{
							marginTop: '8px',
							fontSize: '14px',
						}}
					>
						Show less
					</button>
				)}
				<p className="text-gray-300 font-medium text-lg mt-4">
					<span className="text-white mr-2">
						Price:
					</span>
					<span className="text-yellow-300">
						${venue.price}
					</span>
					<span className="text-yellow-300 text-sm">
						{' '}
						per night
					</span>
				</p>
				<p className="text-white font-medium text-lg mt-4">
					Max guests: {venue.maxGuests}
				</p>
				<div className="flex flex-wrap mt-2">
					<div className="w-1/2 flex items-center">
						{venue.meta.wifi && (
							<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
						)}
						<p className="text-white">
							{venue.meta.wifi
								? 'Free WiFi'
								: 'No WiFi'}
						</p>
					</div>
					<div className="w-1/2 flex items-center">
						{venue.meta.pets && (
							<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
						)}
						<p className="text-white">
							{venue.meta.pets
								? 'Pets Allowed'
								: 'No Pets Allowed'}
						</p>
					</div>
					<div className="w-1/2 flex items-center">
						{venue.meta.parking && (
							<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
						)}
						<p className="text-white">
							{venue.meta.parking
								? 'Free Parking'
								: 'No Parking'}
						</p>
					</div>
					<div className="w-1/2 flex items-center">
						{venue.meta.breakfast && (
							<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
						)}
						<p className="text-white">
							{venue.meta.breakfast
								? 'Free Breakfast'
								: 'No Breakfast'}
						</p>
					</div>
				</div>
				<Link
					to={`/venue-detail/${venue.id}`}
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded block"
					style={{ fontSize: '16px' }}
				>
					Book now
				</Link>
			</div>
		</div>
	);
};

export default Venue;
