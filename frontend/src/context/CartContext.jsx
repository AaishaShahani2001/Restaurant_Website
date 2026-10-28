/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Shared cart for the order page and the menu.
const CartContext = createContext(null)
const CART_KEY = 'tomato_cart'

// Keep only bag lines that still have an id and a quantity above zero.
function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && typeof item.id === 'string' && Number(item.qty) > 0)
      .map((item) => ({ id: item.id, qty: Number(item.qty) }))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)
  const [notice, setNotice] = useState('')

  // Write the bag back to storage whenever its lines change.
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  // Badge count is the sum of every line quantity.
  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])

  // Add a new line, or increase one that is already in the cart.
  function addItem(id) {
    setNotice('')
    setItems((current) => {
      const found = current.find((item) => item.id === id)
      if (found) {
        return current.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
      }
      return [...current, { id, qty: 1 }]
    })
  }

  // Replace a line quantity. Ignore blank or zero so typing does not delete the row.
  function setQty(id, qty) {
    const next = Number(qty)
    if (!next || next < 1) return
    setItems((current) => current.map((item) => (item.id === id ? { ...item, qty: next } : item)))
  }

  // Change a quantity and drop the line when it reaches zero.
  function changeQty(id, delta) {
    setNotice('')
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    )
  }

  // Remove one dish and clear any leftover order message.
  function removeItem(id) {
    setNotice('')
    setItems((current) => current.filter((item) => item.id !== id))
  }

  // Empty the cart and keep the confirmation for the order page.
  function placeOrder(message) {
    setItems([])
    setNotice(message)
  }

  return (
    <CartContext.Provider
      value={{ items, count, notice, addItem, setQty, changeQty, removeItem, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Fail loudly if a screen reads the bag outside the provider.
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
