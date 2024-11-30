import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./app/**/*.{js,jsx,ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}'
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: {
					DEFAULT: 'hsl(var(--border))',
					dark: 'hsl(var(--border-dark))'
				},
				input: {
					DEFAULT: 'hsl(var(--input))',
					dark: 'hsl(var(--input-dark))'
				},
				ring: {
					DEFAULT: 'hsl(var(--ring))',
					dark: 'hsl(var(--ring-dark))'
				},
				background: {
					DEFAULT: '#FFFFFF',
					dark: '#121212'
				},
				foreground: {
					DEFAULT: '#1A1A1A',
					dark: '#E5E5E5'
				},
				primary: {
					50: '#FFF7ED',
					100: '#FFEDD5',
					200: '#FED7AA',
					300: '#FDBA74',
					400: '#FB923C',
					500: '#F97316',
					600: '#EA580C',
					700: '#C2410C',
					800: '#9A3412',
					900: '#7C2D12',
					DEFAULT: '#FFEDD5',
					foreground: '#FFFFFF'
				},
				secondary: {
					50: '#FFFAF0', // Lightest orange tint
					100: '#FFEFD6',
					200: '#FFE0B2',
					300: '#FFD08A',
					400: '#FFC062',
					500: '#FFB039', // More saturated orange
					600: '#FF9811',
					700: '#F98307',
					800: '#E67002',
					900: '#CC5F00', // Darkest orange shade
					DEFAULT: '#F98307',
					foreground: '#FFFFFF'
				},
				info: {
					DEFAULT: '#0EA5E9',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#22C55E',
					foreground: '#FFFFFF'
				},
				warning: {
					DEFAULT: '#78350F',
					foreground: '#1A1A1A'
				},
				error: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-up': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-down': {
					from: {
						opacity: '1',
						transform: 'translateY(0)'
					},
					to: {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.3s ease-out',
				'fade-down': 'fade-down 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
};

export default config;
