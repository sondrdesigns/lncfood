import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const [, , rawEmail, password, rawName] = process.argv;

  if (!rawEmail || !password) {
    console.error("Usage: tsx scripts/create-admin.ts <email> <password> [name]");
    process.exit(1);
  }

  const email = rawEmail.trim().toLowerCase();
  const name = rawName?.trim() || "Admin";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.error(`A user with email ${email} already exists (id: ${existing.id}). Aborting.`);
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  console.log(`Created admin ${user.email} (id: ${user.id}).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
