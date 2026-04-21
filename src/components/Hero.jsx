import { useEffect, useRef, useState } from 'react'
import { heroSlides } from '../constants/data'

const SWIPE_THRESHOLD = 50

const travellerOptions = [
  'All travellers',
  'Solo traveller',
  'Couple',
  'Family',
  'Friends',
  'Business',
]

const journeyOptions = [
  'Anywhere',
  'Australia',
  'Singapore',
  'Malaysia',
  'Canada',
  'Japan',
  'Indonesia',
]

function Hero() {
  const [active, setActive] = useState(0)
  const [traveller, setTraveller] = useState(travellerOptions[0])
  const [journey, setJourney] = useState(journeyOptions[0])
  const [openMenu, setOpenMenu] = useState(null)
  const touchStartX = useRef(null)
  const filterBarRef = useRef(null)
  const slide = heroSlides[active]

  useEffect(() => {
    if (!openMenu) return
    const handleClickOutside = (event) => {
      if (filterBarRef.current && !filterBarRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openMenu])

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

      <div className="hero-filter-bar" ref={filterBarRef}>
        <div className={`hero-filter-group${openMenu === 'traveller' ? ' hero-filter-group--open' : ''}`}>
          <button
            type="button"
            className="hero-filter"
            aria-haspopup="listbox"
            aria-expanded={openMenu === 'traveller'}
            onClick={() => setOpenMenu(openMenu === 'traveller' ? null : 'traveller')}
          >
            <span className="hero-filter__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
            </span>
            <span className="hero-filter__text">
              <span className="hero-filter__label">Who&apos;s exploring</span>
              <span className="hero-filter__value">{traveller}</span>
            </span>
            <span className="hero-filter__caret" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </span>
          </button>
          {openMenu === 'traveller' && (
            <ul className="hero-filter__menu" role="listbox" aria-label="Select traveller type">
              {travellerOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option === traveller}
                    className={`hero-filter__option${option === traveller ? ' hero-filter__option--active' : ''}`}
                    onClick={() => {
                      setTraveller(option)
                      setOpenMenu(null)
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`hero-filter-group${openMenu === 'journey' ? ' hero-filter-group--open' : ''}`}>
          <button
            type="button"
            className="hero-filter"
            aria-haspopup="listbox"
            aria-expanded={openMenu === 'journey'}
            onClick={() => setOpenMenu(openMenu === 'journey' ? null : 'journey')}
          >
            <span className="hero-filter__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
              </svg>
            </span>
            <span className="hero-filter__text">
              <span className="hero-filter__label">Your journey to</span>
              <span className="hero-filter__value">{journey}</span>
            </span>
            <span className="hero-filter__caret" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </span>
          </button>
          {openMenu === 'journey' && (
            <ul className="hero-filter__menu" role="listbox" aria-label="Select destination">
              {journeyOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option === journey}
                    className={`hero-filter__option${option === journey ? ' hero-filter__option--active' : ''}`}
                    onClick={() => {
                      setJourney(option)
                      setOpenMenu(null)
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
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
