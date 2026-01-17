const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateNominationSchema() {
    try {
        console.log('Adding new columns to Nomination table...');

        // Using raw SQL to add columns since Prisma push is failing
        await prisma.$executeRaw`
            ALTER TABLE "Nomination" 
            ADD COLUMN IF NOT EXISTS "nomineeWhatsApp" TEXT,
            ADD COLUMN IF NOT EXISTS "nomineeTwitter" TEXT,
            ADD COLUMN IF NOT EXISTS "nomineeLinkedIn" TEXT,
            ADD COLUMN IF NOT EXISTS "nomineeInstagram" TEXT;
        `;

        console.log('✅ Nomination table updated successfully!');
        console.log('New fields added:');
        console.log('  - nomineeWhatsApp');
        console.log('  - nomineeTwitter');
        console.log('  - nomineeLinkedIn');
        console.log('  - nomineeInstagram');

    } catch (error) {
        console.error('❌ Error updating schema:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateNominationSchema();
