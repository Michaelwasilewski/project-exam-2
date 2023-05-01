import { useEffect } from 'react';
import {
	useDispatch,
	useSelector,
} from 'react-redux';

import { fetchProfileData } from '../../store/modules/profileSlice';

const ProfilePage = () => {
	const accessToken = useSelector(
		(state) => state.auth.accessToken
	);
	const profileData = useSelector(
		(state) => state.profile
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) {
			dispatch(fetchProfileData(accessToken));
		}
	}, [accessToken, dispatch]);

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-3xl font-bold mb-8">
				Welcome, {profileData && profileData.name}
				!
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div className="bg-white shadow rounded-lg p-4">
					<h2 className="text-lg font-bold mb-4">
						Profile Information
					</h2>
					<p>
						<span className="font-bold">
							Email:
						</span>{' '}
						{profileData.email}
					</p>
					<p>
						<span className="font-bold">
							Avatar:
						</span>{' '}
						{profileData.avatar}
					</p>
					<p>
						<span className="font-bold">
							Venue Manager:
						</span>{' '}
						{profileData.venueManager
							? 'Yes'
							: 'No'}
					</p>
				</div>
				<div className="bg-white shadow rounded-lg p-4">
					<h2 className="text-lg font-bold mb-4">
						Venues
					</h2>
					<ul className="list-disc pl-4">
						{profileData.venues.map((venue) => (
							<li key={venue.id}>
								<h3 className="text-md font-bold">
									{venue.name}
								</h3>
								<p>
									<span className="font-bold">
										Description:
									</span>{' '}
									{venue.description}
								</p>
								<p>
									<span className="font-bold">
										Media:
									</span>{' '}
									{venue.media}
								</p>
								<p>
									<span className="font-bold">
										Created:
									</span>{' '}
									{venue.created}
								</p>
								<p>
									<span className="font-bold">
										Updated:
									</span>{' '}
									{venue.updated}
								</p>
								<h4 className="text-sm font-bold mt-2">
									Owner
								</h4>
								<p>
									<span className="font-bold">
										Name:
									</span>{' '}
									{venue.owner.name}
								</p>
								<p>
									<span className="font-bold">
										Email:
									</span>{' '}
									{venue.owner.email}
								</p>
								<p>
									<span className="font-bold">
										Avatar:
									</span>{' '}
									{venue.owner.avatar}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
