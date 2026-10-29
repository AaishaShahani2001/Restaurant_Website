import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import AddForm from '../components/admin/AddForm'
import AllOrders from '../components/admin/AllOrders'
import ListAll from '../components/admin/ListAll'
import { menuItems } from '../data/menu'

// Same key the admin login writes after a successful sign-in.
const ADMIN_SESSION_KEY = 'tomato_admin'

// Sidebar choices. The matching screen is rendered in the main area.
const tabs = [
  { id: 'add', label: 'Add Items' },
  { id: 'list', label: 'List Items' },
  { id: 'orders', label: 'Orders' },
]

// Small mark beside each sidebar label.
function SideIcon({ name }) {
  if (name === 'add') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 8.5v7M8.5 12h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'list') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="4.5" width="14" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 9h7M8.5 12h7M8.5 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="4.5" width="14" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.2 12.2 10.2 14l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AdminDashboard() {
  const navigate = useNavigate()
  // Open on Add Items. The food list starts from the menu data.
  const [view, setView] = useState('add')
  const [items, setItems] = useState(menuItems)

  // Send a visitor who is not signed in back to the admin login.
  if (!sessionStorage.getItem(ADMIN_SESSION_KEY)) {
    return <Navigate to="/admin/login" replace />
  }

  // Put a new product at the end of the list, then tell the admin it was added.
  function handleAdd(item) {
    // Keep the existing rows and append this product.
    setItems((current) => [...current, item])
    // Name the product in the success notice.
    toast.success(`${item.name} added`)
  }

  // Drop one product by its id, then tell the admin which one was removed.
  function handleRemove(id) {
    // Read the name before the row is dropped.
    const removed = items.find((item) => item.id === id)
    // Leave every row except the one that was clicked.
    setItems((current) => current.filter((item) => item.id !== id))
    // Skip the notice if that id was already gone.
    if (removed) toast.success(`${removed.name} removed`)
  }

  // Clear the admin session and return to the admin login.
  function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Shows the add and remove messages at the top of the panel. */}
      <Toaster position="top-right" />
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-3">
        <div>
          <p className="text-2xl font-bold leading-none text-tomato">Tomato.</p>
          <p className="mt-1 text-sm text-neutral-500">Admin Panel</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm text-neutral-800"
          >
            Log out
          </button>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-600">
            A
          </span>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Sidebar stays in this page. It only switches the view. */}
        <aside className="w-52 shrink-0 border-r border-neutral-200 px-5 py-6">
          <div className="flex flex-col gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setView(tab.id)}
                className={`flex items-center gap-3 rounded border px-3 py-2 text-sm ${
                  view === tab.id ? 'border-[#f0d2c2] bg-[#fff1ea]' : 'border-neutral-300 bg-white'
                }`}
              >
                <SideIcon name={tab.id} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 bg-neutral-50 p-6 sm:p-8">
          {/* One admin screen at a time. */}
          {view === 'add' && <AddForm onAdd={handleAdd} />}
          {view === 'list' && <ListAll items={items} onRemove={handleRemove} />}
          {view === 'orders' && <AllOrders />}
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
