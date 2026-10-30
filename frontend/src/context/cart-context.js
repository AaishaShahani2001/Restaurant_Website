import { createContext, useContext } from 'react'

// One shared cart object for the provider and every screen that reads it.
export const CartContext = createContext(null)

// Fail loudly if a screen reads the bag outside the provider.
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
