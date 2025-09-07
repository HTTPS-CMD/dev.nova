/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: "15px",
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "960px",
			xl: "1280px",
		},
		fontFamily: {
			primary: "var(--font-jetbrainsMono)",
		},
		extend: {
			colors: {
				primary: "#1c1c22",
				accent: {
					DEFAULT: "#00ff99",
					hover: "#00e187",
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

