import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Hämta alla items från databasen
    const items = await prisma.item.findMany();

    // Returnera items som JSON-respons
    return NextResponse.json(items);
  } catch (error) {
    // Hantera eventuella fel
    return NextResponse.json(
      { error: "There is no items to retrieve" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Extrahera data från POST-förfrågan
    const { name, description, quantity, category } = await req.json();

    // Validera indata
    if (!name || !description || quantity === undefined || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
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
    return NextResponse.json(
      { error: "Unable to create item" },
      { status: 500 }
    );
  }
}
