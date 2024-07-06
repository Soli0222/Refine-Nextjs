import SpotifyProvider from "next-auth/providers/spotify";

interface Token {
  accessToken?: string;
  id?: string;
}

interface Account {
  access_token: string;
  providerAccountId: string;
}

interface Session {
  accessToken?: string;
  id?: string;
}

const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }: { token: Token; account?: Account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: Token }) {
      session.accessToken = token.accessToken;
      session.id = token.id;
      return session;
    }
  }
};

export default authOptions;