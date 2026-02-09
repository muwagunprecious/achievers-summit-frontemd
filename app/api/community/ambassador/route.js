import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://achievers-summit-backend.vercel.app';

export async function POST(req) {
    try {
        const body = await req.json();

        const response = await fetch(`${API_BASE_URL}/api/community/ambassador`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Ambassador Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
}
