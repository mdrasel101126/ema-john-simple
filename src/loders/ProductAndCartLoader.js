import { getSaveCart } from "../utilities/fakedb";

export const ProductAndCartLoader = async () => {
  //get products
  const productsData = await fetch("products.json");
  const products = await productsData.json();
  //get cart
  const saveCart = getSaveCart();
  const previousCart = [];
  for (const id in saveCart) {
    const addedProduct = products.find((product) => product.id === id);
    if (addedProduct) {
      const quantity = saveCart[id];
      addedProduct.quantity = quantity;
      previousCart.push(addedProduct);
    }
  }

  return { products, previousCart };
};
