import { useState } from 'react'
import { menuTypes } from '../../data/menu'

// Category names from the restaurant menu.
const categories = menuTypes.map((type) => type.name)

function AddForm({ onAdd }) {
  // Form fields, the chosen photo, and one validation message.
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Salad')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  // Keep a preview when a photo is chosen.
  function handleImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setImage(URL.createObjectURL(file))
  }

  // Check the name and price, then hand the item to the list.
  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim()) {
      setError('Enter a product name.')
      return
    }
    // Allow a typed dollar sign, then keep the number.
    const amount = Number(String(price).replace(/[^0-9.]/g, ''))
    if (!amount || Number.isNaN(amount)) {
      setError('Enter a valid price.')
      return
    }
    onAdd({
      id: String(Date.now()),
      name: name.trim(),
      description: description.trim(),
      category,
      price: amount,
      image,
    })
    // Clear the form after the item is added.
    setName('')
    setDescription('')
    setCategory('Salad')
    setPrice('')
    setImage('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <p className="text-sm text-neutral-700">Upload image</p>
      <label htmlFor="product-image" className="mt-2 grid h-20 w-20 cursor-pointer place-items-center overflow-hidden rounded border border-neutral-200 bg-neutral-50 text-neutral-400">
        {/* Show the photo once one is chosen, otherwise the upload mark. */}
        {image ? (
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-center text-[11px]">
            <svg className="mx-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 16.5h10a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.4A3.5 3.5 0 0 0 7 16.5Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 12.5V17M12 12.5l-2 2M12 12.5l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Upload
          </span>
        )}
      </label>
      <input id="product-image" type="file" accept="image/*" className="sr-only" onChange={handleImage} />

      <label htmlFor="product-name" className="mt-5 block text-sm text-neutral-700">
        Product name
      </label>
      <input
        id="product-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Type here"
        className="mt-2 w-full max-w-xs rounded border border-neutral-300 px-3 py-2 text-sm outline-none"
      />

      <label htmlFor="product-description" className="mt-5 block text-sm text-neutral-700">
        Product description
      </label>
      <textarea
        id="product-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Write content here"
        rows={5}
        className="mt-2 w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none"
      />

      <div className="mt-5 flex gap-8">
        <div>
          <label htmlFor="product-category" className="block text-sm text-neutral-700">
            Product category
          </label>
          <select
            id="product-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-2 w-28 rounded border border-neutral-300 px-2 py-2 text-sm outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="product-price" className="block text-sm text-neutral-700">
            Product Price
          </label>
          <input
            id="product-price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="$25"
            className="mt-2 w-24 rounded border border-neutral-300 px-3 py-2 text-sm outline-none"
          />
        </div>
      </div>

      {/* Show the message only when add was blocked. */}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <button type="submit" className="mt-6 bg-black px-8 py-2 text-sm font-medium text-white">
        ADD
      </button>
    </form>
  )
}

export default AddForm
