import React, {
	useState,
	useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import {
	useSelector,
	useDispatch,
} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
	fetchVenues,
	fetchTotalVenues,
} from '../../store/modules/venueSlice';

const VenuePage = () => {
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] =
		useState('');
	const [suggestions, setSuggestions] = useState(
		[]
	);
	const [page, setPage] = useState(1);
	const [venuesPerPage, setVenuesPerPage] =
		useState(12);
	const [filteredVenues, setFilteredVenues] =
		useState([]);
	const [sortOption, setSortOption] = useState(
		'highest-rating'
	);
	const venues = useSelector(
		(state) => state.venues
	);
	const isLoggedIn = useSelector(
		(state) => state.auth.isLoggedIn
	);

	const totalPages = () => {
		if (!Array.isArray(filteredVenues)) return 0;
		return Math.ceil(
			filteredVenues.length / venuesPerPage
		);
	};

	const paginatedVenues = () => {
		if (!Array.isArray(filteredVenues)) return [];
		const startIndex = (page - 1) * venuesPerPage;
		const endIndex = startIndex + venuesPerPage;
		return filteredVenues.slice(
			startIndex,
			endIndex
		);
	};

	const nextPage = () => {
		if (page < totalPages()) {
			setPage(page + 1);
		}
	};

	const prevPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleSortChange = (event) => {
		setSortOption(event.target.value);
	};

	const sortedVenues = useSelector((state) =>
		[...state.venues?.venues]?.sort((a, b) => {
			switch (sortOption) {
				case 'highest-rating':
					return b.rating - a.rating;
				case 'lowest-rating':
					return a.rating - b.rating;
				case 'lowest-price':
					return a.price - b.price;
				case 'highest-price':
					return b.price - a.price;
				default:
					return 0;
			}
		})
	);
	const totalVenues = useSelector(
		(state) => state.venues.totalVenues
	);

	useEffect(() => {
		dispatch(fetchVenues())
			.then(() => {
				dispatch(fetchTotalVenues());
			})
			.catch((error) => {
				console.error(
					'Failed to fetch venues:',
					error
				);
			});
	}, [dispatch]);
	useEffect(() => {
		setFilteredVenues(venues.venues);
	}, [venues]);

	const handleSearch = (event) => {
		const searchTerm = event.target.value;
		setSearchTerm(searchTerm);

		const filtered =
			sortedVenues &&
			sortedVenues.filter((venue) =>
				venue.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			);

		if (searchTerm.length >= 3) {
			setSuggestions(filtered);
		} else {
			setSuggestions([]);
		}
		setFilteredVenues(filtered);
	};
	console.log(totalVenues);
	return (
		<div>
			<div className="hero-section bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-800 text-white min-h-fit">
				<div className="container mx-auto h-full flex items-center justify-center">
					<div className="w-full px-4 text-center pt-32">
						<h1 className="text-4xl sm:text-5xl font-bold mb-4">
							Find the perfect venue for your
							holiday
						</h1>
						<p className="text-base sm:text-lg mb-8">
							Search for the best venues around
							the world and book your dream
							vacation.
						</p>
						<p className="text-sm">
							We have over {sortedVenues.length}{' '}
							venues to choose from!
						</p>
						<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 relative mx-auto">
							<div className="flex items-center bg-white rounded-lg">
								<input
									type="text"
									className="border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 p-2 rounded-lg w-full bg-transparent text-gray-900 pl-10"
									placeholder="Search for a venue"
									value={searchTerm}
									onChange={handleSearch}
								/>
								<div className="absolute left-3">
									<FontAwesomeIcon
										icon={faSearch}
										className="text-gray-400"
									/>
								</div>
							</div>

							{suggestions.length > 0 && (
								<div className="absolute left-0 right-0 bg-white shadow-md rounded-lg w-full mt-2 z-10">
									<ul className="list-none p-0 m-0">
										{suggestions.map(
											(suggestion, index) => (
												<Link
													key={index}
													to={`/venue-detail/${suggestion.id}`}
													className="block px-4 py-2 border-b-2 text-gray-800 hover:bg-gray-200"
												>
													{suggestion.name}
												</Link>
											)
										)}
									</ul>
								</div>
							)}
						</div>
						<Link
							to={
								isLoggedIn
									? '/create-venue'
									: '/register'
							}
							className="mt-4 mb-4 bg-green-500 hover:bg-green-700 text-white font-semibold text-xl py-3 px-6 rounded-lg transition duration-300 ease-in-out inline-block shadow-md hover:shadow-lg transform hover:-translate-y-1"
						>
							Create a Venue
						</Link>
					</div>
				</div>
			</div>
			<div className="container mx-auto my-4">
				<div className="container mx-auto my-4 px-4">
					<div className="text-center py-8 bg-gradient-to-b from-gray-100 to-transparent">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Venues
						</h2>
						<p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
							Browse through our selection of
							top-rated venues.
						</p>
					</div>
					<div className="flex justify-end mb-4">
						<label
							htmlFor="sort-options"
							className="mr-2"
						>
							Sort by:
						</label>
						<select
							id="sort-options"
							className="border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 p-2 pr-8 rounded-lg cursor-pointer"
							value={sortOption}
							onChange={handleSortChange}
						>
							<option value="highest-rating">
								Highest Rating
							</option>
							<option value="lowest-rating">
								Lowest Rating
							</option>
							<option value="lowest-price">
								Lowest Price
							</option>
							<option value="highest-price">
								Highest Price
							</option>
						</select>
					</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
						{paginatedVenues().map((venue) => (
							<div
								key={venue.id}
								className="venue-card bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-lg shadow-md flex flex-col justify-between h-96 p-4"
							>
								<div
									className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
									style={{
										backgroundImage: `url(${venue.media[0]})`,
										objectFit: 'cover',
									}}
								></div>
								<div className="flex-grow">
									<h2 className="text-lg md:text-xl font-medium text-white mb-2">
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
									to={`/venue-detail/${venue.id}`}
									className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded block"
								>
									View details
								</Link>
							</div>
						))}
					</div>
					<div className="flex justify-center mt-6">
						<button
							onClick={prevPage}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
							disabled={page === 1}
						>
							Prev
						</button>
						<button
							onClick={nextPage}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							disabled={page === totalPages()}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VenuePage;
