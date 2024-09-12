"use client";

import { useState } from "react";

function ItemCard({ item, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSaveClick() {
    onUpdate(item.id, updatedItem);
    setIsEditing(false);
  }

  return (
    <div className="item-card">
      {isEditing ? (
        <div className="item-card__edit-form">
          <h3 className="item-card__title">Edit Item</h3>
          <input
            type="text"
            name="name"
            value={updatedItem.name}
            onChange={handleInputChange}
            className="item-card__input"
          />
          <input
            type="text"
            name="description"
            value={updatedItem.description}
            onChange={handleInputChange}
            className="item-card__input"
          />
          <input
            type="number"
            name="quantity"
            value={updatedItem.quantity}
            onChange={handleInputChange}
            className="item-card__input"
          />
          <input
            type="text"
            name="category"
            value={updatedItem.category}
            onChange={handleInputChange}
            className="item-card__input"
          />
          <div className="item-card__buttons">
            <button className="item-card__save-btn" onClick={handleSaveClick}>
              Save
            </button>
            <button
              className="item-card__cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="item-card__details">
          <h3 className="item-card__title">{item.name}</h3>
          <p className="item-card__detail">
            <span className="item-card__label">Description:</span>{" "}
            {item.description}
          </p>
          <p className="item-card__detail">
            <span className="item-card__label">Quantity:</span> {item.quantity}
          </p>
          <p className="item-card__detail">
            <span className="item-card__label">Category:</span> {item.category}
          </p>
          <div className="item-card__buttons">
            <button className="item-card__edit-btn" onClick={handleEditClick}>
              Edit
            </button>
            <button
              className="item-card__delete-btn"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
