import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://achievers-summit-backend.vercel.app';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get('reference');

        if (!reference) {
            return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
        }

        const response = await fetch(`${API_BASE_URL}/api/payments/status?reference=${reference}`);
        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Payment status error:', error);
        return NextResponse.json({ error: 'Failed to check payment status' }, { status: 500 });
    }
}
