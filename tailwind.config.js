/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}', './public/**/*.html'],
	plugins: [require('daisyui')],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			animation: {
				'fade-in': 'fadeIn 300ms ease-out forwards',
				'scale-in': 'scaleIn 300ms ease-out forwards',
				'fade-out': 'fadeOut 300ms ease-out forwards',
				'scale-out': 'scaleOut 300ms ease-out forwards',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				fadeOut: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				scaleOut: {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.9)', opacity: '0' },
				},
			},
		},
	},
	daisyui: {
		// false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		themes: [
			{
				customLight: {
					primary: '#7241C1',
					'primary-content': '#ede9fe',
					secondary: '#624b63',
					'secondary-content': '#f3f4f6',
					accent: '#10b981',
					'accent-content': '#1f2937',
					neutral: '#d1d1d1', //darkest
					'neutral-content': '#414141',
					'base-100': '#f3f3f3', //dark
					'base-200': '#ebebeb', //light
					'base-300': '#e0e0e0', //lightest (Background)   DARKEST TEST
					'base-content': '#242424',
					info: '#33b2cc',
					'info-content': '#000c11',
					success: '#44C13C',
					'success-content': '#050d00',
					warning: '#FFCF0F',
					'warning-content': '#160800',
					error: '#FF513A',
					'error-content': '#ffd7d3',
				},
			},
			{
				customDark: {
					primary: '#7241C1',
					'primary-content': '#ede9fe',
					secondary: '#624b63',
					'secondary-content': '#f3f4f6',
					accent: '#10b981',
					'accent-content': '#1f2937',
					neutral: '#434b53', //lightest
					'neutral-content': '#cdcdcd',
					'base-100': '#2e363d', //light
					'base-200': '#232930', //dark
					'base-300': '#1B2127', //darkest (Background)
					'base-content': '#d1cdd3',
					info: '#33b2cc',
					'info-content': '#000c11',
					success: '#44C13C',
					'success-content': '#050d00',
					warning: '#FFCF0F',
					'warning-content': '#160800',
					error: '#FF513A',
					'error-content': '#ffd7d3',
				},
			},
		],

		darkTheme: 'customDark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors) If you're using a second CSS library that has similar class names, you can use this config to avoid conflicts. Utility classes like color names (e.g. bg-primary) or border-radius (e.g. rounded-box) will not be affected by this config because they're being added as extensions to Tailwind CSS classes. If you use daisyUI prefix option (like daisy-) and Tailwind CSS prefix option (like tw-) together, classnames will be prefixed like this: tw-daisy-btn.
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables. It may be useful to set this to e.g. *, so all components will have access to the required CSS variables.
	},
};
