import Router from './Routes/Router';
// import VenuesCarousel from './components/VenuesCarousel';
// import Search from './components/Search';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import LoginForm from './components/LogInForm';
import Loader from './components/shared/Loader';
// import Venues from './components/Views/Venues';
import { useSelector } from 'react-redux';
// import BookingCalendar from './components/BookingCalendar';
import Layout from './components/shared/Layout';

function App() {
	const { isLoading } = useSelector(
		(state) => state.loader
	);
	return (
		<>
			<Layout>
				<Router />
				{isLoading && <Loader />}
			</Layout>
		</>
	);
}

export default App;
