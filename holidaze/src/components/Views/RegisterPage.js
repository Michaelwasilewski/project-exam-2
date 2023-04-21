import { LockClosedIcon } from '@heroicons/react/20/solid';
import {
	useEffect,
	useRef,
	useState,
} from 'react';
import Logo from '../../img/holidazelogo.png';

export default function AuthForm(mode) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] =
		useState(true);
	const [venueManager, setVenueManager] =
		useState('');
	const [avatar, setAvatar] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState('');
	const fileInputRef = useRef();

	useEffect(() => {
		if (avatarUrl) {
			setAvatar(null);
		}
	}, [avatarUrl]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError({});
		setIsLoading(true);

		const data = {
			email: email,
			password: password,
		};

		if (mode === 'register') {
			data.name = name;
			data.venueManager = venueManager === 'true';
			data.avatar = avatarUrl;
		}

		const apiUrl =
			mode === 'register'
				? 'https://nf-api.onrender.com/api/v1/holidaze/auth/register'
				: 'https://nf-api.onrender.com/api/v1/holidaze/auth/login';

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			// ... Handle the response
		} catch (error) {
			// ... Handle the error
		}

		setIsLoading(false);
	};

	const formTitle =
		mode === 'register'
			? 'Register an account'
			: 'Sign in to your account';
	const alternativeAction =
		mode === 'register' ? 'Sign in' : 'Register';

	return (
		<>
			<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<img
							className="mx-auto h-24 w-auto"
							src={Logo}
							alt="Your Company"
						/>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Register an account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{' '}
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Sign in
							</a>
						</p>
					</div>
					<form
						className="mt-8 space-y-6"
						onSubmit={handleSubmit}
					>
						<input
							type="hidden"
							name="remember"
							defaultValue="true"
						/>
						{error.name && (
							<div className="text-red-600 text-sm mt-1 mb-2">
								{error.name}
							</div>
						)}
						<div className="-space-y-px rounded-md shadow-sm">
							<div className="py-2">
								<label
									htmlFor="name"
									className="sr-only"
								>
									Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									className="relative block w-full rounded-t-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Name"
									value={name}
									onChange={(e) =>
										setName(e.target.value)
									}
								/>
							</div>
							{error.email && (
								<div className="text-red-600 text-sm mt-1 mb-2">
									{error.email}
								</div>
							)}

							<div className="py-2">
								<label
									htmlFor="email-address"
									className="sr-only"
								>
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Email address"
									value={email}
									onChange={(e) =>
										setEmail(e.target.value)
									}
								/>
							</div>

							<div className="py-2">
								<label
									htmlFor="avatar-url"
									className="block text-sm font-medium text-gray-700"
								>
									Avatar URL
								</label>
								<input
									id="avatar-url"
									name="avatarUrl"
									type="text"
									autoComplete="off"
									className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Paste avatar URL"
									value={avatarUrl}
									onChange={(e) =>
										setAvatarUrl(e.target.value)
									}
								/>
							</div>

							<div className="py-2">
								<label
									htmlFor="venue-manager"
									className="sr-only"
								>
									Venue Manager
								</label>
								<select
									id="venue-manager"
									name="venueManager"
									required
									className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={venueManager}
									onChange={(e) =>
										setVenueManager(
											e.target.value
										)
									}
								>
									<option value="">
										Select Venue Manager
									</option>
									<option value="true">
										True
									</option>
									<option value="false">
										False
									</option>
								</select>
							</div>
							{error.password && (
								<div className="text-red-600 text-sm mt-1 mb-2">
									{error.password}
								</div>
							)}
							<div className="py-2">
								<label
									htmlFor="password"
									className="sr-only"
								>
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900"
								>
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Forgot your password?
								</a>
							</div>
						</div>
						{error.generic && (
							<div className="text-red-600 text-sm mt-1 mb-2">
								{error.generic}
							</div>
						)}
						<div>
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
