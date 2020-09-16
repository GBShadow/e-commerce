import React, { useMemo, useCallback } from "react";

import formatPrice from "../../utils/formatPrice";

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from "react-icons/md";

import { useCart } from "../../hooks/cart";

import { Container, ProductTable, Total } from "./styles";

const Cart = () => {
  const { cart, setCart, addToCart, takeOutInCart, removeInCart } = useCart();

  const total = useMemo(() => {
    return formatPrice(
      cart.items.reduce((total, item) => {
        return (total += item.quantity * item.price);
      }, 0)
    );
  }, [cart]);

  const finalizeSale = useCallback(() => {
    const option = confirm(
      `O Valor total da sua compra é de ${total}, aperte OK para finalizar sua compra.`
    );
    if (option == true) {
      setCart(({ items }) => {
        items.splice(0, items.length);
      });
      alert('Compra realizada com sucesso!')
    }
  }, [total]);

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.items.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      onClick={() => takeOutInCart(product)}
                    >
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={product.quantity} />
                    <button type="button" onClick={() => addToCart(product)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subTotal}</strong>
                </td>
                <td>
                  <button type="button" onClick={() => removeInCart(product)}>
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button" onClick={finalizeSale}>
          Finalizar produto
        </button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
