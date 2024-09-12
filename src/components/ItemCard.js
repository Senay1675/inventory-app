"use client";

function ItemCard({ item, onDelete }) {
  return (
    <div className="item-card">
      <div className="item-card__header">
        <h3 className="item-card__title">{item.name}</h3>
        <button
          className="item-card__delete-btn"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
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
    </div>
  );
}

export default ItemCard;
