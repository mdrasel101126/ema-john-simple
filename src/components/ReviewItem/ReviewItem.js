import React from "react";

const ReviewItem = ({ product }) => {
  console.log(product);
  const { name, quantity, price } = product;
  return (
    <div>
      <h1>This is Review Item</h1>
    </div>
  );
};

export default ReviewItem;
