import React from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Product.css";

const Product = (props) => {
  const { product, handleAddToCart } = props;
  const { img, name, price, ratings, seller } = product;
  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product-info">
        <p className="product-name">{name}</p>
        <p>Price: ${price}</p>
        <p>Manufracturer :{seller}</p>
        <p>Rating: {ratings} stars</p>
      </div>
      <button
        onClick={() => {
          handleAddToCart(product);
        }}
        className="btn-cart"
      >
        Add to Cart <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Product;
