import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/cart-context'
import { formatPrice, menuItems, menuTypes } from '../data/menu'

function Menu() {
  const { addItem } = useCart()
  const [params] = useSearchParams()
  const [category, setCategory] = useState('')
  // Navbar search arrives as ?q= on this page.
  const query = (params.get('q') || '').toLowerCase()

  // Keep a dish when its type and name both match.
  const list = menuItems.filter((item) => {
    const typeOk = category === '' || item.category === category
    const searchOk = query === '' || item.name.toLowerCase().includes(query)
    return typeOk && searchOk
  })

  // Click the selected type again to show every dish.
  function chooseType(name) {
    if (category === name) {
      setCategory('')
    } else {
      setCategory(name)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-neutral-900">Explore our menu</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and
        elevate your dining experience, one delicious meal at a time.
      </p>

      {/* Round photos for each menu type. */}
      <div className="mt-8 flex gap-6 overflow-x-auto pb-2">
        {menuTypes.map((type) => (
          <button key={type.name} type="button" onClick={() => chooseType(type.name)} className="shrink-0 text-center">
            <img
              src={type.image}
              alt={type.name}
              className={`mx-auto h-24 w-24 rounded-full object-cover ${
                category === type.name ? 'border-4 border-tomato' : ''
              }`}
            />
            <span className="mt-2 block text-sm text-neutral-600">{type.name}</span>
          </button>
        ))}
      </div>

      <hr className="mt-6 border-neutral-200" />

      {/* No matches, or one card per dish. */}
      {list.length === 0 ? (
        <p className="mt-10 text-sm text-neutral-500">Nothing on the menu matches that search.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((item) => (
            <article key={item.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="relative">
                {/* The photo opens this dish. The plus button stays an add action. */}
                <Link to={`/food/${item.id}`}>
                  <img src={item.image} alt={item.name} className="h-40 w-full rounded-xl object-cover" />
                </Link>
                {/* Add this dish to the bag. */}
                <button
                  type="button"
                  onClick={() => addItem(item.id)}
                  aria-label={`Add ${item.name}`}
                  className="absolute right-3 bottom-3 grid h-8 w-8 place-items-center rounded-full bg-white text-xl leading-none text-neutral-700 shadow"
                >
                  +
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <h2 className="font-semibold text-neutral-900">
                  <Link to={`/food/${item.id}`}>{item.name}</Link>
                </h2>
                <span className="text-sm text-orange-500">{'★'.repeat(item.rating)}</span>
              </div>
              <p className="mt-1 text-sm text-neutral-500">{item.description}</p>
              <p className="mt-3 text-lg font-semibold text-tomato">{formatPrice(item.price)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Menu
