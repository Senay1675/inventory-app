"use client";

import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { useAuth } from "@/context/auth"; // Använd ditt auth context
import ItemForm from "./ItemForm";

function ItemList() {
  const [items, setItems] = useState([]);
  const auth = useAuth(); // Hämta token från auth context

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const response = await fetch("/api/items");
    const data = await response.json();
    setItems(data);
  }

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
          cache: "no-cache",
        }
      );

      if (response.ok) {
        // Uppdatera listan genom att ta bort det borttagna itemet från state

        fetchItems();
      } else {
        // Hantera fel
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function handleUpdate(itemId, updatedItem) {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // Använd token från auth context
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        fetchItems(); // Uppdatera listan efter uppdatering
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <ItemForm fetchItems={fetchItems} />
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default ItemList;
