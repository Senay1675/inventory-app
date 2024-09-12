// Denna komponent gör det möjligt för en användare att skapa en ny , men bara om användaren är inloggad.
//  Komponenten använder en autentiseringstoken som den skickar med POST-förfrågan för att autentisera användaren.


"use client";

import { useAuth } from "@/context/auth";
import { useState } from "react";

function ItemForm() {
    const auth = useAuth();

    // State för att hålla formulärdata
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                name,
                description,
                quantity: parseInt(quantity, 10),
                category
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Item created:", data);

            // Återställ formuläret efter att item har skapats
            setName('');
            setDescription('');
            setQuantity(0);
            setCategory('');

            return;
        }

        // TODO: error handling
        console.error("Failed to create item");
    }

    if (!auth.token) {
        return (
            <div>
                You have to be logged in to create an item. :)
            </div>
        );
    }

    return (
        <div className="item-form-container">
            <h2>Create New Item</h2>
            <form className="item-form" onSubmit={handleSubmit}>
                <div className="item-form__group">
                    <label className="item-form__label">Name</label>
                    <input
                        className="item-form__input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="item-form__group">
                    <label className="item-form__label">Description</label>
                    <input
                        className="item-form__input"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="item-form__group">
                    <label className="item-form__label">Quantity</label>
                    <input
                        className="item-form__input"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="item-form__group">
                    <label className="item-form__label">Category</label>
                    <input
                        className="item-form__input"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button className="item-form__button" type="submit">
                    Create Item
                </button>
            </form>
        </div>
    );
}

export default ItemForm;
