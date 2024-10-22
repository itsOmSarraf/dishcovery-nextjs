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
					50: '#E8F5E9',
					100: '#C8E6C9',
					200: '#A5D6A7',
					300: '#81C784',
					400: '#66BB6A',
					500: '#4CAF50', // DEFAULT
					600: '#43A047',
					700: '#388E3C',
					800: '#2E7D32',
					900: '#1B5E20',
					DEFAULT: '#4CAF50',
					foreground: '#FFFFFF'
				},
				secondary: {
					50: '#FFFDE7',
					100: '#FFF9C4',
					200: '#FFF59D',
					300: '#FFF176',
					400: '#FFEE58',
					500: '#FFEB3B', // DEFAULT
					600: '#FDD835',
					700: '#FBC02D',
					800: '#F9A825',
					900: '#F57F17',
					DEFAULT: '#FFEB3B',
					foreground: '#1A1A1A'
				},
				accent: {
					50: '#EDE7F6',
					100: '#D1C4E9',
					200: '#B39DDB',
					300: '#9575CD',
					400: '#7E57C2',
					500: '#673AB7', // DEFAULT - Deep Purple
					600: '#5E35B1',
					700: '#512DA8',
					800: '#4527A0',
					900: '#311B92',
					DEFAULT: '#673AB7',
					foreground: '#FFFFFF'
				},
				info: {
					50: '#E3F2FD',
					100: '#BBDEFB',
					200: '#90CAF9',
					300: '#64B5F6',
					400: '#42A5F5',
					500: '#2196F3', // DEFAULT
					600: '#1E88E5',
					700: '#1976D2',
					800: '#1565C0',
					900: '#0D47A1',
					DEFAULT: '#2196F3',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#4CAF50',
					foreground: '#FFFFFF'
				},
				warning: {
					DEFAULT: '#FF9800',
					foreground: '#1A1A1A'
				},
				error: {
					DEFAULT: '#F44336',
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
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
};

export default config;
