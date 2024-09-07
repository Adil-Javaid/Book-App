import React from "react";
import { Book } from "../type"; // Use correct path for the Book type
import "./cart.css"; // Import the new CSS file
import { useNavigate } from "react-router-dom";

interface CartProps {
  cartItems: Book[];
  removeFromCart: (book: Book) => void
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
  console.log("Cart items:", cartItems);

  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/payment"); // Navigate to the payment page
  };

  const handleDelete = (book: Book) => {
    removeFromCart(book);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">No items in the cart.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((book, index) => (
            <li key={index} className="cart-item">
              <img
                src={book.coverImage}
                alt={book.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{book.title}</h3>
                <p className="cart-item-author">{book.author}</p>
                <p className="cart-item-price">PKR: {book.price}</p>
                <button className="buyButton" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button className="deleteButton" onClick={() => handleDelete(book)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
