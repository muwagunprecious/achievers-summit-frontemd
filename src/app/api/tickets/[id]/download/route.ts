import { generateTicketPdf } from "../../../../../lib/tickets/pdf";
import { getTicketByIdentifier } from "../../../../../lib/tickets/service";

function toFileNameSegment(value: string) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function GET(
  _request: Request,
  context: { params: { id: string } },
) {
  try {
    const ticket = await getTicketByIdentifier(context.params.id);

    if (!ticket) {
      return new Response(
        JSON.stringify({
          code: "TICKET_NOT_FOUND",
          error: "Ticket not found.",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        },
      );
    }

    const pdfBuffer = await generateTicketPdf({
      fullName: ticket.fullName,
      ticketId: ticket.ticketId,
      ticketPrice:
        ticket.ticketPrice > 0 ? `NGN ${ticket.ticketPrice.toLocaleString()}` : "FREE",
      ticketType: ticket.ticketType,
    });

    const fileName = `achievers-summit-pass-${toFileNameSegment(ticket.ticketId)}.pdf`;

    return new Response(pdfBuffer, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": String(pdfBuffer.length),
        "Content-Type": "application/pdf",
      },
      status: 200,
    });
  } catch (error) {
    const handledError = error as Error & { code?: string; status?: number };

    return new Response(
      JSON.stringify({
        code: handledError.code || "INTERNAL_ERROR",
        error: handledError.message || "Internal server error",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: handledError.status || 500,
      },
    );
  }
}
