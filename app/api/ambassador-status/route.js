import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const statuses = await prisma.ambassadorStatus.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(statuses);
    } catch (error) {
        console.error('Error fetching ambassador statuses:', error);
        return NextResponse.json({ error: 'Failed to fetch statuses' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const status = await prisma.ambassadorStatus.create({
            data: {
                label: data.label,
                category: data.category,
                order: data.order || 0
            }
        });
        return NextResponse.json(status);
    } catch (error) {
        console.error('Error creating status:', error);
        return NextResponse.json({ error: 'Failed to create status' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const data = await req.json();
        const { id, ...updateData } = data;
        const status = await prisma.ambassadorStatus.update({
            where: { id },
            data: updateData
        });
        return NextResponse.json(status);
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await prisma.ambassadorStatus.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
