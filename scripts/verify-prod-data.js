const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres.fmftcjrjzlhtcjstvklu:dtee00DIgf5V2qnU@13.43.174.140:5432/postgres?sslmode=require"
        }
    }
});

async function verifyData() {
    try {
        console.log('--- Database Verification ---');
        const userCount = await prisma.user.count();
        console.log('User Count:', userCount);

        const categoryCount = await prisma.ticketCategory.count();
        console.log('TicketCategory Count:', categoryCount);

        if (categoryCount > 0) {
            const categories = await prisma.ticketCategory.findMany();
            console.log('Categories:', categories.map(c => c.name));
        } else {
            console.log('⚠️ TicketCategory table is EMPTY.');
        }

    } catch (error) {
        console.error('❌ Diagnostic failed:');
        console.error(error.message);
        if (error.code) console.error('Code:', error.code);
    } finally {
        await prisma.$disconnect();
    }
}

verifyData();
