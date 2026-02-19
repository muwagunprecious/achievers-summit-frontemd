require('dotenv').config();
const { PrismaClient } = require('../../node_modules/@prisma/client');

console.log('🔌 DB Config URL:', process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:[^:@/]+@/, ':***@') : 'UNDEFINED');

const globalForPrisma = global;

const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

module.exports = db;