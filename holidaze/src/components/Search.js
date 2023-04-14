import { useState } from 'react';

export default function Search() {
	const [searchTerm, setSearchTerm] =
		useState('');
	const [venues, setVenues] = useState([]);

	const fetchVenues = async () => {
		try {
			const response = await fetch(
				`https://nf-api.onrender.com/api/v1/holidaze/venues?name=${searchTerm}`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch venues');
			}

			const data = await response.json();

			setVenues(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearchInput = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		fetchVenues();
	};

	return (
		<div className="max-w-lg mx-auto">
			<form onSubmit={handleSearchSubmit}>
				<div className="relative flex items-center">
					<input
						type="text"
						placeholder="Search Venues"
						value={searchTerm}
						onChange={handleSearchInput}
						className="block w-full py-2 pl-3 pr-10 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l-lg appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
					/>
					<button
						type="submit"
						className="inline-block px-4 py-2 font-semibold text-white bg-blue-500 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
					>
						Search
					</button>
				</div>
			</form>

			{venues.length > 0 ? (
				<ul className="mt-4 space-y-4">
					{venues.map((venue) => (
						<li key={venue.id}>
							<div className="p-4 bg-white rounded-lg shadow-md">
								<h2 className="text-xl font-semibold">
									{venue.name}
								</h2>
								<p className="mt-2 text-gray-700">
									{venue.description}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}
