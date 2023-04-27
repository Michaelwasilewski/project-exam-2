import React, {
	useState,
	useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VenuePage = () => {
	const [venues, setVenues] = useState([]);
	const [searchTerm, setSearchTerm] =
		useState('');
	const [filteredVenues, setFilteredVenues] =
		useState([]);

	useEffect(() => {
		axios
			.get(
				'https://nf-api.onrender.com/api/v1/holidaze/venues'
			)
			.then((response) => {
				setVenues(response.data);
				setFilteredVenues(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		const filtered = venues.filter((venue) =>
			venue.name
				.toLowerCase()
				.includes(
					event.target.value.toLowerCase()
				)
		);
		setFilteredVenues(filtered);
	};

	const sortedVenues = filteredVenues.sort(
		(a, b) =>
			a.rating - b.rating || a.price - b.price
	);

	return (
		<div className="container mx-auto">
			<div className="text-center my-4">
				<h1 className="text-2xl font-bold text-white">
					Venues
				</h1>
				<p className="text-gray-500">
					Find your perfect venue for your holiday
				</p>
				<input
					type="text"
					className="border border-gray-400 focus:outline-none focus:border-blue-500 p-2 rounded-lg w-full mt-4"
					placeholder="Search for a venue"
					value={searchTerm}
					onChange={handleSearch}
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{sortedVenues.map((venue) => (
					<div
						key={venue.id}
						className="venue-card bg-gray-900 rounded-lg shadow-md flex flex-col justify-between h-96 p-4"
					>
						<div
							className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
							style={{
								backgroundImage: `url(${venue.media[0]})`,
							}}
						></div>
						<div className="flex-grow">
							<h2 className="text-lg font-medium text-white mb-2">
								{venue.name}
							</h2>
							<div className="flex items-center text-gray-500 text-sm mb-2">
								<svg
									className="fill-current text-yellow-500 w-4 h-4 mr-1"
									viewBox="0 0 24 24"
								>
									<path
										d="M20.66 9.593a1.003 1.003 0 00-.854-.566l-5.961-.863L12.945.785c-.305-.645-1.335-.645-1.64 0L9.254 7.164l-5.961.863a1.003 1.003 0 00-.554 1.705l4.313 4.203-1.019 5.938c-.074.43.387.767.798.566L12 17.563l5.346 2.802c.23.121.51.121.74 0l1.66-.873c.41-.201.872-.867.798-1.297l-1.019-5.938 4.313-4.203c.219-.21.305-.509.219-.791z"
										fillRule="evenodd"
									/>
								</svg>
								<span className="text-white">
									{venue.rating.toFixed(1)}
								</span>
							</div>
							<p className="text-gray-400 text-sm mb-4">
								{venue.description.substring(
									0,
									100
								)}
								...
							</p>
						</div>
						<Link
							to={`/venue/${venue.id}`}
							className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
						>
							View details
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default VenuePage;
