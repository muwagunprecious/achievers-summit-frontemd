import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const categories = await prisma.ticketCategory.findMany({
            where: {
                NOT: {
                    id: {
                        in: ['regular-pass', 'cat_regular']
                    }
                }
            },
            orderBy: {
                price: 'asc'
            },
            include: {
                _count: {
                    select: { tickets: true }
                }
            }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Failed to fetch ticket categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
