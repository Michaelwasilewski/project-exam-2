import React from 'react';
import { NavLink } from 'react-router-dom';
import HeroImg from '../img/heroimg.jpg';
function HeroSection() {
	return (
		<div
			className="min-w-full h-96 md:h-[600px] lg:h-[700px] xl:h-[800px]"
			style={{
				backgroundImage: `url(${HeroImg})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}}
		>
			<div className="flex flex-col justify-center items-center text-center h-full bg-black bg-opacity-50">
				<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-100 font-semibold mb-4">
					Find your perfect hotel and venue
				</h1>
				<p className="text-xl md:text-2xl text-gray-300 mb-8">
					Discover and book amazing hotels and
					venues around the world
				</p>
				<NavLink
					to="/browse-destinations"
					className="bg-gray-200 text-blue-900 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
				>
					Browse Destinations
				</NavLink>
			</div>
		</div>
	);
}

export default HeroSection;
