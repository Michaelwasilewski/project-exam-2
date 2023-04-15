import Router from './Routes/Router';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import VenuesCarousel from './components/VenuesCarousel';
// import Search from './components/Search';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoginForm from './components/LogInForm';
import Loader from './components/shared/Loader';
import Venues from './components/Views/Venues';
import { useSelector } from 'react-redux';
import BookingCalendar from './components/BookingCalendar';

function App() {
	const { isLoading } = useSelector(
		(state) => state.loader
	);
	return (
		<>
			<Header></Header>
			<Router />
			{isLoading && <Loader />}
			<BookingCalendar />
			<VenuesCarousel />
			<Venues />
			<LoginForm />
			<Footer></Footer>
		</>
	);
}

export default App;
