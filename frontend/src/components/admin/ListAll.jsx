import { formatPrice } from '../../data/menu'

function ListAll({ items, onRemove }) {
  return (
    <div>
      <h2 className="text-base font-medium text-neutral-800">All Foods List</h2>
      <table className="mt-4 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-left text-neutral-500">
            <th className="py-3 pr-4 font-medium">Image</th>
            <th className="py-3 pr-4 font-medium">Name</th>
            <th className="py-3 pr-4 font-medium">Category</th>
            <th className="py-3 pr-4 font-medium">Price</th>
            <th className="py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-neutral-200">
              <td className="py-3 pr-4">
                {/* Empty box when an added item has no photo. */}
                {item.image ? (
                  <img src={item.image} alt="" className="h-12 w-12 rounded object-cover" />
                ) : (
                  <span className="block h-12 w-12 rounded bg-neutral-100" />
                )}
              </td>
              <td className="py-3 pr-4">{item.name}</td>
              <td className="py-3 pr-4">{item.category}</td>
              <td className="py-3 pr-4">{formatPrice(item.price)}</td>
              <td className="py-3">
                <button type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`} className="px-2 text-neutral-700">
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListAll
