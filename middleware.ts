import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes
    if (path.startsWith('/admin')) {
      if (token?.role !== Role.ADMIN) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    // Business routes
    if (path.startsWith('/business/dashboard') || path.startsWith('/business/listings')) {
      if (token?.role !== Role.BUSINESS && token?.role !== Role.ADMIN) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    // User dashboard
    if (path.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Public routes
        if (
          path.startsWith('/auth') ||
          path === '/' ||
          path.startsWith('/search') ||
          path.startsWith('/business/') && !path.includes('dashboard')
        ) {
          return true;
        }

        // Protected routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/business/dashboard/:path*',
    '/business/listings/:path*',
    '/admin/:path*',
    '/bookings/:path*',
    '/messages/:path*',
  ],
};
