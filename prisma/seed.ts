import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { jobs } from "../src/app/data/jobs";

const prisma = new PrismaClient();

async function seedJobs() {
  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: {
        title: job.title,
        type: job.type,
        location: job.location,
        schedule: job.schedule,
        description: job.description,
        requirements: job.requirements,
        applyUrl: job.applyUrl,
      },
      create: {
        slug: job.slug,
        title: job.title,
        type: job.type,
        location: job.location,
        schedule: job.schedule,
        description: job.description,
        requirements: job.requirements,
        applyUrl: job.applyUrl,
        published: true,
        publishedAt: new Date(),
      },
    });
  }
  console.log(`Seeded ${jobs.length} jobs.`);
}

async function seedInitialAdmin() {
  const email = process.env.INITIAL_ADMIN_EMAIL;
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("Skipping admin seed: INITIAL_ADMIN_EMAIL / INITIAL_ADMIN_PASSWORD not set.");
    return;
  }
  const existing = await prisma.user.count();
  if (existing > 0) {
    console.log(`Skipping admin seed: ${existing} user(s) already exist.`);
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, passwordHash, name: "Admin" },
  });
  console.log(`Created initial admin: ${email}`);
}

async function main() {
  await seedJobs();
  await seedInitialAdmin();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
