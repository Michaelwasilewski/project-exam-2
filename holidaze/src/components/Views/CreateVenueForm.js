import { useState } from 'react';
import Logo from '../../img/holidazelogo.png';
export default function CreateVenueForm() {
	const [title, setTitle] = useState('');
	const [description, setDescription] =
		useState('');
	const [price, setPrice] = useState('');
	const [maxGuests, setMaxGuests] = useState('');
	const [wifi, setWifi] = useState(false);
	const [pets, setPets] = useState(false);
	const [breakfast, setBreakfast] =
		useState(false);
	const [parking, setParking] = useState(false);
	const [image, setImage] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		// TODO: Handle form submission
	};

	return (
		<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div>
					<img
						className="mx-auto h-24 w-auto"
						src={Logo}
						alt="Your Company"
					/>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Register a listing
					</h2>
				</div>
				<form
					className="mt-8 space-y-6"
					onSubmit={handleSubmit}
				>
					<input
						type="hidden"
						name="remember"
						defaultValue="true"
					/>
					<div className="-space-y-px rounded-md shadow-sm">
						<div className="py-2">
							<label
								htmlFor="title"
								className="sr-only"
							>
								Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								value={title}
								onChange={(event) =>
									setTitle(event.target.value)
								}
								required
								className="relative block w-full rounded-t-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Title"
							/>
						</div>

						<div className="py-2">
							<label
								htmlFor="description"
								className="sr-only"
							>
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={description}
								onChange={(event) =>
									setDescription(
										event.target.value
									)
								}
								required
								rows="4"
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Description"
							></textarea>
						</div>

						<div className="py-2">
							<label
								htmlFor="price"
								className="sr-only"
							>
								Price
							</label>
							<input
								type="number"
								id="price"
								name="price"
								value={price}
								onChange={(event) =>
									setPrice(event.target.value)
								}
								required
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Price per night"
							/>
						</div>

						<div className="py-2">
							<label
								htmlFor="maxGuests"
								className="sr-only"
							>
								Max Guests
							</label>
							<input
								type="number"
								id="maxGuests"
								name="maxGuests"
								value={maxGuests}
								onChange={(event) =>
									setMaxGuests(event.target.value)
								}
								required
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Max Guests"
							/>
						</div>
						{/* <div className="py-2">
							<label
								htmlFor="address"
								className="sr-only"
							>
								Address
							</label>
							<input
								type="text"
								id="address"
								name="address"
								value={address}
								onChange={(event) =>
									setAddress(event.target.value)
								}
								required
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Address"
							/>
						</div> */}

						<div className="py-2">
							<label
								htmlFor="imageURL"
								className="sr-only"
							>
								Image URL
							</label>
							<input
								type="url"
								id="imageURL"
								name="imageURL"
								value={image}
								onChange={(event) =>
									setImage(event.target.value)
								}
								required
								className="relative block w-full rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Image URL"
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm">
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Back to listings
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
