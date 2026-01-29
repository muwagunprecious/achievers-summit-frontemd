const { PrismaClient } = require('@prisma/client');

// Force the direct URL for testing
process.env.DATABASE_URL = "postgresql://postgres.fmftcjrjzlhtcjstvklu:dtee00DIgf5V2qnU@db.fmftcjrjzlhtcjstvklu.supabase.co:5432/postgres";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function testConnection() {
    try {
        console.log('Testing DIRECT connection to Supabase host...');
        console.log('Host: db.fmftcjrjzlhtcjstvklu.supabase.co');
        const userCount = await prisma.user.count();
        console.log('✅ DIRECT Connection Successful!');
        console.log('User Count:', userCount);
    } catch (error) {
        console.error('❌ DIRECT Connection Failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
