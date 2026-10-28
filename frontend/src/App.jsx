import { useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'

const titles = {
  '/': 'Tomato.',
  '/menu': 'Menu · Tomato.',
  '/about': 'About Us · Tomato.',
  '/contact': 'Contact us · Tomato.',
  '/login': 'Log in · Tomato.',
  '/signup': 'Create an account · Tomato.',
  '/order': 'Your order · Tomato.',
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
