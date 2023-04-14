import Navigation from './components/Navigation';
import Footer from './components/Footer';
import VenuesCarousel from './components/VenuesCarousel';
import Search from './components/Search';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoginForm from './components/LogInForm';

function App() {
	return (
		<>
			<Navigation></Navigation>
			<Search />
			<VenuesCarousel />
			<LoginForm />
			<Footer></Footer>
		</>
	);
}

export default App;
