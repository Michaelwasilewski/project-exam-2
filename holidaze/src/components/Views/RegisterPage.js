import { useEffect } from 'react';
import {
	useSelector,
	useDispatch,
} from 'react-redux';
import {
	Formik,
	Form,
	Field,
	ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Logo from '../../img/holidazelogo.png';
import { Link } from 'react-router-dom';
import {
	fetchSingleProfile,
	logInUser,
	registerUser,
} from '../../store/modules/profileSlice';

export default function AuthForm({ mode }) {
	const dispatch = useDispatch();
	useEffect(() => {}, []);

	const isLoggedIn = useSelector(
		(state) => state.auth.isLoggedIn
	);
	const user = useSelector(
		(state) => state.auth.user
	);
	const formTitle =
		mode === 'register'
			? 'Register an account'
			: isLoggedIn && user && user.name
			? `Welcome back, ${user.name}`
			: 'Sign in to your account';
	const submitButtonText =
		mode === 'register' ? 'Register' : 'Sign In';

	const initialValues = {
		email: '',
		password: '',
		...(mode === 'register' && {
			name: '',
			venueManager: '',
			avatarUrl: '',
		}),
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email')
			.matches(
				/^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/,
				'Invalid email domain. Must be @stud.noroff.no / @noroff.no'
			)
			.required(
				'Required - Only @stud.noroff.no/ @noroff.no'
			),
		password: Yup.string()
			.min(8, 'Minimum 8 characters')
			.required('Required'),
		...(mode === 'register' && {
			name: Yup.string().required('Required'),
			venueManager:
				Yup.string().required('Required'),
			avatarUrl: Yup.string().url('Invalid URL'),
		}),
	});

	const handleSubmit = async (
		values,
		{ setSubmitting, setErrors }
	) => {
		const data = {
			email: values.email,
			password: values.password,
		};
		if (mode === 'register') {
			data.name = values.name;
			data.venueManager =
				values.venueManager === 'true';
			data.avatar = values.avatarUrl;
			try {
				await dispatch(registerUser(data));
				dispatch(
					fetchSingleProfile(values.name, {})
				);
			} catch (error) {
				setErrors({
					generic:
						'Registration failed. Please try again.',
				});
			}
		} else {
			try {
				await dispatch(logInUser(data));
				dispatch(
					fetchSingleProfile(values.name, {})
				);
			} catch (error) {
				setErrors({
					generic:
						'Login failed. Please try again.',
				});
			}
		}
		setSubmitting(false);
	};
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
							{formTitle}
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{' '}
							<Link
								to={
									mode === 'register'
										? '/login'
										: '/register'
								}
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								{mode === 'register'
									? 'Sign in'
									: 'Register here'}
							</Link>
						</p>
					</div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form className="mt-8 space-y-6">
								<input
									type="hidden"
									name="remember"
									defaultValue="true"
								/>
								{mode === 'register' && (
									<>
										<div className="py-1">
											<ErrorMessage
												name="name"
												component="div"
												className="text-red-600 text-sm mt-1 mb-2"
											/>
											<label
												htmlFor="name"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Name
											</label>
											<Field
												id="name"
												name="name"
												type="text"
												autoComplete="name"
												required
												className="relative block w-full rounded-t-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												placeholder="Name"
											/>
										</div>
										<div className="py-1">
											<label
												htmlFor="avatar-url"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Avatar URL
											</label>
											<Field
												id="avatar-url"
												name="avatarUrl"
												type="text"
												autoComplete="off"
												className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												placeholder="Paste avatar URL"
											/>
										</div>
										<div className="py-1">
											<label
												htmlFor="venue-manager"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Venue Manager
											</label>
											<Field
												id="venue-manager"
												name="venueManager"
												as="select"
												required
												className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											>
												<option value="">
													Select Venue Manager
												</option>
												<option value="true">
													Yes
												</option>
												<option value="false">
													No
												</option>
											</Field>
										</div>
									</>
								)}
								<div className="py-1">
									<ErrorMessage
										name="email"
										component="div"
										className="text-red-600 text-sm mt-1 mb-2"
									/>
									<label
										htmlFor="email-address"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Email address
									</label>
									<Field
										id="email-address"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Email address"
									/>
								</div>
								<div className="py-1">
									<ErrorMessage
										name="password"
										component="div"
										className="text-red-600 text-sm mt-1 mb-2"
									/>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Password
									</label>
									<Field
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Password"
									/>
								</div>{' '}
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<Field
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
										{mode === 'register' ? (
											<Link
												to="/login"
												className="font-medium text-indigo-600 hover:text-indigo-500"
											>
												Sign in
											</Link>
										) : (
											<Link
												to="#"
												className="font-medium text-indigo-600 hover:text-indigo-500"
											>
												Forgot your password?
											</Link>
										)}
									</div>
								</div>
								<ErrorMessage
									name="generic"
									component="div"
									className="text-red-600 text-sm mt-1 mb-2"
								/>
								<div>
									<button
										type="submit"
										className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										{submitButtonText}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}
