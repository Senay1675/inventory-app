import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // Validera ID
    if (!id || isNaN(parseInt(id, 10))) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
  try {
    // Ta bort item från databasen
    console.log("DELETED ID", id);
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "item not found" }, { status: 404 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, description, quantity, category } = await req.json();

    // Validera att ID och andra fält är korrekt
    if (!id || isNaN(parseInt(id, 10))) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    if (!name || !description || quantity === undefined || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
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
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}
