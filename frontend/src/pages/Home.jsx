import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import { useAuth } from '../context/AuthContext'
import plate from '../assets/bg.jpg'
import stack from '../assets/log.png'
import counter from '../assets/pic4.jpg'
import windowSeat from '../assets/pic5.jpg'
import evening from '../assets/pic6.jpg'

// Three room photos shown in the gallery below the hero.
const rooms = [
  { src: counter, alt: 'Evening counter with stools outside a cafe', caption: 'The counter' },
  { src: windowSeat, alt: 'Window table with a small vase of roses', caption: 'Window seats' },
  { src: evening, alt: 'Restaurant terrace lit up at dusk', caption: 'Evening tables' },
]

function Home() {
  const { user } = useAuth()

  return (
    <>
      <HeroBanner />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-tomato">A SEAT AT OUR TABLE</p>
          <h1 className="mt-3 text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl">
            Good food.
            <br />
            Great company.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-500">
            Your favourite flavours, a warm welcome, and something delicious to look forward to.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="rounded-full bg-tomato px-6 py-3 text-sm font-semibold text-white hover:bg-[#e84312]"
            >
              View the menu
            </Link>
            {/* Signed-in visitors can book; everyone else is asked to create an account. */}
            {user ? (
              <Link
                to="/contact"
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-tomato hover:text-tomato"
              >
                Book a table
              </Link>
            ) : (
              <Link
                to="/signup"
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-tomato hover:text-tomato"
              >
                Create an account
              </Link>
            )}
          </div>
        </div>
        <img
          src={plate}
          alt="Burger, chili fries, and slaw on a wooden board"
          className="h-[420px] w-full rounded-3xl object-cover object-[82%_center]"
        />
      </section>

      {/* House favourite sits beside the stacked-burger photo. */}
      <section className="bg-[#fff7f4]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-2">
          <div className="flex items-center justify-center overflow-hidden rounded-3xl bg-neutral-950">
            <img src={stack} alt="Double bacon cheeseburger with sesame seeds" className="h-[380px] w-full object-contain" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-tomato">HOUSE FAVOURITE</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">The double bacon stack.</h2>
            <p className="mt-4 max-w-md leading-relaxed text-neutral-600">
              Two patties, bacon, and a lot of cheddar. It is the plate people come back for, with fries if you want the
              full table.
            </p>
            <Link to="/menu" className="mt-6 inline-block text-sm font-semibold text-tomato hover:underline">
              See the menu
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery renders one figure for each room photo. */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-tomato">THE ROOM</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Stay a while.</h2>
          </div>
          <Link to="/about" className="hidden text-sm font-semibold text-tomato hover:underline sm:inline">
            About us
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {rooms.map((room) => (
            <figure key={room.caption} className="overflow-hidden rounded-2xl">
              <img src={room.src} alt={room.alt} className="h-64 w-full object-cover" />
              <figcaption className="px-1 pt-3 text-sm font-medium text-neutral-700">{room.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
