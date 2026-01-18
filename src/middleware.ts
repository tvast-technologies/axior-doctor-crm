import { withAuth } from 'next-auth/middleware';
import paths from 'routes/paths';

export default withAuth({
  pages: {
    signIn: paths.defaultJwtLogin,
    signOut: paths.defaultLoggedOut,
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      if (
        pathname.startsWith('/anonymous-booking') ||
        pathname.startsWith('/authentication/default/jwt/login') ||
        pathname.startsWith('/authentication/default/jwt/login-doctor') ||
        pathname.startsWith('/authentication/default/logged-out')
      ) {
        return true;
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
