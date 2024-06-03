import type { NextAuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: 'keyboard',
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(`http://localhost:3002/api/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (res.status === 401) {
          return null;
        }

        const userSession = await res.json();
        const id = userSession.user._id;
        const name = userSession.user.fullname;
        const userDetails: User = { id, name, email };
        return userDetails;
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
