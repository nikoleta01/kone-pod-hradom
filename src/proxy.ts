import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. Same runtime, same API.
export default createMiddleware(routing);

export const config = {
  // Skip static assets, API routes and Next internals.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};
