/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#1A202C', // Primary color: for buttons, links, and calls to action.
				secondary: '#F56565', // Secondary color: for highlighting important information or elements.
				accent: '#48BB78', // Accent color: for error messages, warnings, or alerts.
				neutral1: '#F7FAFC', // Neutral color 1: for backgrounds, borders, or text
				neutral2: '#718096', // Neutral color 2: for navigation menus, footers, or other secondary elements.
			},
			fontFamily: {
				lato: ['Lato', 'sans-serif'], // Add this line to define the custom font
			},
		},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
	],
	darkMode: 'class',
};
