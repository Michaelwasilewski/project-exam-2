import React, {
	useState,
	useEffect,
} from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeroSection from '../HeroSection';

function Venues() {
	const [venues, setVenues] = useState([]);

	useEffect(() => {
		async function fetchVenues() {
			const response = await axios.get(
				'https://nf-api.onrender.com/api/v1/holidaze/venues'
			);
			setVenues(response.data);
		}
		fetchVenues();
	}, []);

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<HeroSection></HeroSection>
			<div className="bg-neutral1">
				<div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-neutral2">
						Venues
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{venues.map((venue) => (
							<div
								key={venue.id}
								className="group relative flex flex-col gap-y-3"
							>
								<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-neutral2 group-hover:opacity-75 lg:aspect-none lg:h-80">
									<img
										src={venue.media[0]}
										alt={venue.title}
										className="h-full w-full object-contain object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700 relative">
											<Link
												to={`product/${venue.id}`}
											>
												<span
													aria-hidden="true"
													className="absolute inset-0"
												/>
												{venue.title}
											</Link>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{venue.description}
										</p>
									</div>
									<p className="text-sm font-medium text-gray-900">
										NOK{venue.price}
									</p>
								</div>
								<Link
									to={`product/${venue.id}`}
									className="py-2 px-4 bg-primary text-white mt-auto text-center rounded-md hover:bg-secondary"
								>
									View
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Venues;
