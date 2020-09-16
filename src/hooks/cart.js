import React, { useCallback, createContext, useContext } from 'react'
import { useImmer } from 'use-immer'

import formatPrice from '../utils/formatPrice'

const CartContext = createContext()

const initialState = {
  items: [],
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useImmer(initialState);

  const addToCart = useCallback(
    (item) => {
      setCart(({ items }) => {
        const index = items.findIndex(
          product => product.id === item.id,
        );

        if (index < 0) {
          items.push({ 
            ...item, 
            quantity: 1 ,
            subTotal: formatPrice(item.price)
          });
        } else {
          items[index].quantity += 1;
          items[index].subTotal = formatPrice(item.price * (item.quantity + 1)) 
        }
      });
    },
    [setCart],
  );

  const takeOutInCart = useCallback(
    (item) => {
      setCart(({ items }) => {
        const index = items.findIndex(
          product => product.id === item.id
        )

        items[index].quantity -= 1;
        items[index].subTotal = formatPrice(item.price * (item.quantity - 1)) 


        if(items[index].quantity < 1) {
          items[index].quantity = 1
          items[index].subTotal = formatPrice(item.price) 
        }

      })
    },
    [setCart]
  )

  const removeInCart = useCallback(
    (item) => {
      setCart(({items}) => {
        const index = items.findIndex(
          product => product.id === item.id
        )

        items.splice(index, 1)
      })
    },
    [setCart]
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        takeOutInCart,
        removeInCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  const { cart, addToCart, takeOutInCart, removeInCart, setCart } = context
  return { cart, addToCart, takeOutInCart, removeInCart, setCart }
}

export default CartProvider
