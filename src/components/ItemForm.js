"use client";

import { useAuth } from "@/context/auth";
import { useState } from "react";

function ItemForm({ fetchItems }) {
  const auth = useAuth();

  // State för att hålla formulärdata
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  // State för att hålla fält-specifika felmeddelanden
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Rensa tidigare felmeddelanden
    setNameError("");
    setDescriptionError("");
    setCategoryError("");
    setQuantityError("");

    // Validera fält
    let hasError = false;

    if (!name) {
      setNameError("A name is required");
      hasError = true;
    }
    if (!description) {
      setDescriptionError("A description is required");
      hasError = true;
    }
    if (!category) {
      setCategoryError("A Category is required");
      hasError = true;
    }
    if (!quantity) {
      setQuantityError("Quantity is required");
      hasError = true;
    }

    if (hasError) return; // Avbryt om det finns fel

    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name,
        description,
        quantity: parseInt(quantity, 10),
        category,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Item created:", data);

      // Återställ formuläret efter att item har skapats
      setName("");
      setDescription("");
      setQuantity(0);
      setCategory("");
      fetchItems();
    } else {
      // Hantera fel
      console.error("Failed to create item");
    }
  }

  if (!auth.token) {
    return <div>You have to be logged in to create an item. :)</div>;
  }

  return (
    <div className="item-form-container">
      <h2>Create New Item</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <div className="item-form__group">
          <label className="item-form__label">Name</label>
          <input
            className={`item-form__input ${nameError ? "error" : ""}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>
        <div className="item-form__group">
          <label className="item-form__label">Description</label>
          <input
            className={`item-form__input ${descriptionError ? "error" : ""}`}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}
        </div>
        <div className="item-form__group">
          <label className="item-form__label">Quantity</label>
          <input
            className={`item-form__input ${quantityError ? "error" : ""}`}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {quantityError && <p className="text-red-500">{quantityError}</p>}
        </div>
        <div className="item-form__group">
          <label className="item-form__label">Category</label>
          <input
            className={`item-form__input ${categoryError ? "error" : ""}`}
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {categoryError && <p className="text-red-500">{categoryError}</p>}
        </div>
        <button className="item-form__button" type="submit">
          Create Item
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
