import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/cart-context'
import { formatPrice } from '../data/menu'

function MyOrders() {
  const { user } = useAuth()
  const { orders } = useCart()

  // Guests go to log in, then come back to this page.
  if (!user) return <Navigate to="/login" state={{ from: '/my-orders' }} replace />

  // Show only the orders placed with this account.
  const mine = orders.filter((order) => order && order.email === user.email)

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-neutral-900">My orders</h1>
      {mine.length === 0 ? (
        <div>
          <p className="mt-4 text-sm text-neutral-500">You have no orders yet.</p>
          <Link to="/menu" className="mt-4 inline-block text-sm font-semibold text-tomato">
            View the menu
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {mine.map((order) => (
            <li key={order.id} className="rounded-lg border border-neutral-200 p-4">
              <p className="text-sm text-neutral-500">{new Date(order.at).toLocaleString()}</p>
              <ul className="mt-2 space-y-1 text-sm text-neutral-800">
                {order.lines.map((line, index) => (
                  <li key={`${order.id}-${index}`}>
                    {line.name} x {line.qty}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-semibold">{formatPrice(order.total)}</p>
              {/* Status comes from the admin orders list. New orders start as Food Processing. */}
              <p className="mt-1 text-sm font-medium text-neutral-800">{order.status || 'Food Processing'}</p>
              {/* Older orders have no address, so this line stays off for them. */}
              {order.address && (
                <p className="mt-1 text-sm text-neutral-600">
                  {order.address.street}, {order.address.city}, {order.address.region} {order.address.postal}
                </p>
              )}
              {order.payment === 'COD' && <p className="mt-1 text-sm text-neutral-600">Cash on delivery</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default MyOrders
