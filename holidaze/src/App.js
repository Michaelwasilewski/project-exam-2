import Router from './Routes/Router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loader from './components/shared/Loader';
import { useSelector } from 'react-redux';
import Layout from './components/shared/Layout';
import { useEffect } from 'react';

const ScrollToTopOnLinkClick = () => {
	useEffect(() => {
		const scrollToTop = () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		};

		const links = document.querySelectorAll('a');

		links.forEach((link) => {
			link.addEventListener('click', scrollToTop);
		});

		return () => {
			links.forEach((link) => {
				link.removeEventListener(
					'click',
					scrollToTop
				);
			});
		};
	}, []);

	return null;
};

function App() {
	const { isLoading } = useSelector(
		(state) => state.loader
	);
	return (
		<>
			<ScrollToTopOnLinkClick />
			<Layout>
				<Router />
				{isLoading && <Loader />}
			</Layout>
		</>
	);
}

export default App;
