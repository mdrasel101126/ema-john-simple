import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cart from "../Cart/Cart";
import { addToDb, getSaveCart } from "../../utilities/fakedb";
import Product from "../Product/Product";
import "./Shop.css";
import { useLoaderData } from "react-router-dom";

/* 
count,:loaded
perPage (size):10
pages:count/perPage 
currentPage (page)
*/
const Shop = () => {
  /* const { products, count } = useLoaderData(); */
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/products?page=${page}&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);

  const pages = Math.ceil(count / size);
  useEffect(() => {
    const storedCart = getSaveCart();
    const saveCart = [];
    const ids = Object.keys(storedCart);
    console.log(ids);
    fetch(`http://localhost:5000/productsById`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        for (const id in storedCart) {
          const addedProduct = products.find((product) => product._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
          }
        }
        setCart(saveCart);
      });
  }, [products]);

  const handleAddToCart = (product) => {
    // console.log(product);
    let newCart;
    const exits = cart.find((p) => p._id === product._id);
    if (!exits) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      const rest = cart.filter((p) => p._id !== product._id);
      exits.quantity = exits.quantity + 1;
      newCart = [...rest, exits];
    }

    setCart(newCart);
    addToDb(product._id);
  };
  return (
    <div>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart}></Cart>
        </div>
      </div>
      <div className="pagination">
        <p>Currently Selected Page: {page}</p>
        {[...Array(pages).keys()].map((number) => (
          <button
            className={page === number ? "selected" : "undefined"}
            onClick={() => setPage(number)}
            key={number}
          >
            {number + 1}
          </button>
        ))}
        <select onChange={(event) => setSize(event.target.value)}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
