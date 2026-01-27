import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://achievers-summit-backend.vercel.app';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        console.log('[Ticket Search Proxy] Searching for:', query);

        const response = await fetch(`${API_BASE_URL}/api/tickets/search?query=${encodeURIComponent(query || '')}`);
        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('[Ticket Search Proxy] Exception:', error);
        return NextResponse.json({ error: 'Failed to search tickets' }, { status: 500 });
    }
}
