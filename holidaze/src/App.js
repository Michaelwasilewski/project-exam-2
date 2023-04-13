import Navigation from './components/Navigation';
import Footer from './components/Footer';
import VenuesCarousel from './components/VenuesCarousel';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function App() {
	return (
		<>
			<Navigation></Navigation>
			<VenuesCarousel />
			<Footer></Footer>
		</>
	);
}

export default App;
