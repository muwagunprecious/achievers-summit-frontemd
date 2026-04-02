import { NextResponse } from "next/server";

import { getTicketByIdentifier } from "../../../../lib/tickets/service";

export async function GET(
  _request: Request,
  context: { params: { id: string } },
) {
  try {
    const ticket = await getTicketByIdentifier(context.params.id);

    if (!ticket) {
      return NextResponse.json(
        { code: "TICKET_NOT_FOUND", error: "Ticket not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(ticket);
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
