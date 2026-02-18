import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const units = await prisma.volunteerUnit.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(units);
    } catch (error) {
        console.error('Error fetching units:', error);
        return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const unit = await prisma.volunteerUnit.create({
            data: {
                section: data.section,
                name: data.name,
                order: data.order || 0
            }
        });
        return NextResponse.json(unit);
    } catch (error) {
        console.error('Error creating unit:', error);
        return NextResponse.json({ error: 'Failed to create unit' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const data = await req.json();
        const { id, ...updateData } = data;
        const unit = await prisma.volunteerUnit.update({
            where: { id },
            data: updateData
        });
        return NextResponse.json(unit);
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await prisma.volunteerUnit.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
