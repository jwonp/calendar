import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user?: {
      docId?: string | null;
      id: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      picture?: string | null;
    };
  }
}
