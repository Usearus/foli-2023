/** @type {import('tailwindcss').Config} */
module.exports = {
	// mode: 'jit',
	content: ['./src/**/*.{html,js,jsx}', './public/**/*.html'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],

	daisyui: {
		themes: ['light', 'dark'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors) If you're using a second CSS library that has similar class names, you can use this config to avoid conflicts. Utility classes like color names (e.g. bg-primary) or border-radius (e.g. rounded-box) will not be affected by this config because they're being added as extensions to Tailwind CSS classes. If you use daisyUI prefix option (like daisy-) and Tailwind CSS prefix option (like tw-) together, classnames will be prefixed like this: tw-daisy-btn.
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables. It may be useful to set this to e.g. *, so all components will have access to the required CSS variables.
	},
};
