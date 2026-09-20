import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const agregar = (producto) => {
    setItems(prev => {
      const existe = prev.find(i => i.id === producto.id)
      if (existe) {
        return prev.map(i =>
          i.id === producto.id
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const eliminar = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const reducir = (id) => {
    setItems(prev => {
      return prev
        .map(i => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i)
        .filter(i => i.cantidad > 0)
    })
  }

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0)

  const totalPrecio = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0)

  return (
    <CartContext.Provider value={{
      items, agregar, eliminar, reducir, totalItems, totalPrecio
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

export default CartContext