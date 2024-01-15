import { NextResponse } from 'next/server';

const isLoggedIn = false;

export function middleware(request) {
    const { pathname } = request.nextUrl;
    let cookie = request.cookies.get("authToken");

    if (cookie) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/connexion', request.url));

}

export const config = {
    matcher: ["/", "/user/:path*"]
}
