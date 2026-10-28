import { Link } from 'react-router-dom'
import { site } from '../data/site'

// Same destinations as the navbar, repeated at the bottom of content pages.
const explore = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact us' },
]

function Footer() {
  return (
    <footer className="mt-auto bg-neutral-950 text-neutral-300">
      <div className="h-1 bg-tomato" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-bold text-tomato">Tomato.</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-400">
            Good food. Great company. A warm table whenever you are ready.
          </p>
        </div>

        {/* Turn the explore list into footer links. */}
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {explore.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Address, phone, and email come from the shared site details. */}
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">Visit</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            <li>{site.street}</li>
            <li>{site.city}</li>
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        {/* One row per opening-hours entry. */}
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">Hours</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            {site.hours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span className="text-neutral-300">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Year is read when the footer renders. */}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-neutral-500 sm:px-6">
          © {new Date().getFullYear()} Tomato. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
