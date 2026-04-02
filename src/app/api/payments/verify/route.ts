import { NextResponse } from "next/server";

import { getTransactionStatus } from "../../../../lib/tickets/service";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const result = await getTransactionStatus(String(body.reference || ""));

    return NextResponse.json(result);
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
