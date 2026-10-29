import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthShowcase from '../components/AuthShowcase'
import { useAuth } from '../context/AuthContext'

// Shared input styling, with an error border added per field.
const field =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-tomato focus:ring-2 focus:ring-tomato/20'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // Email, password, and either a field message or one form-level message.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  // Check the fields, then sign in or show the login error.
  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Enter your password.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    try {
      login({ email: email.trim(), password })
      navigate(location.state?.from || '/')
    } catch (error) {
      setErrors({ form: error.message })
    }
  }

  return (
    <section className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-6xl items-center gap-8 px-5 py-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-10">
      <AuthShowcase />
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="text-[32px] font-bold tracking-tight text-neutral-900">Welcome back</h1>
        <p className="mt-2 text-sm text-neutral-500">Log in for delicious food and memorable moments.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="sr-only" htmlFor="login-email">
              Your email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`${field} ${errors.email ? 'border-red-400' : ''}`}
            />
            {/* Show the email message only after a failed check. */}
            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="sr-only" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${field} ${errors.password ? 'border-red-400' : ''}`}
            />
            {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* Wrong email or password is reported once for the whole form. */}
          {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-tomato py-3.5 text-sm font-semibold text-white transition hover:bg-[#e84312]"
          >
            Log in
          </button>
        </form>

        {/* Keep the return path when switching over to create an account. */}
        <p className="mt-8 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" state={location.state} className="font-semibold text-tomato hover:underline">
            Sign up
          </Link>
        </p>

        {/* Opens the admin portal, separate from a customer account. */}
        <Link
          to="/admin/login"
          className="mt-4 block w-full rounded-lg border border-neutral-300 py-3.5 text-center text-sm font-semibold text-neutral-800 transition hover:border-tomato hover:text-tomato"
        >
          Admin login
        </Link>
      </div>
    </section>
  )
}

export default Login
