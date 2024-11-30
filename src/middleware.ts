import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const session = await auth();

	if (!session && request.nextUrl.pathname.startsWith('/dishcover')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dishcover/:path*']
};
