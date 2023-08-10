import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { pages } from "@/utils/authOption";

export const authOption: any = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "username",
          type: "text",
          required: true,
        },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;

        const res = await fetch(`${process.env.NEXTAUTH_URL}api/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          console.log("next auth user", user);
          return user;
        } else {
          return null;
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    signingKey: process.env.JWT_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      //console.log("token", session);
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      //console.log("token2", user);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages,
};
const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
