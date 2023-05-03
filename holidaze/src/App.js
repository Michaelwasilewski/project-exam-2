import Router from './Routes/Router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loader from './components/shared/Loader';
import { useSelector } from 'react-redux';
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
