import { getSaveCart } from "../utilities/fakedb";

export const ProductAndCartLoader = async () => {
  //get products
  const productsData = await fetch("http://localhost:5000/products");
  const { count, products } = await productsData.json();
  //get cart
  const saveCart = getSaveCart();
  const previousCart = [];
  for (const id in saveCart) {
    const addedProduct = products.find((product) => product._id === id);
    if (addedProduct) {
      const quantity = saveCart[id];
      addedProduct.quantity = quantity;
      previousCart.push(addedProduct);
    }
  }

  return { count, products, previousCart };
};
