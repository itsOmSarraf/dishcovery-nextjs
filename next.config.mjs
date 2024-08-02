// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
	dest: 'public'
});

export default withPWA({
	// Your Next.js config
});
