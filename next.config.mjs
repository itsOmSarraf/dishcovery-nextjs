import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
	dest: 'public'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '50mb' // Adjust this value as needed
		}
	}
	// Add any other Next.js config options here
};

export default withPWA(nextConfig);
