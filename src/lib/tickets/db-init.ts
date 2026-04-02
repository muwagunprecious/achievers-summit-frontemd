import { Client } from "pg";

let initialized = false;

export async function ensureTicketDatabase() {
  if (initialized) {
    return;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const client = new Client({
    connectionString,
    ssl: connectionString.startsWith("postgres")
      ? { rejectUnauthorized: false }
      : undefined,
  });
  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Transaction" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "reference" TEXT NOT NULL UNIQUE,
        "email" TEXT NOT NULL,
        "fullName" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "amount" DOUBLE PRECISION NOT NULL,
        "ticketSlug" TEXT NOT NULL DEFAULT '',
        "ticketType" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "provider" TEXT NOT NULL DEFAULT 'PAYSTACK',
        "metadata" JSONB,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "EventTicket" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "ticketId" TEXT NOT NULL UNIQUE,
        "ticketSlug" TEXT NOT NULL DEFAULT '',
        "ticketType" TEXT NOT NULL,
        "ticketPrice" TEXT NOT NULL,
        "fullName" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "reference" TEXT NOT NULL UNIQUE,
        "status" TEXT NOT NULL DEFAULT 'VALID',
        "gender" TEXT,
        "city" TEXT,
        "country" TEXT,
        "disabilityTypes" TEXT,
        "otherDisability" TEXT,
        "signLanguageRequired" BOOLEAN NOT NULL DEFAULT false,
        "personalAssistance" TEXT,
        "sensoryRequirements" BOOLEAN NOT NULL DEFAULT false,
        "sensoryDetails" TEXT,
        "additionalAccessibility" TEXT,
        "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(
      `ALTER TABLE "Transaction" ADD COLUMN IF NOT EXISTS "ticketSlug" TEXT NOT NULL DEFAULT '';`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "ticketSlug" TEXT NOT NULL DEFAULT '';`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "gender" TEXT;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "city" TEXT;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "country" TEXT;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "disabilityTypes" TEXT;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "otherDisability" TEXT;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "signLanguageRequired" BOOLEAN NOT NULL DEFAULT false;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "personalAssistance" TEXT;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "sensoryRequirements" BOOLEAN NOT NULL DEFAULT false;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "sensoryDetails" TEXT;`,
    );
    await client.query(
      `ALTER TABLE "EventTicket" ADD COLUMN IF NOT EXISTS "additionalAccessibility" TEXT;`,
    );
  } finally {
    await client.end();
  }

  initialized = true;
}
