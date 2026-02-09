import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://achievers-sum-backend.vercel.app';

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/community/ambassadors`);
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Ambassadors Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to fetch ambassadors' }, { status: 500 });
    }
}
