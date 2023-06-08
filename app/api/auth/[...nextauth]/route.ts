import NextAuth from "next-auth";
import type { User } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/requests/auth";
import UserModel from "@/lib/mongo/models/User";
import mongoConnect from "@/lib/mongo/mongoConnect";

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
        // await mongoConnect();
        // const user = await UserModel.findOne({
        //   username: credentials.username,
        // });
        // console.log("user", user);
        // if (credentials.username === "Yevhen") {
        //   console.log("true");
        //   return user as User;
        // }

        const res = await fetch("http://localhost:3000/api/login", {
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

        // const { username, password } = credentials;
        // console.log("next auth", username, password);
        // const user = await User.findOne({ username });
        // const res = login({
        //   username: credentials.username,
        //   password: credentials.password,
        // });
        // const res = await fetch("/api/login", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = res;
        // console.log(user);

        // if (user) {
        //   return user;
        // }

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
  pages: {
    signIn: "/",
  },
};
const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
