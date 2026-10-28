import { useState } from 'react'
import { site } from '../data/site'

// Shared input styling, with an error border added per field.
const field =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-tomato focus:ring-2 focus:ring-tomato/20'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  // Switches the card from the form to the thank-you message.
  const [sent, setSent] = useState(false)

  // Check the note locally, then mark it sent without calling a server.
  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    if (message.trim().length < 8) next.message = 'Tell us a little more — at least a short sentence.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSent(true)
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-tomato">CONTACT US</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Write to the restaurant.</h1>
        <p className="mt-4 max-w-md leading-relaxed text-neutral-600">
          Ask about a table, a private lunch, or what is on the pass tonight. This note stays in your browser — we do
          not send it to a server.
        </p>

        {/* Address, phone, email, and hours from the shared site details. */}
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-neutral-900">Visit</dt>
            <dd className="mt-1 text-neutral-600">
              {site.street}
              <br />
              {site.city}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-900">Call</dt>
            <dd className="mt-1">
              <a href={site.phoneHref} className="text-neutral-600 hover:text-tomato">
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-900">Email</dt>
            <dd className="mt-1">
              <a href={site.emailHref} className="text-neutral-600 hover:text-tomato">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-900">Hours</dt>
            <dd className="mt-2 space-y-1 text-neutral-600">
              {site.hours.map((row) => (
                <p key={row.days} className="flex max-w-xs justify-between gap-6">
                  <span>{row.days}</span>
                  <span>{row.time}</span>
                </p>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-3xl border border-neutral-200 p-6 sm:p-8">
        {/* After a valid note, replace the form with a thank-you and a reset. */}
        {sent ? (
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Thanks, {name.trim().split(' ')[0]}.</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              We have your note on this page. Nothing was emailed.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false)
                setName('')
                setEmail('')
                setMessage('')
              }}
              className="mt-6 rounded-lg bg-tomato px-5 py-3 text-sm font-semibold text-white hover:bg-[#e84312]"
            >
              Write another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Send a note</h2>
            <div>
              <label className="sr-only" htmlFor="contact-name">
                Your name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className={`${field} ${errors.name ? 'border-red-400' : ''}`}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="sr-only" htmlFor="contact-email">
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email"
                className={`${field} ${errors.email ? 'border-red-400' : ''}`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="sr-only" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Your message"
                className={`${field} resize-none ${errors.message ? 'border-red-400' : ''}`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-tomato py-3.5 text-sm font-semibold text-white hover:bg-[#e84312]"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Contact
