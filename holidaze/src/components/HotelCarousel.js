// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function HotelCarousel() {
// 	const [bookings, setBookings] = useState([]);

// 	useEffect(() => {
// 		axios
// 			.get(
// 				'https://nf-api.onrender.com/api/v1/holidaze/venues'
// 			)
// 			.then((response) =>
// 				setBookings(response.data)
// 			)
// 			.catch((error) => console.log(error));
// 	}, []);

// 	const slidesToShow = 3;

// 	const [currentIndex, setCurrentIndex] =
// 		useState(0);
// 	const [translateValue, setTranslateValue] =
// 		useState(0);

// 	const goToNextSlide = () => {
// 		if (
// 			currentIndex ===
// 			bookings.length - slidesToShow
// 		) {
// 			setCurrentIndex(0);
// 			setTranslateValue(0);
// 		} else {
// 			setCurrentIndex(currentIndex + 1);
// 			setTranslateValue(
// 				translateValue - slideWidth()
// 			);
// 		}
// 	};

// 	const goToPrevSlide = () => {
// 		if (currentIndex === 0) {
// 			setCurrentIndex(
// 				bookings.length - slidesToShow
// 			);
// 			setTranslateValue(
// 				-(bookings.length - slidesToShow) *
// 					slideWidth()
// 			);
// 		} else {
// 			setCurrentIndex(currentIndex - 1);
// 			setTranslateValue(
// 				translateValue + slideWidth()
// 			);
// 		}
// 	};

// 	const slideWidth = () => {
// 		return document.querySelector('.hotel-slide')
// 			.clientWidth;
// 	};

// 	return (
// 		<div className="hotel-carousel">
// 			<div
// 				className="carousel-wrapper"
// 				style={{
// 					transform: `translateX(${translateValue}px)`,
// 					transition: 'transform ease-out 0.45s',
// 				}}
// 			>
// 				{bookings.map((booking, index) => (
// 					<div
// 						className="hotel-slide"
// 						key={index}
// 					>
// 						<img
// 							src={booking.media[0]}
// 							alt={booking.name}
// 							className="w-full h-64 object-cover"
// 						/>
// 						<h3 className="text-lg font-bold">
// 							{booking.name}
// 						</h3>
// 						<p className="text-gray-700">
// 							{booking.description}
// 						</p>
// 						<p className="text-gray-700">
// 							Price: ${booking.price} per night
// 						</p>
// 						<p className="text-gray-700">
// 							Max guests: {booking.maxGuests}
// 						</p>
// 						<div className="flex items-center mt-2">
// 							{booking.meta.wifi && (
// 								<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
// 							)}
// 							<p className="text-gray-700">
// 								{booking.meta.wifi
// 									? 'Free WiFi'
// 									: 'No WiFi'}
// 							</p>
// 						</div>
// 						<div className="flex items-center mt-2">
// 							{booking.meta.parking && (
// 								<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
// 							)}
// 							<p className="text-gray-700">
// 								{booking.meta.parking
// 									? 'Free Parking'
// 									: 'No Parking'}
// 							</p>
// 						</div>
// 						<div className="flex items-center mt-2">
// 							{booking.meta.breakfast && (
// 								<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
// 							)}
// 							<p className="text-gray-700">
// 								{booking.meta.breakfast
// 									? 'Free Breakfast'
// 									: 'No Breakfast'}
// 							</p>
// 						</div>
// 						<div className="flex items-center mt-2">
// 							{booking.meta.pets && (
// 								<div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
// 							)}
// 							<p className="text-gray-700">
// 								{booking.meta.pets
// 									? 'Pets Allowed'
// 									: 'No Pets Allowed'}
// 							</p>
// 						</div>
// 						<p className="text-gray-700">
// 							{booking.check_in_date} -{' '}
// 							{booking.check_out_date}
// 						</p>
// 						<p className="text-gray-700">
// 							${booking.total_cost}
// 						</p>
// 					</div>
// 				))}
// 			</div>
// 			<button
// 				className="prev-slide"
// 				onClick={goToPrevSlide}
// 			>
// 				<i className="fas fa-chevron-left"></i>
// 			</button>
// 			<button
// 				className="next-slide"
// 				onClick={goToNextSlide}
// 			>
// 				<i className="fas fa-chevron-right"></i>
// 			</button>
// 		</div>
// 	);
// }

// export default HotelCarousel;
