import React, {
	useState,
	useEffect,
} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Venue from './Venue';

const VenuesCarousel = () => {
	const [venues, setVenues] = useState([]);

	useEffect(() => {
		const fetchVenues = async () => {
			try {
				const { data } = await axios.get(
					'https://nf-api.onrender.com/api/v1/holidaze/venues'
				);
				setVenues(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchVenues();
	}, []);

	const sliderSettings = {
		dots: true,
		arrows: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 8000,
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
	);
};

export default VenuesCarousel;
