const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const economy = await prisma.ticketCategory.findUnique({
            where: { id: 'cat_economy' }
        });
        console.log(JSON.stringify(economy.features, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
check();
