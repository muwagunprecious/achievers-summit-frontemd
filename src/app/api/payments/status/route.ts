import { NextResponse } from "next/server";

import { getTransactionStatus } from "../../../../lib/tickets/service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference") || "";
    const result = await getTransactionStatus(reference);

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
