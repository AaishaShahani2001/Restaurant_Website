import { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'

const titles = {
  '/': 'Tomato.',
  '/menu': 'Menu · Tomato.',
  '/about': 'About Us · Tomato.',
  '/contact': 'Contact us · Tomato.',
  '/login': 'Log in · Tomato.',
  '/signup': 'Create an account · Tomato.',
  '/order': 'Your order · Tomato.',
}

function Layout() {
  const { pathname } = useLocation()
  const hideFooter = pathname === '/login' || pathname === '/signup'

  useEffect(() => {
    document.title = titles[pathname] ?? 'Tomato.'
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-neutral-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      {hideFooter ? null : <Footer />}
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
