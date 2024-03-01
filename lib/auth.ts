import { LoginForm } from "./../components/Login";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { createHash } from "crypto";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { username: credentials?.username },
        });
        if (!existingUser) {
          return null;
        }
        const providedPasswordHash = createHash("sha256")
          .update(credentials.password)
          .digest("hex");

        if (providedPasswordHash !== existingUser.password) {
          return null;
        }
        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id:user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };
      }
      return token;
    },

    async session({ session, user, token }) {
 
      return {
        ...session,
        user: {
          ...session.user,
          id:token.id,
          username: token.username,
          firstname: token.firstname,
          lastname: token.lastname,
          email: token.email,
        },
      };
    },
  },
};
