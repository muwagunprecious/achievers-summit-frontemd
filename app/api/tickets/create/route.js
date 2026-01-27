import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://achievers-summit-backend.vercel.app';

export async function POST(request) {
    try {
        const body = await request.json();

        console.log('[Ticket Create Proxy] Forwarding to:', `${API_BASE_URL}/api/tickets/create`);

        const response = await fetch(`${API_BASE_URL}/api/tickets/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[Ticket Create Proxy] Error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('[Ticket Create Proxy] Exception:', error);
        return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
    }
}
