import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');
        const name = searchParams.get('name') || query;

        if (!name && !query) {
            return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
        }

        // Search in EventTicket (legacy/flat structure)
        const eventTickets = await prisma.eventTicket.findMany({
            where: {
                OR: [
                    { fullName: { contains: name || '', mode: 'insensitive' } },
                    { ticketId: { contains: query || '', mode: 'insensitive' } },
                    { reference: { contains: query || '', mode: 'insensitive' } }
                ]
            },
            take: 5
        });

        if (eventTickets.length > 0) {
            return NextResponse.json(eventTickets);
        }

        // Fallback: Search in Normalized Ticket table
        const normalizedTickets = await prisma.ticket.findMany({
            where: {
                user: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            },
            include: {
                user: true,
                category: true
            },
            take: 1
        });

        if (normalizedTickets.length > 0) {
            const normalizedTicket = normalizedTickets[0];
            return NextResponse.json({
                ticketId: normalizedTicket.ticketNumber,
                fullName: normalizedTicket.user.name,
                email: normalizedTicket.user.email,
                phone: normalizedTicket.user.phone || '',
                ticketType: normalizedTicket.category.name,
                ticketPrice: normalizedTicket.category.price.toString(),
                reference: "INTERNAL",
                status: normalizedTicket.status,
                createdAt: normalizedTicket.createdAt
            });
        }

        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });

    } catch (error) {
        console.error("Error searching ticket:", error);
        return NextResponse.json(
            { error: "Failed to search ticket" },
            { status: 500 }
        );
    }
}
