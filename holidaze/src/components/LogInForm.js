import React from 'react';
import {
	Formik,
	Form,
	Field,
	ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

function LoginForm() {
	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required')
			.matches(
				/@stud\.noroff\.no$/,
				'Email must be @stud.noroff.no'
			),
		password: Yup.string().required(
			'Password is required'
		),
	});

	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-10 rounded-lg shadow-md flex justify-between w-4/5">
				<div className="w-2/5">
					<img
						src="https://via.placeholder.com/300x300"
						alt="placeholder"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="w-3/5 pl-10">
					<h1 className="text-3xl font-bold mb-10">
						Log in
					</h1>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{({ errors, touched }) => (
							<Form>
								<div className="mb-5">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="email"
									>
										Email
									</label>
									<Field
										className={
											touched.email &&
											errors.email
												? 'border-red-500 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
												: 'appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										}
										name="email"
										type="email"
										placeholder="Email"
									/>
									<ErrorMessage
										name="email"
										component="div"
										className="text-red-500 text-sm mt-1"
									/>
								</div>
								<div className="mb-5">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="password"
									>
										Password
									</label>
									<Field
										className={
											touched.password &&
											errors.password
												? 'border-red-500 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
												: 'appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										}
										name="password"
										type="password"
										placeholder="Password"
									/>
									<ErrorMessage
										name="password"
										component="div"
										className="text-red-500 text-sm mt-1"
									/>
								</div>
								<button
									type="submit"
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>
									Log in
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default LoginForm;
