import { useState } from 'react'
import { experienceCategories } from '../constants/data'

function Experiences() {
  const [activeId, setActiveId] = useState(experienceCategories[0].id)
  const active =
    experienceCategories.find((cat) => cat.id === activeId) ??
    experienceCategories[0]

  return (
    <section className="experiences-section" id="experiences">
      <div
        className="experience-tabs"
        role="tablist"
        aria-label="Experience categories"
      >
        {experienceCategories.map((cat) => {
          const isActive = cat.id === activeId
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="experience-hero"
              onClick={() => setActiveId(cat.id)}
              className={`experience-tab${
                isActive ? ' experience-tab--active' : ''
              }`}
              style={{ '--experience-image': `url(${cat.tabImage})` }}
            >
              <div className="experience-tab__overlay" />
              <h3>{cat.tabTitle}</h3>
              <span className="experience-tab__chevron" aria-hidden="true">
                &or;
              </span>
            </button>
          )
        })}
      </div>

      <div
        className="romantic-hero"
        id="romantic"
        aria-labelledby="experience-hero-title"
        style={{ '--romantic-image': `url(${active.heroImage})` }}
      >
        <div className="romantic-hero__overlay" />
        <div className="romantic-hero__content" id="experience-hero">
          <div className="romantic-copy">
            <h2 id="experience-hero-title">{active.heroTitle}</h2>
          </div>
          <div className="romantic-summary">
            <p>{active.summary}</p>
            <a href="/" className="romantic-button">
              Discover More
            </a>
          </div>
        </div>

        <div className="romantic-cards">
          {active.cards.map((card, index) => (
            <article
              key={`${active.id}-${card.title}-${index}`}
              className="romantic-card"
            >
              <div className="romantic-card__eyebrow">{card.location}</div>
              <div className="romantic-card__row">
                <img
                  src={card.image}
                  alt=""
                  className="romantic-card__thumb"
                  loading="lazy"
                  decoding="async"
                />
                <h3>
                  <a href="/" className="romantic-card__link">
                    {card.title}
                  </a>
                </h3>
              </div>
              <div className="romantic-card__tags">
                {card.labels.map((label) => (
                  <span key={`${index}-${label}`}>{label}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experiences
