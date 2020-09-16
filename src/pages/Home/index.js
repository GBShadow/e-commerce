import React, { useEffect, useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import axios from "axios";

import formatPrice from "../../utils/formatPrice";
import { useCart } from "../../hooks/cart";

import { ProductList } from "./styles";

const Home = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const { cart, addToCart } = useCart();

  useEffect(() => {
    axios.get("https://shadowshop.netlify.app/.netlify/functions/listProducts").then((response) => {
      const data = response.data.map((product) => ({
        ...product,
        id: product._id,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    });
  }, []);

  const sendToCart = useCallback((product) => {
    addToCart(product);

    history.push("/cart");
  }, []);

  return (
    <ProductList>
      {products.map((product) => {
        const itemInCart = cart.items.find((item) => item.id === product.id);

        return (
          <li key={product.id}>
          <Link to={`/detail/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
          </Link>
              <span>{product.priceFormatted}</span>
              <button type="button" onClick={() => sendToCart(product)}>
                <div>
                  <MdAddShoppingCart size={16} color="#fff" />
                  {""}
                  {itemInCart ? itemInCart.quantity : 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
        );
      })}
    </ProductList>
  );
};

export default Home;
