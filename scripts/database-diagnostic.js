const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const units = await prisma.volunteerUnit.findMany();
        const institutions = await prisma.institution.findMany();
        console.log('--- DATABASE CHECK ---');
        console.log('Units found:', units.length);
        console.log('Institutions found:', institutions.length);
        if (units.length > 0) {
            console.log('Sample unit:', units[0]);
        }
    } catch (e) {
        console.error('Database connection error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
