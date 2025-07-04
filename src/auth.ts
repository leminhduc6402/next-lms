import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sendRequest } from "./lib/api/api";
import {
  AccountNotVerifiedError,
  InvalidEmailPasswordError,
} from "./lib/errors";
import { IUser } from "./types/next-auth";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await sendRequest<IBackendRes<ISignin>>({
          url: `${[process.env.NEXT_PUBLIC_API_URL]}/api/v1/auth/login`,
          method: "POST",
          body: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });
        const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;
        const expiresAt = Date.now() + FIFTEEN_MINUTES_IN_MS;
        if (res.statusCode === 201) {
          return {
            _id: res.data?.user?._id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            image: res.data?.user?.image || null,
            role: res.data?.user?.role,
            access_token: res.data?.access_token,
            expires_at: expiresAt,
          };
        } else if (res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (res.statusCode === 400) {
          throw new AccountNotVerifiedError();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
        const userExpiresAt = (user as any).expires_at;
        if (userExpiresAt) {
          token.exp = Math.floor(userExpiresAt / 1000);
        } else {
          token.exp = Math.floor(Date.now() / 1000) + 15 * 60;
        }
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      if (token.exp) {
        session.access_expire = new Date(token.exp * 1000).toISOString();
      } else {
        session.access_expire = new Date(
          Date.now() + 15 * 60 * 1000
        ).toISOString();
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
  },
});
