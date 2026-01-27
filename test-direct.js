const { PrismaClient } = require('@prisma/client');

async function test() {
    const url = "postgresql://postgres.fmftcjrjzlhtcjstvklu:dtee00DIgf5V2qnU@aws-1-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1";
    console.log("Testing with URL:", url);
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: url
            }
        }
    });

    try {
        const result = await prisma.$queryRaw`SELECT 1 as result`;
        console.log("✅ Connection Successful!", result);
    } catch (err) {
        console.error("❌ Connection Failed:", err.message);
    } finally {
        await prisma.$disconnect();
    }
}

test();
