import { useCart } from '../../context/cart-context'
import { formatPrice } from '../../data/menu'

// Status choices for each order dropdown.
const statuses = ['Food Processing', 'Out for delivery', 'Delivered']

function AllOrders() {
  const { orders, updateOrderStatus } = useCart()

  return (
    <div>
      <h2 className="text-base font-medium text-neutral-800">Order Page</h2>
      {/* Nothing to manage until a customer places an order. */}
      {orders.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500">No orders yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {orders.map((order) => {
            // Turn each dish line into the short text shown on the card.
            const items = (order.lines || []).map((line) => `${line.name} x ${line.qty}`).join(', ')
            const address = order.address
            return (
              <article key={order.id} className="flex flex-wrap items-start gap-6 border border-neutral-300 bg-white p-4 sm:gap-10">
                <div className="flex min-w-[220px] flex-1 gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center text-[#e07a2f]" aria-hidden="true">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 8.2 12 4l9 4.2v9.2L12 21.5 3 17.4V8.2Zm9 1.3L6.2 7.4 12 4.8l5.8 2.6L12 9.5ZM5 9.6l6 2.7v6.7l-6-2.7V9.6Zm14 0v6.7l-6 2.7v-6.7l6-2.7Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-neutral-800">{items}</p>
                    <p className="mt-3 text-sm font-semibold text-neutral-900">{address?.name || order.email}</p>
                    {/* Skip the address block when an older order has none. */}
                    {address && (
                      <p className="mt-1 whitespace-pre-line text-sm text-neutral-600">
                        {`${address.street},\n${address.city}, ${address.region}, ${address.postal}`}
                      </p>
                    )}
                    {address?.phone && <p className="mt-3 text-sm text-neutral-800">{address.phone}</p>}
                  </div>
                </div>
                <p className="text-sm text-neutral-800">Items : {(order.lines || []).length}</p>
                <p className="text-sm text-neutral-800">{formatPrice(order.total)}</p>
                <select
                  value={order.status || statuses[0]}
                  onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                  aria-label={`Status for ${address?.name || order.email}`}
                  className="rounded border border-[#f0d2c2] bg-[#fff1ea] px-3 py-2 text-sm text-neutral-800 outline-none"
                >
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AllOrders
