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
