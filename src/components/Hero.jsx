import { useRef, useState } from 'react'
import { heroSlides } from '../constants/data'

const SWIPE_THRESHOLD = 50

function Hero() {
  const [active, setActive] = useState(0)
  const touchStartX = useRef(null)
  const slide = heroSlides[active]

  const goTo = (index) => {
    const total = heroSlides.length
    setActive(((index % total) + total) % total)
  }

  const next = () => goTo(active + 1)
  const prev = () => goTo(active - 1)

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (touchStartX.current == null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    if (delta < -SWIPE_THRESHOLD) next()
    else if (delta > SWIPE_THRESHOLD) prev()
    touchStartX.current = null
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') next()
    else if (event.key === 'ArrowLeft') prev()
  }

  return (
    <section
      className="hero-section"
      aria-roledescription="carousel"
      aria-label="Featured travel guides"
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      {heroSlides.map((s, idx) => (
        <div
          key={s.title}
          className={`hero-slide${idx === active ? ' hero-slide--active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden={idx !== active}
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-location">
          <span className="hero-location__pin" aria-hidden="true" />
          {slide.location}
        </span>
        <div className="spotlight-tag">
          <span className="spotlight-dot" aria-hidden="true" />
          {slide.spotlight}
        </div>
        <h1>{slide.title}</h1>
        <div className="hero-tags">
          {slide.tags.map((tag) => (
            <span key={tag} className="hero-tag">
              {tag}
            </span>
          ))}
        </div>
        <a href="/" className="hero-link">
          More details
        </a>
      </div>

      <div className="hero-filter-bar">
        <button type="button" className="hero-filter">
          <span className="hero-filter__label">Who&apos;s exploring</span>
          <span className="hero-filter__value">
            All travellers
            <span aria-hidden="true">&or;</span>
          </span>
        </button>
        <button type="button" className="hero-filter">
          <span className="hero-filter__label">Your journey to</span>
          <span className="hero-filter__value">
            Anywhere
            <span aria-hidden="true">&or;</span>
          </span>
        </button>
      </div>

      <div className="hero-dots" role="tablist" aria-label="Select slide">
        {heroSlides.map((s, idx) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={idx === active}
            aria-label={`Go to slide ${idx + 1}: ${s.location}`}
            className={`hero-dot${idx === active ? ' hero-dot--active' : ''}`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
