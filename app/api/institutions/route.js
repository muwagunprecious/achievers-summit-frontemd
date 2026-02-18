import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const institutions = await prisma.institution.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(institutions);
    } catch (error) {
        console.error('Error fetching institutions:', error);
        return NextResponse.json({ error: 'Failed to fetch institutions' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const inst = await prisma.institution.create({
            data: {
                name: data.name,
                isLagos: data.isLagos !== undefined ? data.isLagos : true,
                order: data.order || 0
            }
        });
        return NextResponse.json(inst);
    } catch (error) {
        console.error('Error creating institution:', error);
        return NextResponse.json({ error: 'Failed to create institution' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const data = await req.json();
        const { id, ...updateData } = data;
        const inst = await prisma.institution.update({
            where: { id },
            data: updateData
        });
        return NextResponse.json(inst);
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await prisma.institution.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
