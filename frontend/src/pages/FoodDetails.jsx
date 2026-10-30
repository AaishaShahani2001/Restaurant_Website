import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useCart } from '../context/cart-context'
import { formatPrice, menuItems } from '../data/menu'

function FoodDetails() {
  const { id } = useParams()
  const { addItem } = useCart()
  // Match the address id to one dish. A bad id stays empty.
  const food = menuItems.find((item) => item.id === id)

  // Put the dish name in the browser tab while this page is open.
  useEffect(() => {
    if (!food) return
    document.title = `${food.name} · Tomato.`
  }, [food])

  // Unknown ids go back to the menu instead of an empty page.
  if (!food) return <Navigate to="/menu" replace />

  // Add this dish to the bag. The menu plus button does the same thing.
  function addToCart() {
    addItem(food.id)
  }

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-6 lg:grid-cols-2">
      <img src={food.image} alt={food.name} className="h-80 w-full rounded-2xl object-cover" />
      <div>
        <p className="text-sm text-neutral-500">{food.category}</p>
        <h1 className="mt-2 text-4xl font-semibold text-neutral-900">{food.name}</h1>
        <p className="mt-2 text-orange-500">{'★'.repeat(food.rating)}</p>
        <p className="mt-4 max-w-md text-neutral-600">{food.description}</p>
        <p className="mt-4 text-2xl font-semibold text-tomato">{formatPrice(food.price)}</p>
        <button type="button" onClick={addToCart} className="mt-6 bg-tomato px-6 py-3 text-sm font-medium text-white">
          Add to cart
        </button>
        <Link to="/menu" className="mt-4 block text-sm font-semibold text-tomato">
          Back to menu
        </Link>
      </div>
    </section>
  )
}

export default FoodDetails
