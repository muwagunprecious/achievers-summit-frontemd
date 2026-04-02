import { NextResponse } from "next/server";

import { initializeTransaction } from "../../../../lib/tickets/service";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const result = await initializeTransaction({
      amount: Number(body.amount),
      email: typeof body.email === "string" ? body.email : undefined,
      fullName: typeof body.fullName === "string" ? body.fullName : undefined,
      phone: typeof body.phone === "string" ? body.phone : undefined,
      reference: typeof body.reference === "string" ? body.reference : undefined,
      ticketSlug: typeof body.ticketSlug === "string" ? body.ticketSlug : undefined,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const handledError = error as Error & { code?: string; status?: number };

    return NextResponse.json(
      {
        code: handledError.code || "INTERNAL_ERROR",
        error: handledError.message || "Internal server error",
      },
      { status: handledError.status || 500 },
    );
  }
}
