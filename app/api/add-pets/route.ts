import { NextRequest, NextResponse } from '@/node_modules/next/server';
import { sql } from '@vercel/postgres';
import { db, petsTable } from '../../lib/drizzle';

export async function GET(request: NextRequest) {
    const res = await db.select().from(petsTable);
    
    return NextResponse.json( res , { status: 200 });
}

export async function POST(request: NextRequest) {
    const req = await request.json();

    try {
        if (req.Name && req.Owner) {
            await sql`insert into Pets(Name, Owner) VALUES(${req.Name}, ${req.Owner})`
            console.log("req data", req);
            return NextResponse.json({ message: 'data added successfully' });
        } else {
            throw new Error("Pet Name, Owner Name is required");
        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message });
    }
}