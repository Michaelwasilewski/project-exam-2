import React, {
	useState,
	useEffect,
} from 'react';

const SearchBar = () => {
	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');
	const [venue, setVenue] = useState('');
	const [venues, setVenues] = useState([]);
	const [filteredVenues, setFilteredVenues] =
		useState([]);

	useEffect(() => {
		fetch(
			'https://nf-api.onrender.com/api/v1/holidaze/venues'
		)
			.then((response) => response.json())
			.then((data) => setVenues(data));
	}, []);

	const filterVenues = (input) => {
		const filtered = venues.filter((venue) =>
			venue.name
				.toLowerCase()
				.includes(input.toLowerCase())
		);
		setFilteredVenues(filtered);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Search parameters:', {
			dateFrom,
			dateTo,
			venue,
		});
		// Perform your search logic here
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2"
		>
			<input
				type="date"
				value={dateFrom}
				onChange={(e) =>
					setDateFrom(e.target.value)
				}
				className="w-full p-2 border border-gray-300 rounded-md sm:w-36"
				placeholder="Date From"
			/>
			<input
				type="date"
				value={dateTo}
				onChange={(e) =>
					setDateTo(e.target.value)
				}
				className="w-full p-2 border border-gray-300 rounded-md sm:w-36"
				placeholder="Date To"
			/>
			<input
				type="text"
				value={venue}
				onChange={(e) => {
					setVenue(e.target.value);
					filterVenues(e.target.value);
				}}
				className="w-full p-1 text-xs border border-gray-300 rounded-md sm:w-48 sm:p-2 sm:text-base"
				placeholder="Venue"
			/>
			{venue && filteredVenues.length > 0 && (
				<div className="absolute opacity-1.5 z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
					{filteredVenues.map((suggestion) => (
						<div
							key={suggestion.id}
							onClick={() =>
								setVenue(suggestion.name)
							}
							className="p-2 hover:bg-gray-200 cursor-pointer"
						>
							{suggestion.name}
						</div>
					))}
				</div>
			)}
			<button
				type="submit"
				className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 sm:w-auto"
			>
				Search
			</button>
		</form>
	);
};

export default SearchBar;
