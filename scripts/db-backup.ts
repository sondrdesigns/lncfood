import { PrismaClient } from "@prisma/client";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const prisma = new PrismaClient();

async function main() {
  const [users, jobs, applications, partnerApplications] = await Promise.all([
    prisma.user.findMany(),
    prisma.job.findMany(),
    prisma.application.findMany(),
    prisma.partnerApplication.findMany(),
  ]);

  const backup = {
    takenAt: new Date().toISOString(),
    counts: {
      users: users.length,
      jobs: jobs.length,
      applications: applications.length,
      partnerApplications: partnerApplications.length,
    },
    data: { users, jobs, applications, partnerApplications },
  };

  const dir = join(process.cwd(), "backups");
  mkdirSync(dir, { recursive: true });
  const stamp = backup.takenAt.replace(/[:.]/g, "-");
  const file = join(dir, `db-backup-${stamp}.json`);
  writeFileSync(file, JSON.stringify(backup, null, 2));

  console.log(`Backup written: ${file}`);
  console.log(`Counts: ${JSON.stringify(backup.counts)}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
