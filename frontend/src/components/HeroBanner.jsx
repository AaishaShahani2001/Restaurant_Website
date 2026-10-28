import { Link } from 'react-router-dom'
import header from '../assets/header_img.png'

function HeroBanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl">
        {/* Plate photo fills the orange banner. */}
        <img
          src={header}
          alt="Salmon, broccoli, and quinoa on an orange table"
          className="h-[340px] w-full object-cover sm:h-[420px]"
        />
        {/* Text sits on the empty orange space at the left. */}
        <div className="absolute inset-0 flex items-center px-6 sm:px-12">
          <div className="max-w-md text-white">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Order your
              <br />
              favourite food here
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/90">
              Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and
              culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one
              delicious meal at a time.
            </p>
            {/* Opens the menu page. */}
            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm text-neutral-600"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
