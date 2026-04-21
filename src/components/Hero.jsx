import { heroTags } from '../constants/data'

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-location">
          <span className="hero-location__pin" aria-hidden="true" />
          Australia
        </span>
        <div className="spotlight-tag">
          <span className="spotlight-dot" aria-hidden="true" />
          February Spotlight
        </div>
        <h1>Travel guide to Melbourne PARKROYAL Monash</h1>
        <div className="hero-tags">
          {heroTags.map((tag) => (
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
      <div className="hero-dots">
        <span className="hero-dot" />
        <span className="hero-dot" />
        <span className="hero-dot hero-dot--active" />
        <span className="hero-dot" />
      </div>
    </section>
  )
}

export default Hero
