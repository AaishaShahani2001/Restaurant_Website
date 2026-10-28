import room from '../assets/pic7.jpg'
import counter from '../assets/pic4.jpg'
import windowSeat from '../assets/pic5.jpg'
import evening from '../assets/pic6.jpg'
import { chefs } from '../data/chefs'
import { site } from '../data/site'

// Smaller photos shown under the main dining-room picture.
const gallery = [
  { src: counter, alt: 'Evening counter with stools outside a cafe', caption: 'Open late at the counter' },
  { src: windowSeat, alt: 'Window table with a small vase of roses', caption: 'A quiet window seat' },
  { src: evening, alt: 'Restaurant terrace lit up at dusk', caption: 'Tables on the street' },
]

function About() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-tomato">ABOUT US</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">A neighbourhood table with a loud kitchen.</h1>
          <p className="mt-5 leading-relaxed text-neutral-600">
            Tomato started as a corner counter and grew into a room people stay in. We cook straightforward food, keep
            the lights warm, and save a seat when you walk in.
          </p>
          {/* Address is filled from the shared site details. */}
          <p className="mt-4 leading-relaxed text-neutral-600">
            Find us at {site.street}, {site.city}. The kitchen is open every day, and the door is too.
          </p>
        </div>
        <img
          src={room}
          alt="Sunlit dining room with armchairs, arched windows, and framed pictures"
          className="h-[440px] w-full rounded-3xl object-cover"
        />
      </section>

      {/* One captioned photo for each gallery entry. */}
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 sm:grid-cols-3 sm:px-6">
        {gallery.map((photo) => (
          <figure key={photo.caption} className="overflow-hidden rounded-2xl">
            <img src={photo.src} alt={photo.alt} className="h-56 w-full object-cover" />
            <figcaption className="px-1 pt-3 text-sm font-medium text-neutral-700">{photo.caption}</figcaption>
          </figure>
        ))}
      </section>

      {/* One card for each chef. */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-tomato">THE KITCHEN</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Meet the chefs.</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {chefs.map((chef) => (
            <article key={chef.name}>
              <img src={chef.image} alt={chef.name} className="h-64 w-full rounded-2xl object-cover" />
              <h3 className="mt-3 font-semibold text-neutral-900">{chef.name}</h3>
              <p className="text-sm font-medium text-tomato">{chef.role}</p>
              <p className="mt-1 text-sm text-neutral-500">{chef.about}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default About
