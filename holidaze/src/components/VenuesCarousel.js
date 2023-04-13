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
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div>
			<Slider {...sliderSettings}>
				{venues.map((venue) => (
					<div key={venue.id}>
						<Venue venue={venue} />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default VenuesCarousel;
