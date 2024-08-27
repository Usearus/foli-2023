/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}', './public/**/*.html'],
	plugins: [require('daisyui')],
	theme: {
		extend: {
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
		themes: [
			{
				dark: {
					primary: '#793ef9',
					'primary-focus': '#570df8',
					'primary-content': '#ffffff',
					secondary: '#f000b8',
					'secondary-focus': '#bd0091',
					'secondary-content': '#ffffff',
					accent: '#37cdbe',
					'accent-focus': '#2aa79b',
					'accent-content': '#ffffff',
					neutral: '#2a2e37',
					'neutral-focus': '#16181d',
					'neutral-content': '#ffffff',
					'base-100': '#3d4451',
					'base-200': '#2a2e37',
					'base-300': '#16181d',
					'base-content': '#ebecf0',
					info: '#66c6ff',
					success: '#87d039',
					warning: '#e2d562',
					error: '#ff6f6f',
				},
			},
			'light',
		],

		// themes: ['light', 'dark'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors) If you're using a second CSS library that has similar class names, you can use this config to avoid conflicts. Utility classes like color names (e.g. bg-primary) or border-radius (e.g. rounded-box) will not be affected by this config because they're being added as extensions to Tailwind CSS classes. If you use daisyUI prefix option (like daisy-) and Tailwind CSS prefix option (like tw-) together, classnames will be prefixed like this: tw-daisy-btn.
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables. It may be useful to set this to e.g. *, so all components will have access to the required CSS variables.
	},
};