/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			'londrina': ['Londrina Solid'] 
		},
	},
	daisyui: {
		themes: ["light"],
	},
	plugins: [require('daisyui')]
};
