import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { db, NewTodo, todoTable } from '../../lib/drizzle';
import { eq, lt, gte, ne } from "drizzle-orm";
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  const result = await db.select().from(todoTable);
  return NextResponse.json( result , { status: 200 });
}

export async function POST(request: NextRequest) {
  const req = await request.json();
 
  const newTodo: NewTodo = {
    title: req.title,
    description: req.description,
    status: req.status
  }
 
  const result = await db.insert(todoTable).values(newTodo).returning();
  return new NextResponse(result);
}

export async function PUT(request: NextRequest) {
  const req = await request.json();

  const updateTodo =  await db.update(todoTable)
    .set({ title: req.title, status: req.status })
    .where(eq(todoTable.id, req.id))
    .returning({
      title: todoTable.title,

    })

  return NextResponse.json(updateTodo)
}

export async function DELETE(request: NextRequest) {
  const url = request.url;
  const urlSearchParams = new URLSearchParams(new URL(url).search);
  const idValue = urlSearchParams.get("id");
  console.log('id value',idValue);  
  const deleteTodo = await db.delete(todoTable).where(eq(todoTable.id, idValue)).returning(); 
  console.log('delete', deleteTodo);
  
  return NextResponse.json(deleteTodo);
}





