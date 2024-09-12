"use client";

import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { useAuth } from "@/context/auth"; // Använd ditt auth context

function ItemList() {
  const [items, setItems] = useState([]);
  const auth = useAuth(); // Hämta token från auth context

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data);
    }
    fetchItems();
  }, []);

  async function handleDelete(itemId) {
    console.log("TEST");
    try {
      const response = await fetch(
        `http://localhost:3002/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Använd token från auth context
          },
        }
      );

      if (response.ok) {
        // Uppdatera listan genom att ta bort det borttagna itemet från state
        setItems(items.filter((item) => item.id !== itemId));
      } else {
        // Hantera fel
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default ItemList;
