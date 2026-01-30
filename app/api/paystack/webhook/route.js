import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { generateTicketPDF } from '@/lib/pdf-service';
import { sendTicketEmail } from '@/lib/email-service';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req) {
    try {
        const body = await req.json();
        const signature = req.headers.get('x-paystack-signature');

        // Verify signature
        const hash = crypto
            .createHmac('sha512', PAYSTACK_SECRET_KEY)
            .update(JSON.stringify(body))
            .digest('hex');

        if (hash !== signature) {
            console.error('Invalid Paystack signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = body.event;
        const data = body.data;

        if (event === 'charge.success') {
            const { reference, customer, metadata } = data;
            const { fullName, phone, ticketType } = metadata || {};

            console.log(`Payment successful for reference: ${reference}`);

            // 1. Check if ticket already exists with this reference to avoid duplicates
            let ticket = await prisma.eventTicket.findFirst({
                where: { reference }
            });

            if (ticket) {
                console.log('Ticket already exists for this reference');
                return NextResponse.json({ message: 'Ticket already exists' });
            }

            // 2. Get Ticket Category
            const category = await prisma.ticketCategory.findFirst({
                where: { name: ticketType }
            });

            if (!category) {
                console.error(`Invalid ticket category: ${ticketType}`);
                return NextResponse.json({ error: 'Invalid ticket category' }, { status: 400 });
            }

            // 3. Generate Unique Ticket ID
            const generateTicketId = () => {
                const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
                return `AS2026-${randomPart}`;
            };

            let ticketId = generateTicketId();
            let isUnique = false;
            let retries = 0;

            while (!isUnique && retries < 5) {
                const check = await prisma.eventTicket.findUnique({ where: { ticketId } });
                if (!check) isUnique = true;
                else {
                    ticketId = generateTicketId();
                    retries++;
                }
            }

            // 4. Create Ticket Record in DB
            ticket = await prisma.eventTicket.create({
                data: {
                    fullName: fullName || customer.first_name + ' ' + customer.last_name,
                    email: customer.email,
                    phone: phone || '',
                    ticketType: category.name,
                    ticketPrice: String(category.price),
                    ticketId,
                    reference: reference,
                    status: 'VALID',
                    purchaseDate: new Date(),
                },
            });

            // 4b. Update Transaction Status in DB
            console.log(`Updating transaction status to SUCCESS for: ${reference}`);
            try {
                await prisma.transaction.update({
                    where: { reference },
                    data: { status: 'SUCCESS' }
                });
            } catch (transactionError) {
                console.error('Failed to update transaction status:', transactionError);
                // We don't return error here because the ticket was already created
            }

            // 5. Generate PDF
            console.log('Generating PDF for:', ticketId);
            const pdfBuffer = await generateTicketPDF({
                fullName: ticket.fullName,
                ticketType: category.name,
                ticketPrice: `NGN ${category.price.toLocaleString()}`,
                ticketId
            });

            // 6. Send Email
            console.log('Sending email to:', ticket.email);
            try {
                await sendTicketEmail({
                    email: ticket.email,
                    fullName: ticket.fullName,
                    ticketType: category.name,
                    ticketId,
                    pdfBuffer
                });
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Email delivery failed:', emailError);
            }

            return NextResponse.json({ message: 'Webhook processed successfully' });
        }

        return NextResponse.json({ message: 'Event not handled' });

    } catch (error) {
        console.error('Paystack webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
