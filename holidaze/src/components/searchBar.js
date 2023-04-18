import React, { useState } from 'react';

const SearchBar = () => {
	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');
	const [venue, setVenue] = useState('');

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
			className="flex flex-col md:flex-row md:space-x-2 md:space-y-0"
		>
			<input
				type="date"
				value={dateFrom}
				onChange={(e) =>
					setDateFrom(e.target.value)
				}
				className="w-full p-2 border border-gray-300 rounded-md"
				placeholder="Date From"
			/>
			<input
				type="date"
				value={dateTo}
				onChange={(e) =>
					setDateTo(e.target.value)
				}
				className="w-full p-2 border border-gray-300 rounded-md"
				placeholder="Date To"
			/>
			<input
				type="text"
				value={venue}
				onChange={(e) => setVenue(e.target.value)}
				className="w-full p-2 border border-gray-300 rounded-md"
				placeholder="Venue"
			/>
			<button
				type="submit"
				className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 md:w-auto"
			>
				Search
			</button>
		</form>
	);
};

export default SearchBar;
