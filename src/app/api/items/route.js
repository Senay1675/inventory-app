import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; 

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Hämta alla items från databasen
    const items = await prisma.item.findMany();
    
    // Returnera items som JSON-respons
    return NextResponse.json(items);
  } catch (error) {
    // Hantera eventuella fel
    return NextResponse.json({ error: 'There is no items to retrieve' }, { status: 500 });
  }
}





export async function POST(req) {
  try {
    // Extrahera data från POST-förfrågan
    const { name, description, quantity, category } = await req.json();

    // Validera indata
    if (!name || !description || quantity === undefined || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Skapa nytt item i databasen
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        quantity: parseInt(quantity, 10),
        category,
      },
    });

    // Returnera det skapade itemet som JSON
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    // Hantera eventuella fel
    return NextResponse.json({ error: 'Unable to create item' }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, description, quantity, category } = await req.json();

    // Validera att ID och andra fält är korrekt
    if (!id || isNaN(parseInt(id, 10))) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    if (!name || !description || quantity === undefined || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Uppdatera item i databasen
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        quantity: parseInt(quantity, 10),
        category,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}
