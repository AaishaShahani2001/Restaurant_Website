import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthShowcase from '../components/AuthShowcase'
import { useAuth } from '../context/AuthContext'

// Shared input styling, with an error border added per field.
const field =
    'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-tomato focus:ring-2 focus:ring-tomato/20'

function SignUp() {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    // Form values, the terms checkbox, and messages for invalid fields.
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState({})

    // Check every field, then create the account or show the signup error.
    function handleSubmit(event) {
        event.preventDefault()
        const next = {}
        if (!name.trim()) next.name = 'Please enter your name.'
        else if (name.trim().length > 60) next.name = 'Please use 60 characters or fewer.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.'
        if (password.length < 6) next.password = 'Use at least 6 characters.'
        if (!agreed) next.agreed = 'Please agree to the terms to continue.'
        setErrors(next)
        if (Object.keys(next).length > 0) return

        try {
            signup({ name: name.trim(), email: email.trim(), password })
            navigate(location.state?.from || '/')
        } catch (error) {
            setErrors({ email: error.message })
        }
    }

    return (
        <section className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-6xl items-center gap-8 px-5 py-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-10">
            <AuthShowcase />
            <div className="mx-auto w-full max-w-[420px]">
                <h1 className="text-[32px] font-bold tracking-tight text-neutral-900">Create an account</h1>
                <p className="mt-2 text-sm text-neutral-500">Join us for delicious food and memorable moments.</p>

                <form className="mt-8" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                        <div>
                            <label className="sr-only" htmlFor="signup-name">
                                Your name
                            </label>
                            {/* Typing clears that field's previous error. */}
                            <input
                                id="signup-name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Your name"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value)
                                    setErrors((current) => ({ ...current, name: undefined }))
                                }}
                                className={`${field} ${errors.name ? 'border-red-400' : ''}`}
                            />
                            {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="signup-email">
                                Your email
                            </label>
                            <input
                                id="signup-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                    setErrors((current) => ({ ...current, email: undefined }))
                                }}
                                className={`${field} ${errors.email ? 'border-red-400' : ''}`}
                            />
                            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="signup-password">
                                Password
                            </label>
                            <input
                                id="signup-password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                    setErrors((current) => ({ ...current, password: undefined }))
                                }}
                                className={`${field} ${errors.password ? 'border-red-400' : ''}`}
                            />
                            {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-tomato py-3.5 text-sm font-semibold text-white transition hover:bg-[#e84312]"
                        >
                            Create account
                        </button>
                    </div>

                    {/* Terms must be checked before the account is created. */}
                    <label htmlFor="terms" className="mt-4 flex items-start gap-2.5 text-[13px] leading-5 text-neutral-500">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            checked={agreed}
                            onChange={(event) => {
                                setAgreed(event.target.checked)
                                setErrors((current) => ({ ...current, agreed: undefined }))
                            }}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff4d1c]"
                        />
                        <span>By continuing, I agree to the terms of use &amp; privacy policy.</span>
                    </label>
                    {errors.agreed && <p className="mt-1.5 text-xs text-red-500">{errors.agreed}</p>}
                </form>

                {/* Keep the page the user was trying to reach when they switch to log in. */}
                <p className="mt-8 text-center text-sm text-neutral-500">
                    Already have an account?{' '}
                    <Link to="/login" state={location.state} className="font-semibold text-tomato hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default SignUp
