require('dotenv').config({ path: 'backend/.env' });
const { PrismaClient } = require('@prisma/client');
console.log("Using DATABASE_URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function test() {
    try {
        console.log("Attempting prisma.ticketCategory.findMany...");
        const result = await prisma.ticketCategory.findMany({
            where: { status: 'ACTIVE' },
            orderBy: { price: 'asc' }
        });
        console.log("✅ Success!", JSON.stringify(result, null, 2));
    } catch (err) {
        console.error("❌ Error details:");
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

test();
