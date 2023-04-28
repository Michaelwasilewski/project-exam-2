import { useState } from 'react';
import Logo from '../../img/holidazelogo.png';
export default function CreateVenueForm() {
	const [name, setName] = useState('');
	const [description, setDescription] =
		useState('');
	const [media, setMedia] = useState([]);
	const [price, setPrice] = useState(0);
	const [maxGuests, setMaxGuests] = useState(0);
	const [wifi, setWifi] = useState(false);
	const [parking, setParking] = useState(false);
	const [breakfast, setBreakfast] =
		useState(false);
	const [pets, setPets] = useState(false);
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [zip, setZip] = useState('');
	const [country, setCountry] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const accessToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsIm5hbWUiOiJNaWNoIiwiZW1haWwiOiJtaWNodGhlYmlzaEBub3JvZmYubm8iLCJhdmF0YXIiOiIiLCJ2ZW51ZU1hbmFnZXIiOnRydWUsImlhdCI6MTY4MTQxMTYyMH0.aQBCKf3Yh8JbeUXOWe77RHyR5NswTq0dPbCpju4cQmE';

		const data = {
			name,
			description,
			media:
				media.length > 0 ? [media] : undefined,
			price: parseFloat(price),
			maxGuests: parseInt(maxGuests),
			meta: {
				wifi,
				parking,
				breakfast,
				pets,
			},
			location: {
				address,
				city,
				zip,
				country,
			},
		};
		console.log('Data object:', data);
		try {
			const response = await fetch(
				'https://nf-api.onrender.com/api/v1/holidaze/venues',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

			const responseData = await response.json();
			console.log(responseData);
		} catch (error) {
			console.error(error);
			if (error.errors && error.errors[0].path) {
				console.log(
					'Error path:',
					error.errors[0].path
				);
			}
		}
	};

	return (
		<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-2xl space-y-8">
				<div className="text-center">
					<img
						className="mx-auto h-24 w-auto"
						src={Logo}
						alt="Your Company"
					/>
					<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
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
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="col-span-full">
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
								value={name}
								onChange={(event) =>
									setName(event.target.value)
								}
								required
								className="relative block w-full rounded-t-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Title"
							/>
						</div>

						<div className="col-span-full">
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
						<div className="py-2">
							<label
								htmlFor="country"
								className="sr-only"
							>
								Country
							</label>
							<input
								type="text"
								id="country"
								name="country"
								value={country}
								onChange={(event) =>
									setCountry(event.target.value)
								}
								required
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Country"
							/>
						</div>
						<div className="py-2">
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
						</div>
						<div className="py-2">
							<label
								htmlFor="city"
								className="sr-only"
							>
								City
							</label>
							<input
								type="text"
								id="city"
								name="city"
								value={city}
								onChange={(event) =>
									setCity(event.target.value)
								}
								required
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="City"
							/>
						</div>
						<div className="py-2">
							<label
								htmlFor="zip"
								className="sr-only"
							>
								Zip
							</label>
							<input
								type="text"
								id="zip"
								name="zip"
								value={zip}
								onChange={(event) =>
									setZip(event.target.value)
								}
								required
								className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Zip"
							/>
						</div>
						<div className="col-span-full">
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
								value={media}
								onChange={(event) =>
									setMedia(event.target.value)
								}
								required
								className="relative block w-full rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Image URL"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
						<div className="text-sm">
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Back to listings
							</a>
						</div>
						<button
							type="submit"
							className="w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
