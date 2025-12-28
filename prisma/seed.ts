import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default admin user
  const passwordHash = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@havenbridge.com' },
    update: {},
    create: {
      email: 'admin@havenbridge.com',
      fullName: 'System Administrator',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Created admin user:', admin);
  console.log('\nDefault Admin Credentials:');
  console.log('Email: admin@havenbridge.com');
  console.log('Password: admin123');
  console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
