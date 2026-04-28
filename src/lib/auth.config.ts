import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;
      if (path === "/admin/login") return true;
      if (path.startsWith("/admin")) return isLoggedIn;
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = (user as { id?: string }).id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
