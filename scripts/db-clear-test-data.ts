import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const before = {
    users: await prisma.user.count(),
    jobs: await prisma.job.count(),
    applications: await prisma.application.count(),
    partnerApplications: await prisma.partnerApplication.count(),
  };
  console.log("Before:", before);

  const apps = await prisma.application.deleteMany({});
  const partners = await prisma.partnerApplication.deleteMany({});
  const jobs = await prisma.job.deleteMany({});

  console.log(`Deleted ${apps.count} Application rows.`);
  console.log(`Deleted ${partners.count} PartnerApplication rows.`);
  console.log(`Deleted ${jobs.count} Job rows.`);

  const after = {
    users: await prisma.user.count(),
    jobs: await prisma.job.count(),
    applications: await prisma.application.count(),
    partnerApplications: await prisma.partnerApplication.count(),
  };
  console.log("After:", after);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
