/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

// Shared auth state for the navbar and account pages.
const AuthContext = createContext(null)
// Saved accounts and the current session live in local storage.
const USERS_KEY = 'tomato_users'
const SESSION_KEY = 'tomato_session'

// Load saved accounts, or an empty list if storage is missing or invalid.
function readUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Restore the signed-in name and email, never the password.
function readSession() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    if (parsed && typeof parsed.name === 'string' && typeof parsed.email === 'string') {
      return { name: parsed.name, email: parsed.email }
    }
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  // Start from the stored session so a refresh keeps the user signed in.
  const [user, setUser] = useState(readSession)

  // Reject a duplicate email, then save the account and start a session.
  function signup({ name, email, password }) {
    const users = readUsers()
    const emailKey = email.trim().toLowerCase()
    if (users.some((entry) => entry.email === emailKey)) {
      throw new Error('An account with this email already exists.')
    }

    const nextUser = { name: name.trim(), email: emailKey, password }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, nextUser]))

    const session = { name: nextUser.name, email: nextUser.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
  }

  // Match the email and password, then start a session without storing the password.
  function login({ email, password }) {
    const emailKey = email.trim().toLowerCase()
    const found = readUsers().find((entry) => entry.email === emailKey && entry.password === password)
    if (!found) throw new Error('Invalid email or password.')

    const session = { name: found.name, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
  }

  // Clear only the session so the saved account can be used again.
  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>
}

// Fail loudly if a screen reads auth outside the provider.
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
