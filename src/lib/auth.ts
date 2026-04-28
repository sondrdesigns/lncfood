import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";
import { applyLoginRateLimit } from "./rate-limit";

class RateLimitError extends CredentialsSignin {
  code = "rate_limited";
}

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw, request) {
        const email = String(raw?.email ?? "").trim().toLowerCase();
        const password = String(raw?.password ?? "");
        if (!email || !password) return null;

        const fwd = request.headers.get("x-forwarded-for");
        const ip = fwd?.split(",")[0]?.trim() || "unknown";
        const allowed = await applyLoginRateLimit(`${ip}:${email}`);
        if (!allowed) throw new RateLimitError();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new InvalidCredentialsError();

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) throw new InvalidCredentialsError();

        return { id: user.id, email: user.email, name: user.name ?? null };
      },
    }),
  ],
});
