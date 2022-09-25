import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  console.log(cart);
  let totalPrice = 0;
  let totalShipping = 0;
  let tax = 0;
  let grandTotal = 0;
  for (let product of cart) {
    totalPrice = totalPrice + product.price;
    totalShipping = totalShipping + product.shipping;
    tax = parseFloat((totalPrice * 0.1).toFixed(2));
    grandTotal = totalPrice + totalShipping + tax;
  }
  return (
    <div className="cart">
      <h3>Order Summary</h3>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping: ${totalShipping}</p>
      <p>Tax:${tax}</p>
      <h4>Grand Total:${grandTotal}</h4>
    </div>
  );
};

export default Cart;
