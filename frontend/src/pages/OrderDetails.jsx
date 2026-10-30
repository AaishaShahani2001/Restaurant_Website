import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/cart-context'
import { formatPrice, menuItems } from '../data/menu'

const deliveryFee = 5

function OrderDetails() {
  const { user } = useAuth()
  const { items, setQty, removeItem, notice } = useCart()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [promoOn, setPromoOn] = useState(false)
  const [promoNote, setPromoNote] = useState('')

  // Match each saved id with its dish, and skip any id that is gone.
  const lines = items
    .map((item) => {
      const dish = menuItems.find((entry) => entry.id === item.id)
      if (!dish) return null
      return { ...dish, qty: item.qty }
    })
    .filter(Boolean)

  // Subtotal is price times quantity. Promo code TOMATO drops the delivery fee.
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  const delivery = subtotal === 0 || promoOn ? 0 : deliveryFee
  const total = subtotal + delivery

  // Accept only the code tomato. Anything else is left unused.
  function applyPromo(event) {
    event.preventDefault()
    if (code.trim().toLowerCase() === 'tomato') {
      setPromoOn(true)
      setPromoNote('Promo applied. Delivery is free.')
    } else {
      setPromoOn(false)
      setPromoNote('That promo code is not valid.')
    }
  }

  // Guests go to log in first. Signed-in users continue to payment.
  function checkout() {
    if (!user) {
      navigate('/login', { state: { from: '/order' } })
      return
    }
    // Carry the current totals so the payment page can show the same amount.
    navigate('/payment', {
      state: {
        lines: lines.map((line) => ({ name: line.name, qty: line.qty, price: line.price })),
        subtotal,
        delivery,
        total,
      },
    })
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
      {/* After checkout, or when nothing was added, skip the table. */}
      {lines.length === 0 ? (
        <div>
          {notice && <p className="text-sm text-neutral-700">{notice}</p>}
          {!notice && <p className="text-sm text-neutral-500">Your cart is empty.</p>}
          <Link to="/menu" className="mt-4 inline-block text-sm font-semibold text-tomato">
            View Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead>
                <tr className="text-neutral-400">
                  <th className="pb-4 font-medium">Items</th>
                  <th className="pb-4 font-medium">Title</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Quantity</th>
                  <th className="pb-4 font-medium">Total</th>
                  <th className="pb-4 font-medium">Remove</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line) => (
                  <tr key={line.id} className="border-t border-neutral-200">
                    <td className="py-4">
                      <img src={line.image} alt="" className="h-12 w-12 rounded object-cover" />
                    </td>
                    <td className="py-4">{line.name}</td>
                    <td className="py-4">{formatPrice(line.price)}</td>
                    <td className="py-4">
                      {/* Keep the typed number when it is 1 or more. */}
                      <input
                        type="number"
                        min="1"
                        value={line.qty}
                        onChange={(event) => setQty(line.id, event.target.value)}
                        aria-label={`Quantity for ${line.name}`}
                        className="w-14 border border-neutral-300 px-2 py-1 text-center"
                      />
                    </td>
                    <td className="py-4">{formatPrice(line.price * line.qty)}</td>
                    <td className="py-4">
                      <button type="button" onClick={() => removeItem(line.id)} aria-label={`Remove ${line.name}`}>
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-2">
            <div className="max-w-sm">
              <h1 className="text-xl font-semibold">Cart Totals</h1>
              <div className="mt-4 space-y-3 border-b border-neutral-200 pb-3 text-sm">
                <p className="flex justify-between border-b border-neutral-200 pb-3">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </p>
                <p className="flex justify-between border-b border-neutral-200 pb-3">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(delivery)}</span>
                </p>
                <p className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={checkout}
                className="mt-6 bg-tomato px-6 py-3 text-sm font-medium text-white"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            <form onSubmit={applyPromo} className="lg:pt-16">
              <p className="text-sm text-neutral-600">If you have a promo code, Enter it here</p>
              <div className="mt-3 flex max-w-md">
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="promo code"
                  className="flex-1 bg-neutral-200 px-3 py-3 text-sm outline-none"
                />
                <button type="submit" className="bg-black px-8 py-3 text-sm text-white">
                  Submit
                </button>
              </div>
              {promoNote && <p className="mt-2 text-sm text-neutral-500">{promoNote}</p>}
            </form>
          </div>
        </>
      )}
    </section>
  )
}

export default OrderDetails
