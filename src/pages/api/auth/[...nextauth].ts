import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CognitoProvider from "next-auth/providers/cognito";
import { randomBytes, randomUUID } from "crypto";
import axios from "axios";
import { UserDetail } from "@/types/dto";
import { User } from "@/types/dao";

export const authOptions: AuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //       // provider: "google",
    //     };
    //   },
    // }),
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER as string,
      idToken: true,
      checks: "nonce",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          docId: profile.docId,
        };
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },

  jwt: {
    secret: process.env.SECRET,
  },

  pages: {
    // signIn: "/auth/signin", // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: "/auth/new-user", // If set, new users will be directed here on first sign in
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return process.env.FRONTEND_END_POINT as string;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("token");
      console.log(token);

      const userDetail = await axios
        .get<UserDetail>(
          `${process.env.BACKEND_END_POINT}/users/user/${token.sub}`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        });

      if (session && session.user) {
        session.user.id = userDetail.id;
        session.user.docId = userDetail.docId;
      }
      console.log("session");
      console.log(session);
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log("user");
      console.log(user);
      console.log(
        `Authorization : ${account?.token_type} ${account?.access_token}`
      );
      if (!user.name || !user.email || !user.image) {
        return;
      }
      const userDetail: Omit<User, "docId" | "friends"> = {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.image,
      };
      await axios.post(
        `${process.env.BACKEND_END_POINT}/users/user`,
        userDetail,
        {
          headers: {
            Authorization: `${account?.token_type} ${account?.access_token}`,
          },
        }
      );

      /* on successful sign in */
    },
    //   async signOut(message) { /* on signout */ },
    //   async createUser(message) { /* user created */ },
    //   async updateUser(message) { /* user updated - e.g. their email was verified */ },
    //   async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message: any) {},
  },

  debug: false,
};

export default NextAuth(authOptions);
