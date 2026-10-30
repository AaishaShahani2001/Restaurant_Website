import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart-context'

// Shared cart for the order page and the menu.
const CART_KEY = 'tomato_cart'
// Placed orders, kept so a signed-in user can open them later.
const ORDERS_KEY = 'tomato_orders'

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

// Load saved orders, or an empty list if storage is missing or invalid.
function readOrders() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)
  const [notice, setNotice] = useState('')
  const [orders, setOrders] = useState(readOrders)

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

  // Save the placed order, empty the cart, and keep the confirmation.
  function placeOrder(message, order) {
    // Store a signed-in checkout so My orders and the admin list can read it.
    if (order) {
      // New orders always start as Food Processing until an admin changes them.
      const next = [
        { id: String(Date.now()), at: new Date().toISOString(), ...order, status: 'Food Processing' },
        ...readOrders(),
      ]
      localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
      setOrders(next)
    }
    // Clear the bag after the order is kept.
    setItems([])
    setNotice(message)
  }

  // Write a new status onto one order so the customer page can show it.
  function updateOrderStatus(id, status) {
    const next = readOrders().map((order) => (order.id === id ? { ...order, status } : order))
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
    setOrders(next)
  }

  return (
    <CartContext.Provider
      value={{ items, count, notice, orders, addItem, setQty, changeQty, removeItem, placeOrder, updateOrderStatus }}
    >
      {children}
    </CartContext.Provider>
  )
}
