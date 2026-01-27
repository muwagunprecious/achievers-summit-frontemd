const { PrismaClient } = require('@prisma/client');

const urls = [
    "postgresql://postgres.fmftcjrjzlhtcjstvklu:dtee00DIgf5V2qnU@aws-1-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1",
    "postgresql://postgres.fmftcjrjzlhtcjstvklu:dtee00DIgf5V2qnU@aws-1-eu-west-2.pooler.supabase.com:5432/postgres",
    "postgresql://postgres.mrswfnmpmhbufhorutew:IglooEstate2026%21@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1",
    "postgresql://postgres.mrswfnmpmhbufhorutew:IglooEstate2026%21@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
];

async function runTests() {
    for (const url of urls) {
        console.log(`\nTesting connection to: ${url}`);
        const prisma = new PrismaClient({
            datasources: { db: { url } }
        });

        try {
            const start = Date.now();
            await prisma.$connect();
            await prisma.$queryRaw`SELECT 1`;
            console.log(`✅ Success in ${Date.now() - start}ms`);
            await prisma.$disconnect();
            // If one succeeds, we might want to stop, but it's better to see all for stability.
        } catch (err) {
            console.log(`❌ Error: ${err.message.split('\n')[0]}`);
            await prisma.$disconnect();
        }
    }
}

runTests();
