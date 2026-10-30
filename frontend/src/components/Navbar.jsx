import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/cart-context'

// Primary routes shown in the desktop bar and the mobile menu.
const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact us' },
]

// Underline only the link for the current route.
function linkClass({ isActive }) {
    return `text-[15px] font-medium text-neutral-900 transition hover:text-tomato ${isActive ? 'underline decoration-2 underline-offset-4' : ''
        }`
}

// Search magnifying glass.
function SearchIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M16 16.5L20 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

// Shopping bag outline.
function BagIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M6.5 8.5h11l-.8 11.2a1 1 0 0 1-1 .8H8.3a1 1 0 0 1-1-.8L6.5 8.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path d="M9 8.5V7.2a3 3 0 0 1 6 0v1.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

// Close mark while a panel is open, otherwise the hamburger.
function MenuGlyph({ open }) {
    return open ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

function Navbar() {
    const { user, logout } = useAuth()
    const { count } = useCart()
    const navigate = useNavigate()
    // Mobile menu, search field, profile menu, and the text typed into search.
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [query, setQuery] = useState('')
    const searchRef = useRef(null)
    const profileRef = useRef(null)

    // Move focus into the search field as soon as it opens.
    useEffect(() => {
        if (searchOpen) searchRef.current?.focus()
    }, [searchOpen])

    // Escape closes search, the mobile menu, and the profile menu.
    useEffect(() => {
        function onKey(event) {
            if (event.key !== 'Escape') return
            setSearchOpen(false)
            setMenuOpen(false)
            setProfileOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    // A click outside the profile menu closes it.
    useEffect(() => {
        if (!profileOpen) return
        function onPointer(event) {
            if (!profileRef.current?.contains(event.target)) setProfileOpen(false)
        }
        document.addEventListener('mousedown', onPointer)
        return () => document.removeEventListener('mousedown', onPointer)
    }, [profileOpen])

    // Send the trimmed query to the menu, or open the full menu if it is empty.
    function submitSearch(event) {
        event.preventDefault()
        const value = query.trim()
        navigate(value ? `/menu?q=${encodeURIComponent(value)}` : '/menu')
        setSearchOpen(false)
        setMenuOpen(false)
    }

    // First click opens search; the next click runs it, or closes it when blank.
    function onSearchClick() {
        if (!searchOpen) {
            setSearchOpen(true)
            return
        }
        if (query.trim()) {
            navigate(`/menu?q=${encodeURIComponent(query.trim())}`)
            setSearchOpen(false)
            return
        }
        setSearchOpen(false)
    }

    return (
        <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white">
            <div className="relative mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-6">
                <div className="flex items-center gap-2">
                    {/* Menu button is only shown below the desktop breakpoint. */}
                    <button
                        type="button"
                        className="rounded-full p-2 text-neutral-800 lg:hidden"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((value) => !value)}
                    >
                        <MenuGlyph open={menuOpen} />
                    </button>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-[26px] font-bold tracking-tight text-tomato">
                        Tomato.
                    </Link>
                </div>

                {/* Centered links for wide screens. */}
                <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex" aria-label="Primary">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === '/'}
                            className={linkClass}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-1 sm:gap-3">
                    <form onSubmit={submitSearch} className="flex items-center gap-1">
                        {/* Search input appears only after the icon is opened. */}
                        {searchOpen && (
                            <input
                                ref={searchRef}
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search the menu"
                                aria-label="Search the menu"
                                className="w-32 rounded-full border border-neutral-200 px-3 py-1.5 text-sm outline-none focus:border-tomato sm:w-44"
                            />
                        )}
                        <button
                            type="button"
                            onClick={onSearchClick}
                            aria-label={searchOpen ? 'Search' : 'Open search'}
                            className="rounded-full p-2 text-neutral-800 hover:text-tomato"
                        >
                            <SearchIcon />
                        </button>
                    </form>

                    {/* Bag opens the order page instead of a side panel. */}
                    <Link
                        to="/order"
                        aria-label={count > 0 ? `Open order, ${count} items` : 'Open order'}
                        className="relative rounded-full p-2 text-neutral-800 hover:text-tomato"
                    >
                        <BagIcon />
                        {/* Quantity badge is hidden while the cart is empty. */}
                        {count > 0 && (
                            <span className="absolute -top-0.5 right-0 grid h-4 min-w-4 place-items-center rounded-full bg-tomato px-1 text-[10px] font-semibold text-white">
                                {count}
                            </span>
                        )}
                    </Link>

                    {/* Signed-in users get a profile menu; everyone else gets sign in. */}
                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                type="button"
                                aria-label="Account menu"
                                aria-expanded={profileOpen}
                                onClick={() => setProfileOpen((open) => !open)}
                                className="grid h-9 w-9 place-items-center rounded-full bg-tomato text-sm font-semibold text-white"
                            >
                                {user.name.trim().charAt(0).toUpperCase()}
                            </button>
                            {/* My orders and logout only while the icon is open. */}
                            {profileOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border border-neutral-200 bg-white py-1 shadow-md">
                                    <Link
                                        to="/my-orders"
                                        className="block px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-50"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        My orders
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProfileOpen(false)
                                            logout()
                                        }}
                                        className="block w-full px-4 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm text-neutral-800 transition hover:border-tomato hover:text-tomato sm:px-5"
                        >
                            sign in
                        </Link>
                    )}
                </div>
            </div>

            {/* Stacked links replace the centered nav on small screens. */}
            {menuOpen && (
                <nav className="border-t border-neutral-100 px-5 py-3 lg:hidden" aria-label="Mobile">
                    <div className="flex flex-col">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                className="py-2.5 text-sm font-medium text-neutral-800"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    )
}

export default Navbar
