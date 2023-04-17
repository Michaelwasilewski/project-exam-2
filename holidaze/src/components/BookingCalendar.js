import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSearch,
	faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

const SearchForm = () => {
	const [startDate, setStartDate] =
		useState(null);
	const [endDate, setEndDate] = useState(null);
	const [guests, setGuests] = useState(1);
	const [showGuests, setShowGuests] =
		useState(false);

	const handleGuestsChange = (e) => {
		setGuests(e.target.value);
	};
	const [showModal, setShowModal] =
		useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const handleSearch = () => {
		console.log(
			`Start date: ${startDate}, End date: ${endDate}, Guests: ${guests}`
		);
	};

	const toggleGuests = () => {
		setShowGuests(!showGuests);
	};

	return (
		<form className="bg-white rounded-lg overflow-hidden shadow-lg p-8">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="relative">
					<label
						htmlFor="startDate"
						className="block text-gray-700 font-medium mb-2"
					>
						Check-in
						<span
							className="relative inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600"
							onMouseEnter={toggleModal}
							onMouseLeave={toggleModal}
						>
							<FontAwesomeIcon
								icon={faQuestionCircle}
							/>
							{showModal && (
								<div className="absolute bottom-full left-0 ml-2 w-64 p-2 bg-white rounded-md shadow-lg">
									<p className="text-gray-700 text-sm font-medium">
										Select the date you want to
										check in
									</p>
								</div>
							)}
						</span>
					</label>
					<input
						type="date"
						value={startDate}
						onChange={(e) =>
							setStartDate(e.target.value)
						}
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="Select a date"
					/>
				</div>
				<div className="relative">
					<label
						htmlFor="endDate"
						className="block text-gray-700 font-medium mb-2"
					>
						Check-out
						<span
							className="relative inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600"
							onMouseEnter={toggleModal}
							onMouseLeave={toggleModal}
						>
							<FontAwesomeIcon
								icon={faQuestionCircle}
							/>
							{showModal && (
								<div className="absolute top-full left-0 ml-2 w-64 p-2 bg-white rounded-md shadow-lg">
									<p className="text-gray-700 text-sm font-medium">
										Select the date you want to
										Check out
									</p>
								</div>
							)}
						</span>
					</label>
					<input
						type="date"
						value={endDate}
						onChange={(e) =>
							setEndDate(e.target.value)
						}
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="Select a date"
					/>
				</div>

				<div className="col-span-3">
					<label
						htmlFor="guests"
						className="block text-gray-700 font-semibold mb-2"
					>
						Guests
						<span
							className="ml-1 relative inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600"
							onMouseEnter={toggleGuests}
							onMouseLeave={toggleGuests}
						>
							<FontAwesomeIcon
								icon={faQuestionCircle}
							/>

							{showGuests && (
								<div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 p-2 rounded-md">
									<label
										htmlFor="guests"
										className="block text-gray-700 font-semibold mb-2 cursor-pointer"
									>
										<div className="absolute top-full left-0 ml-2 w-64 p-2 bg-white rounded-md shadow-lg">
											<p className="text-gray-700 text-sm font-medium">
												Select how many guests
											</p>
										</div>
									</label>

									<input
										id="guests"
										type="number"
										min="1"
										max="10"
										value={guests}
										onChange={handleGuestsChange}
										className="w-full p-2 border rounded-md"
									/>
								</div>
							)}
						</span>
					</label>
					<input
						id="guests"
						type="number"
						min="1"
						max="10"
						value={guests}
						onChange={handleGuestsChange}
						className="w-full p-2 border rounded-md"
					/>
				</div>
			</div>
			<div className="mt-8">
				<button
					className="bg-blue-600 w-full text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
					onClick={handleSearch}
				>
					<FontAwesomeIcon icon={faSearch} />
					<span>Search</span>
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
