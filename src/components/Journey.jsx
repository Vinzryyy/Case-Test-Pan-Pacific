import { useRef, useState } from 'react'
import { journeyCards, journeyFilters } from '../constants/data'

function Journey() {
  const [activeFilter, setActiveFilter] = useState('All')
  const cardsRef = useRef(null)

  const visibleCards =
    activeFilter === 'All'
      ? journeyCards
      : journeyCards.filter((card) => card.category === activeFilter)

  const scrollCards = (direction) => {
    const container = cardsRef.current
    if (!container) return
    const firstCard = container.querySelector('.journey-card')
    const step = firstCard ? firstCard.offsetWidth + 18 : 300
    container.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section className="journey-section" id="journey" data-reveal>
      <div className="journey-layout">
        <aside className="journey-sidebar">
          <h2>Globe-trot with Pan Pacific</h2>
          <div className="journey-filters" aria-label="Journey categories">
            {journeyFilters.map((filter) => {
              const isActive = filter === activeFilter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={`journey-filter${
                    isActive ? ' journey-filter--active' : ''
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>

          <div className="journey-nav">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Previous stories"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Next stories"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </aside>

        <div className="journey-cards" ref={cardsRef}>
          {visibleCards.length === 0 ? (
            <p className="journey-empty">
              No stories under &ldquo;{activeFilter}&rdquo; just yet — check back soon.
            </p>
          ) : (
            visibleCards.map((card) => (
              <article key={`${card.category}-${card.title}`} className="journey-card">
                <img
                  src={card.image}
                  alt={card.title}
                  className="journey-card__image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="journey-card__body">
                  <span className="journey-card__location">{card.location}</span>
                  <h3>{card.title}</h3>
                  <div className="journey-card__tags">
                    <span>{card.category}</span>
                  </div>
                </div>
                <a
                  href="/"
                  className="journey-card__cta"
                  aria-label={`Read ${card.title}`}
                >
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Journey
