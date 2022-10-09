import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cart from "../Cart/Cart";
import { addToDb, getSaveCart } from "../../utilities/fakedb";
import Product from "../Product/Product";
import "./Shop.css";
import { useLoaderData } from "react-router-dom";

const Shop = () => {
  const { products } = useLoaderData();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = getSaveCart();
    const saveCart = [];
    //console.log(storedCart);
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        saveCart.push(addedProduct);
      }
    }
    setCart(saveCart);
  }, [products]);

  const handleAddToCart = (product) => {
    console.log(product);
    let newCart;
    const exits = cart.find((p) => p.id === product.id);
    if (!exits) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      const rest = cart.filter((p) => p.id !== product.id);
      exits.quantity = exits.quantity + 1;
      newCart = [...rest, exits];
    }

    setCart(newCart);
    addToDb(product.id);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
