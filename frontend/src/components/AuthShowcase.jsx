import plate from '../assets/bg.jpg'

function AuthShowcase() {
  return (
    <div className="relative min-h-80 overflow-hidden rounded-2xl lg:min-h-145">
      {/* Food photo behind the account-page headline. */}
      <img
        src={plate}
        alt="Burger, chili fries, and slaw on a wooden board"
        className="absolute inset-0 h-full w-full object-cover object-[74%_42%]"
      />
      {/* Darken the lower part of the photo so the white copy stays readable. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.12) 58%, rgba(0,0,0,0.2) 100%)',
        }}
      />
      {/* Headline block sits at the bottom of the photo. */}
      <div
        className="relative flex min-h-80 flex-col justify-end p-7 text-white sm:p-9 lg:min-h-145 lg:p-10"
        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45)' }}
      >
        <p className="text-[11px] font-medium tracking-[0.22em] text-white/80">A SEAT AT OUR TABLE</p>
        <h2 className="mt-3 max-w-sm text-[40px] font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Good food.
          <br />
          Great company.
        </h2>
        <p className="mt-4 max-w-62.5 text-sm leading-relaxed text-white/80">
          Your favourite flavours, a warm welcome, and something delicious to look forward to.
        </p>
      </div>
    </div>
  )
}

export default AuthShowcase
