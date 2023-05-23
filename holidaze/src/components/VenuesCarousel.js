import React, {
	useState,
	useEffect,
} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { fetchVenues } from '../store/modules/venueSlice';
import {
	useDispatch,
	useSelector,
} from 'react-redux';

import 'slick-carousel/slick/slick-theme.css';
import Venue from './Venue';
import HeroSection from './HeroSection';
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
		</div>
	);
};

export default VenuesCarousel;
