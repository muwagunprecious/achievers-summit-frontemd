import { NextResponse } from "next/server";

import { createTicketRegistration } from "../../../../lib/tickets/service";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const result = await createTicketRegistration({
      additionalAccessibility:
        typeof body.additionalAccessibility === "string"
          ? body.additionalAccessibility
          : undefined,
      city: typeof body.city === "string" ? body.city : undefined,
      country: typeof body.country === "string" ? body.country : undefined,
      disabilityTypes: Array.isArray(body.disabilityTypes)
        ? body.disabilityTypes.filter(
            (value): value is string => typeof value === "string",
          )
        : undefined,
      email: typeof body.email === "string" ? body.email : undefined,
      fullName: typeof body.fullName === "string" ? body.fullName : undefined,
      gender: typeof body.gender === "string" ? body.gender : undefined,
      otherDisability:
        typeof body.otherDisability === "string"
          ? body.otherDisability
          : undefined,
      paymentReference:
        typeof body.paymentReference === "string"
          ? body.paymentReference
          : undefined,
      personalAssistance:
        typeof body.personalAssistance === "string"
          ? body.personalAssistance
          : undefined,
      phone: typeof body.phone === "string" ? body.phone : undefined,
      sensoryDetails:
        typeof body.sensoryDetails === "string" ? body.sensoryDetails : undefined,
      sensoryRequirements:
        typeof body.sensoryRequirements === "boolean"
          ? body.sensoryRequirements
          : undefined,
      signLanguageRequired:
        typeof body.signLanguageRequired === "boolean"
          ? body.signLanguageRequired
          : undefined,
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
