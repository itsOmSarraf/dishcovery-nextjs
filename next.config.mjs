import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
	dest: 'public'
});

const nextConfig = {
	images: {
		domains: ['placeholder.com']
	}
};

export default withPWA(nextConfig);
