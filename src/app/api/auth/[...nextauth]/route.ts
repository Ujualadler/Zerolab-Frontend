import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "177672774302-ombec3k2f8sg70lj775dj1v2m7719ebv.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn Callback: User", user);
      console.log("first");
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect Callback: URL", url, "BaseURL", baseUrl);
      //   return url.startsWith(baseUrl) ? url : baseUrl;
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.user = token.user!;
      console.log("Session Callback: Session User", session.user);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT Callback: User", user);
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }
      console.log("JWT Callback: Token after processing", token);
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
