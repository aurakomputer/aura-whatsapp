import { PrismaClient } from '@prisma/client'
import { cryptPassword } from '../src/server/helper/bcrypt.js'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'admin@admin.com' },
        update: {},
        create: {
            email: 'admin@admin.com',
            name: 'Superadmin',
            password: await cryptPassword('admin123'),
        },
    })
    console.log(user)
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
