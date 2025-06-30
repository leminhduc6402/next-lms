import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sendRequest } from "./lib/api";
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
        
        if (res.statusCode === 201) {
          return {
            _id: res.data?.user?._id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            image: res.data?.user?.image || null,
            role: res.data?.user?.role,
            access_token: res.data?.access_token,
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
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
  },
});
