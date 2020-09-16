import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { useCart } from "../../hooks/cart";
import axios from "axios";
import formatPrice from "../../utils/formatPrice";

import { Container } from "./styles";

const Detail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState({});
  const history = useHistory();

  const { cart, addToCart } = useCart();

  const id = match.params.id;

  useEffect(() => {
    axios.get(`http://localhost:3333/products/${id}`).then((response) => {
      const data = {
        ...response.data,
        priceFormatted: formatPrice(response.data.price),
      };

      setProduct(data);
    });
  }, []);

  const sendToCart = useCallback((product) => {
    addToCart(product);

    history.push("/cart");
  }, []);

  useEffect(() => {
    const quantityInCart = cart.items.find((item) => item.id === product.id);
    setQuantity(quantityInCart);
  }, [cart, product]);

  return (
    <Container>
      <div>
        <img src={product.image} alt={product.title} />
        <strong>{product.title}</strong>
        <span>{product.priceFormatted}</span>
        <div>
          <span>Descrição</span>
          <p>{product.description}</p>
        </div>
        <button type="button" onClick={() => sendToCart(product)}>
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
            {""}
            {quantity ? quantity.quantity : 0}
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </div>
    </Container>
  );
};

export default Detail;
