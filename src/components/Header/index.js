import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdShoppingBasket } from 'react-icons/md'

import { useCart } from '../../hooks/cart'

import { Container, Cart } from './styles'

const Header = () => {
  const { cart } = useCart()

 const totalInCart = useMemo(() => {
   return cart.items.reduce((total, item) => {
      return total += item.quantity 
   }, 0)
  }, [cart])

  return (
    <Container>
      <div>
        <Link to="/">ShopApp</Link>
      </div>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{totalInCart} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  )
}

export default Header
