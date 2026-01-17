const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
    try {
        console.log('Testing connection to Supabase...');
        const userCount = await prisma.user.count();
        console.log('✅ Connection Successful!');
        console.log('User Count:', userCount);
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
