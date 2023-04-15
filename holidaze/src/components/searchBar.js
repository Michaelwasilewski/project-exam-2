import { useState } from 'react';

const SearchBar = ({ setResults }) => {
	const [input, setInput] = useState('');
	const fetchData = (value) => {
		fetch(
			'https://api.noroff.dev/api/v1/online-shop'
		)
			.then((response) => response.json())
			.then((json) => {
				const results = json.filter((product) => {
					return (
						value &&
						product &&
						product.title &&
						product.title
							.toLowerCase()
							.includes(value)
					);
				});
				setResults(results);
			});
	};

	const handleChange = (value) => {
		setInput(value);
		fetchData(value);
	};
	return (
		<div className="relative w-full max-w-md">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg
						className="h-5 w-5 text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M14.21 12.62c-.91.82-2.15 1.32-3.5 1.32-2.87 0-5.2-2.33-5.2-5.2 0-2.87 2.33-5.2 5.2-5.2 2.87 0 5.2 2.33 5.2 5.2 0 1.35-.5 2.59-1.32 3.5l4.43 4.43c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L14.21 12.62zm-1.41-1.41c.52-.52 1.22-.81 1.97-.81 1.61 0 2.92 1.31 2.92 2.92 0 1.61-1.31 2.92-2.92 2.92-1.61 0-2.92-1.31-2.92-2.92 0-.75.29-1.45.81-1.97z"
						/>
					</svg>
				</div>
				<input
					id="search"
					className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
					placeholder="Search the store"
					type="search"
					value={input}
					onChange={(e) =>
						handleChange(e.target.value)
					}
				/>
			</div>
		</div>
	);
};

export default SearchBar;
