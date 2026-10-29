import { useState } from 'react'

// Sample order shown on the orders screen.
const order = {
  items: 'Greek salad x 2, Peri Peri Rolls x 3',
  count: 2,
  total: 65,
  name: 'Avinash Kumar',
  address: 'GreatStack, Whitefield,\nBangalore, Karnataka, 560066, 560066',
  phone: '9876543210',
}

// Status choices for the order dropdown.
const statuses = ['Food Processing', 'Out for delivery', 'Delivered']

function AllOrders() {
  // Start on the status shown in the panel.
  const [status, setStatus] = useState(statuses[0])

  return (
    <div>
      <h2 className="text-base font-medium text-neutral-800">Order Page</h2>
      <article className="mt-4 flex flex-wrap items-start gap-6 border border-neutral-300 bg-white p-4 sm:gap-10">
        <div className="flex min-w-[220px] flex-1 gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center text-[#e07a2f]" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 8.2 12 4l9 4.2v9.2L12 21.5 3 17.4V8.2Zm9 1.3L6.2 7.4 12 4.8l5.8 2.6L12 9.5ZM5 9.6l6 2.7v6.7l-6-2.7V9.6Zm14 0v6.7l-6 2.7v-6.7l6-2.7Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm text-neutral-800">{order.items}</p>
            <p className="mt-3 text-sm font-semibold text-neutral-900">{order.name}</p>
            <p className="mt-1 whitespace-pre-line text-sm text-neutral-600">{order.address}</p>
            <p className="mt-3 text-sm text-neutral-800">{order.phone}</p>
          </div>
        </div>
        <p className="text-sm text-neutral-800">Items : {order.count}</p>
        <p className="text-sm text-neutral-800">${order.total}</p>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Order status"
          className="rounded border border-[#f0d2c2] bg-[#fff1ea] px-3 py-2 text-sm text-neutral-800 outline-none"
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </article>
    </div>
  )
}

export default AllOrders
