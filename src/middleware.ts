export { auth as middleware } from '@/auth';
export const config = {
	matcher: ['/api/auth/:path*'] // Apply middleware only to the auth routes
};
