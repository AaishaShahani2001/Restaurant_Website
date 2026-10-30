import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/cart-context'
import { formatPrice } from '../data/menu'

// Shared field styling for the delivery address.
const field =
  'w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-800 outline-none'

function Payment() {
  const { user } = useAuth()
  const { placeOrder } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  // Totals passed from the cart when checkout starts.
  const summary = location.state
  // Address fields start with the signed-in name when one is available.
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [postal, setPostal] = useState('')
  const [errors, setErrors] = useState({})

  // Guests sign in before they can pay.
  if (!user) return <Navigate to="/login" state={{ from: '/order' }} replace />
  // A direct visit with no cart totals goes back to the order page.
  if (!summary?.lines?.length) return <Navigate to="/order" replace />

  // Check the address, then save the order as cash on delivery.
  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    // Each address line is required before the order is placed.
    if (!name.trim()) next.name = 'Enter the name for this delivery.'
    if (!/^[0-9+\s()-]{7,}$/.test(phone.trim())) next.phone = 'Enter a valid phone number.'
    if (!street.trim()) next.street = 'Enter the street address.'
    if (!city.trim()) next.city = 'Enter the city.'
    if (!region.trim()) next.region = 'Enter the state.'
    if (!postal.trim()) next.postal = 'Enter the postal code.'
    setErrors(next)
    // Stop while any address line is missing.
    if (Object.keys(next).length > 0) return

    const firstName = user.name.split(' ')[0]
    // COD is the only method, so every placed order uses it.
    placeOrder(`Order received, ${firstName}. We'll start on it now.`, {
      email: user.email,
      lines: summary.lines,
      total: summary.total,
      payment: 'COD',
      address: {
        name: name.trim(),
        phone: phone.trim(),
        street: street.trim(),
        city: city.trim(),
        region: region.trim(),
        postal: postal.trim(),
      },
    })
    // Leave payment for the list of this account's orders.
    navigate('/my-orders', { replace: true })
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} noValidate>
        <h1 className="text-xl font-semibold">Delivery address</h1>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="delivery-name" className="text-sm text-neutral-700">
              Full name
            </label>
            <input id="delivery-name" value={name} onChange={(event) => setName(event.target.value)} className={`mt-1 ${field}`} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="delivery-phone" className="text-sm text-neutral-700">
              Phone
            </label>
            <input id="delivery-phone" value={phone} onChange={(event) => setPhone(event.target.value)} className={`mt-1 ${field}`} />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="delivery-street" className="text-sm text-neutral-700">
              Street address
            </label>
            <input id="delivery-street" value={street} onChange={(event) => setStreet(event.target.value)} className={`mt-1 ${field}`} />
            {errors.street && <p className="mt-1 text-xs text-red-500">{errors.street}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="delivery-city" className="text-sm text-neutral-700">
                City
              </label>
              <input id="delivery-city" value={city} onChange={(event) => setCity(event.target.value)} className={`mt-1 ${field}`} />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="delivery-region" className="text-sm text-neutral-700">
                State
              </label>
              <input id="delivery-region" value={region} onChange={(event) => setRegion(event.target.value)} className={`mt-1 ${field}`} />
              {errors.region && <p className="mt-1 text-xs text-red-500">{errors.region}</p>}
            </div>
            <div>
              <label htmlFor="delivery-postal" className="text-sm text-neutral-700">
                Postal code
              </label>
              <input id="delivery-postal" value={postal} onChange={(event) => setPostal(event.target.value)} className={`mt-1 ${field}`} />
              {errors.postal && <p className="mt-1 text-xs text-red-500">{errors.postal}</p>}
            </div>
          </div>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Payment method</h2>
        {/* COD stays selected because no other method is offered. */}
        <label className="mt-4 flex items-center gap-2 text-sm text-neutral-800">
          <input type="radio" name="payment" value="COD" checked onChange={() => {}} />
          Cash on delivery (COD)
        </label>
        <p className="mt-2 text-sm text-neutral-500">Pay with cash when the order arrives.</p>

        <button type="submit" className="mt-6 bg-tomato px-6 py-3 text-sm font-medium text-white">
          Place order
        </button>
      </form>

      <aside>
        <h2 className="text-xl font-semibold">Your order</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {summary.lines.map((line, index) => (
            <li key={`${line.name}-${index}`} className="flex justify-between gap-4">
              <span>
                {line.name} x {line.qty}
              </span>
              <span>{formatPrice(line.price * line.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-neutral-200 pt-3 text-sm">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(summary.subtotal)}</span>
          </p>
          <p className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{formatPrice(summary.delivery)}</span>
          </p>
          <p className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(summary.total)}</span>
          </p>
        </div>
      </aside>
    </section>
  )
}

export default Payment
