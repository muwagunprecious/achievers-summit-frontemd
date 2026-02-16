import { NextResponse } from 'next/server';
import { sendTicketEmail } from '@/lib/email-service';
import { generateTicketPDF } from '@/lib/pdf-service';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
    }

    try {
        const dummyTicketId = 'TEST-TICKET-' + Math.floor(Math.random() * 1000);
        const dummyData = {
            fullName: 'Test User',
            ticketType: 'Regular',
            ticketPrice: 'NGN 5,000',
            ticketId: dummyTicketId
        };

        console.log('Generating dummy PDF for test email...');
        const pdfBuffer = await generateTicketPDF(dummyData);

        console.log(`Sending test email to ${email}...`);
        await sendTicketEmail({
            email,
            ...dummyData,
            pdfBuffer
        });

        return NextResponse.json({ message: 'Test email sent successfully' });
    } catch (error) {
        console.error('Test email failed:', error);
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}
