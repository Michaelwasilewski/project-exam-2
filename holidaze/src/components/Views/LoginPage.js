import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] =
		useState(false);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleRememberMeChange = (e) => {
		setRememberMe(e.target.checked);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
	};

	const StyledInput = tw.input`
    w-full
    py-2 px-4
    border
    border-gray-400
    rounded
    mb-4
  `;

	const StyledButton = tw.button`
    w-full
    py-2 px-4
    bg-blue-500
    text-white
    rounded
    hover:bg-blue-700
  `;

	const StyledCheckbox = tw.input`
    mr-2
  `;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">
				Login to your account
			</h1>
			<form onSubmit={handleSubmit}>
				<StyledInput
					type="email"
					placeholder="Email"
					value={email}
					onChange={handleEmailChange}
				/>
				<StyledInput
					type="password"
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<div className="flex items-center mb-4">
					<StyledCheckbox
						type="checkbox"
						id="rememberMe"
						checked={rememberMe}
						onChange={handleRememberMeChange}
					/>
					<label htmlFor="rememberMe">
						Remember me
					</label>
				</div>
				<StyledButton type="submit">
					Login
				</StyledButton>
			</form>
			<p className="text-sm mt-4">
				Don't have an account?{' '}
				<Link
					to="/register"
					className="text-blue-500"
				>
					Register now
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
