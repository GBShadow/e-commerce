import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import CartProvider from './hooks/cart'

import GlobalStyle from './styles/global'
import Header from './components/Header'
import Routes from './routes'

const App= () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
