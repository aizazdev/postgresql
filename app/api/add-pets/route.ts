import { NextRequest, NextResponse } from '@/node_modules/next/server';
import {sql} from '@vercel/postgres';

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const petName = searchParams.get('petName');
    const ownerName = searchParams.get('ownerName');

    try {
        if(!petName || !ownerName) throw new Error('pet and owner name required');
        await sql`INSERT INTO Pets (Name, Owner) VALUES  (${petName}, ${ownerName})`
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }

    const pets = await sql`SELECT * FROM Pets;`;
    return NextResponse.json({ pets }, { status: 200 });
}