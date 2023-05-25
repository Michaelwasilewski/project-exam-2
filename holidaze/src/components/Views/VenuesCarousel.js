import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { fetchVenues } from '../../store/modules/venueSlice';
import {
	useDispatch,
	useSelector,
} from 'react-redux';

import 'slick-carousel/slick/slick-theme.css';
import Venue from '../Venue';
import HeroSection from '../HeroSection';
import {
	FaChevronLeft,
	FaChevronRight,
} from 'react-icons/fa';

const Arrow = ({ direction, onClick }) => {
	const isLeft = direction === 'left';
	const Icon = isLeft
		? FaChevronLeft
		: FaChevronRight;

	return (
		<button
			className={`absolute z-10 top-1/2 transform -translate-y-1/2 ${
				isLeft ? 'left-0' : 'right-0'
			} p-4 bg-gray-800 bg-opacity-50 rounded-full text-white shadow-md focus:outline-none`}
			onClick={onClick}
			style={{ fontSize: '2rem' }}
		>
			<Icon />
		</button>
	);
};

const VenuesCarousel = () => {
	const dispatch = useDispatch();
	const venues = useSelector(
		(state) => state.venues.venues
	);

	useEffect(() => {
		// Dispatch the fetchVenues action
		dispatch(fetchVenues());
	}, [dispatch]); //

	const sliderSettings = {
		dots: false,
		infinite: true,
		nextArrow: <Arrow direction="right" />,
		prevArrow: <Arrow direction="left" />,
		speed: 800,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 3500,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1028,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	};
	return (
		<div>
			<HeroSection></HeroSection>
			<div className="mt-8 mb-8">
				<Slider {...sliderSettings}>
					{venues.map((venue) => (
						<div
							className="px-0.5 py-0.5"
							key={venue.id}
						>
							<Venue venue={venue} />
						</div>
					))}
				</Slider>
			</div>
			<div className="text-center">
				<h2 className="text-3xl font-bold text-white mb-4">
					Testimonials
				</h2>
				<div className="flex flex-wrap justify-center items-center">
					<div className="max-w-sm mx-auto rounded-lg shadow-md p-6 m-4">
						<p className="text-gray-900 text-lg mb-4">
							"I had an amazing experience at one
							of the venues. The staff was
							friendly and the atmosphere was
							fantastic. Highly recommended!"
						</p>
						<p className="text-gray-600 font-bold">
							- John Doe
						</p>
					</div>
					<div className="max-w-sm mx-auto rounded-lg shadow-md p-6 m-4">
						<p className="text-gray-900 text-lg mb-4">
							"The venues are top-notch with great
							facilities. I organized an event
							there, and everything went smoothly.
							Great job!"
						</p>
						<p className="text-gray-600 font-bold">
							- Jane Smith
						</p>
					</div>
					<div className="max-w-sm mx-auto rounded-lg shadow-md p-6 m-4">
						<p className="text-gray-900 text-lg mb-4">
							"I attended a concert at one of the
							venues, and it was an incredible
							experience. The sound quality and
							ambiance were outstanding!"
						</p>
						<p className="text-gray-600 font-bold">
							- Mike Johnson
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VenuesCarousel;
