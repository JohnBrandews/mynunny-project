import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Ensure default admin exists (email: admin@mynunny.com, password: Admin123!)
  const email = 'admin@mynunny.com'
  const password = 'Admin123!'

  // Hash with same cost factor used by app (see src/lib/auth.ts -> 12 rounds)
  const hashedPassword = await bcrypt.hash(password, 12)

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      // Keep role enforced and password synced if changed in env/task
      role: UserRole.ADMIN,
      password: hashedPassword,
      verified: true,
      fullName: 'System Administrator',
      phone: '+254700000000',
      county: 'Nairobi',
      constituency: 'Westlands',
    },
    create: {
      email,
      username: 'admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
      fullName: 'System Administrator',
      phone: '+254700000000',
      idNumber: '00000000',
      county: 'Nairobi',
      constituency: 'Westlands',
      verified: true,
    },
  })

  console.log('Admin user ensured:', { id: admin.id, email: admin.email, role: admin.role })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
