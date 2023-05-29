import React from 'react';
import {
	useLocation,
	Link,
} from 'react-router-dom';

const Breadcrumbs = () => {
	const location = useLocation();
	let pathnames = location.pathname
		.split('/')
		.filter((x) => x);

	return (
		<nav
			className="text-black font-bold my-8"
			aria-label="Breadcrumb"
		>
			<ol className="list-none p-0 inline-flex">
				<li className="flex items-center">
					<Link
						to="/"
						className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
					>
						Home
					</Link>
					{pathnames.map((value, index) => {
						const isLast =
							index === pathnames.length - 1;
						const to = `/${pathnames
							.slice(0, index + 1)
							.join('/')}`;

						return isLast ? (
							<div
								key={index}
								className="flex items-center"
							>
								<svg
									className="fill-current w-3 h-3 mx-3"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512"
								>
									<path d="M98.142 301.43l121.65-121.65c4.35-4.35 4.35-11.42 0-15.77l-121.65-121.65c-7.07-7.07-18.55-7.07-25.6 0l-22.63 22.63c-7.07 7.07-7.07 18.55 0 25.6l82.84 82.84H3.41c-9.37 0-17 7.58-17 17v34.84c0 9.37 7.58 17 17 17h178.03l-82.84 82.84c-7.07 7.07-7.07 18.55 0 25.6l22.63 22.63c7.07 7.06 18.55 7.06 25.59-.01z" />
								</svg>
								<span className="text-gray-500">
									{value}
								</span>
							</div>
						) : (
							<div
								key={index}
								className="flex items-center"
							>
								<svg
									className="fill-current w-3 h-3 mx-3"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512"
								>
									<path d="M98.142 301.43l121.65-121.65c4.35-4.35 4.35-11.42 0-15.77l-121.65-121.65c-7.07-7.07-18.55-7.07-25.6 0l-22.63 22.63c-7.07 7.07-7.07 18.55 0 25.6l82.84 82.84H3.41c-9.37 0-17 7.58-17 17v34.84c0 9.37 7.58 17 17 17h178.03l-82.84 82.84c-7.07 7.07-7.07 18.55 0 25.6l22.63 22.63c7.07 7.06 18.55 7.06 25.59-.01z" />
								</svg>
								<Link
									to={to}
									className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
								>
									{value}
								</Link>
							</div>
						);
					})}
				</li>
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
