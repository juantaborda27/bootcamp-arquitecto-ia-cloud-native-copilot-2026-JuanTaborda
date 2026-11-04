import NextAuth from 'next-auth';

export const authOptions = {
  providers: [
    {
      id: 'oidc-provider',
      name: 'Global EDB OIDC Provider',
      type: 'oauth',
      version: '2.0',
      wellKnown: 'http://localhost:8000/.well-known/openid-configuration',
      authorization: { params: { scope: 'openid profile email' } },
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub || 'user_123',
          name: profile.name || profile.username,
          email: profile.email,
          role: profile.role || 'User',
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.accessToken = account?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
