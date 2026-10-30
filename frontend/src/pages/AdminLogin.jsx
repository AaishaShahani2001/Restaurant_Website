import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Fixed admin account used by this portal.
const ADMIN_EMAIL = 'admin@tomato.example'
const ADMIN_PASSWORD = 'admin123'
// Remember a successful admin sign-in for this browser tab.
const ADMIN_SESSION_KEY = 'tomato_admin'

// Shared input styling, with an error border added per field.
const field =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-tomato focus:ring-2 focus:ring-tomato/20'

function AdminLogin() {
  const navigate = useNavigate()
  // Email, password, and either a field message or one form-level message.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  // Skip the form when this tab already has an admin session.
  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_SESSION_KEY)) navigate('/admin')
  }, [navigate])

  // Check the fields, then accept only the predefined admin account.
  function handleSubmit(event) {
    // Keep the page from reloading on submit.
    event.preventDefault()
    // Collect field messages before touching the predefined account.
    const next = {}
    // Reject a blank or malformed email before comparing credentials.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    // Require a password so an empty field is not treated as a match.
    if (!password) next.password = 'Enter your password.'
    // Show the field messages from this attempt.
    setErrors(next)
    // Stop when a field failed, so the predefined account is not checked yet.
    if (Object.keys(next).length > 0) return

    // Compare the typed email to the fixed admin email, ignoring case.
    const emailMatches = email.trim().toLowerCase() === ADMIN_EMAIL
    // Compare the typed password to the fixed admin password.
    const passwordMatches = password === ADMIN_PASSWORD
    // Show one message when the email or password is not the admin account.
    if (!emailMatches || !passwordMatches) {
      setErrors({ form: 'Invalid admin email or password.' })
      return
    }

    // Store the admin email only, never the password.
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email: ADMIN_EMAIL }))
    // Open the admin panel after the predefined account matches.
    navigate('/admin')
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-6xl items-center justify-center px-5 py-8 sm:px-6">
      <div className="w-full max-w-105">
        <h1 className="text-[32px] font-bold tracking-tight text-neutral-900">Admin login</h1>
        <p className="mt-2 text-sm text-neutral-500">Sign in with the restaurant admin account.</p>
        {/* Show the fixed account so the portal can be opened without reading the source. */}
        <p className="mt-3 text-sm text-neutral-500">
          {ADMIN_EMAIL} / {ADMIN_PASSWORD}
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="sr-only" htmlFor="admin-email">
                Admin email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="Admin email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`${field} ${errors.email ? 'border-red-400' : ''}`}
              />
              {/* Show the email message only after a failed check. */}
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="sr-only" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`${field} ${errors.password ? 'border-red-400' : ''}`}
              />
              {/* Show the password message only after a failed check. */}
              {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Wrong admin credentials are reported once for the whole form. */}
            {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-tomato py-3.5 text-sm font-semibold text-white transition hover:bg-[#e84312]"
            >
            Log in
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin
