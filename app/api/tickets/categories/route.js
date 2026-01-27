import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://achievers-summit-backend.vercel.app';

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/categories`);
        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('[Ticket Categories Proxy] Exception:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
