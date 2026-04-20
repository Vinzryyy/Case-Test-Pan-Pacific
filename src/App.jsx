import './App.css'

const trendingItems = [
  {
    location: 'Canada',
    title: 'Top Whistler honeymoon or babymoon staycation ideas',
    labels: ['Couple', 'Travel Guides', 'Winter', 'Honey Moon', 'Nature'],
    image: '/card%20Road%20Trips.png',
  },
  {
    location: 'Canada',
    title: 'Top Whistler honeymoon or babymoon staycation ideas',
    labels: ['Couple', 'Travel Guides', 'Winter', 'Honey Moon', 'Nature'],
    image: '/card%20Road%20Trips.png',
  },
  {
    location: 'Canada',
    title: 'Top Whistler honeymoon or babymoon staycation ideas',
    labels: ['Couple', 'Travel Guides', 'Winter', 'Honey Moon', 'Nature'],
    image: '/card%20Road%20Trips.png',
  },
]

const editorTags = ['Couple', 'Travel Guide', 'Honey Moon', 'Cities & Night Life', 'Romance']

const journeyFilters = [
  'All',
  'Road Trips',
  'Sustainable Travel',
  'Photo Journal',
  'Romantic',
  'Family Bonding',
  'Jet Setting',
]

const journeyCards = [
  {
    location: 'Singapore',
    title: 'Lorem ipsum dolor sit amet consectetur',
    image: '/Istock.jpg',
  },
  {
    location: 'Singapore',
    title: 'Lorem ipsum dolor sit amet consectetur',
    image: '/Istock.jpg',
  },
]

const experienceTabs = [
  { title: 'For Couples', image: '/couple.png' },
  { title: 'For Family', image: '/family.png' },
  { title: 'For Business', image: '/Bussnise.png' },
]

const romanticCards = [
  {
    location: 'Canada',
    title: 'Top Whistler honeymoon or babymoon staycation ideas',
    labels: ['Couple', 'Travel Guides', 'Winter', 'Honey Moon', 'Nature'],
    image: '/Istock.jpg',
  },
  {
    location: 'Canada',
    title: 'Top Whistler honeymoon or babymoon staycation ideas',
    labels: ['Couple', 'Travel Guides', 'Winter', 'Honey Moon', 'Nature'],
    image: '/Istock.jpg',
  },
  {
    location: 'Canada',
    title: 'Top Whistler honeymoon or babymoon staycation ideas',
    labels: ['Couple', 'Travel Guides', 'Winter', 'Honey Moon', 'Nature'],
    image: '/Istock.jpg',
  },
]

const destinations = ['Singapore', 'Australia', 'Malaysia', 'China', 'Canada', 'More destinations']

function App() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="utility-bar">
          <button type="button" className="utility-location">
            <span>You&apos;re in Pan Pacific Suzhou</span>
            <span aria-hidden="true">⌄</span>
          </button>
          <div className="utility-actions">
            <button type="button" className="utility-item">
              <span>CNY</span>
              <span aria-hidden="true">⌄</span>
            </button>
            <button type="button" className="utility-item utility-item--language">
              <span className="utility-dot" aria-hidden="true" />
              <span>English</span>
              <span aria-hidden="true">⌄</span>
            </button>
            <a href="/">Manage Booking</a>
            <button type="button" className="icon-search" aria-label="Search">
              <span />
            </button>
          </div>
        </div>

        <div className="main-nav">
          <div className="brand-cluster">
            <button type="button" className="menu-button" aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
            <img src="/Logo.png" alt="Pan Pacific Hotels and Resorts" className="brand-logo" />
          </div>

          <nav className="nav-links" aria-label="Primary">
            <a href="/" className="discovery-link">
              <span className="discovery-link__icon" aria-hidden="true" />
              <span>Pan Pacific DISCOVERY</span>
              <span className="discovery-link__muted">Join</span>
              <span className="discovery-link__muted">|</span>
              <span className="discovery-link__muted">Sign In</span>
            </a>
            <a href="/" className="pill-button pill-button--solid">
              <span className="pill-button__icon" aria-hidden="true" />
              Book Now
            </a>
            <a href="/" className="pill-button">
              <span className="pill-button__icon pill-button__icon--bag" aria-hidden="true" />
              Dine With Us
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="spotlight-tag">
              <span className="spotlight-dot" aria-hidden="true" />
              February Spotlight
            </div>
            <h1>Travel guide to Melbourne PARKROYAL Monash</h1>
            <a href="/" className="hero-link">
              More details
            </a>
          </div>
        </section>

        <section className="trending-section">
          <div className="section-heading">
            <h2>What&apos;s trending</h2>
            <p>
              Fresh ideas, popular picks, and travel inspiration that&apos;s having its
              moment.
            </p>
          </div>

          <div className="card-grid">
            {trendingItems.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="trend-card"
                style={{ '--card-image': `url(${item.image})` }}
              >
                <div className="trend-card__overlay" />
                <div className="trend-card__content">
                  <span className="trend-card__location">{item.location}</span>
                  <h3>{item.title}</h3>
                  <div className="trend-card__meta">
                    {item.labels.map((label) => (
                      <span key={`${index}-${label}`}>{label}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="editors-pick-section">
          <div className="editors-pick__heading">
            <span className="section-icon" aria-hidden="true" />
            <h2>Editor&apos;s pick</h2>
          </div>

          <div className="editors-pick__layout">
            <div className="editors-pick__media">
              <img
                src="/Editor'sPick.png"
                alt="Featured editorial story"
                className="editors-pick__image"
              />
            </div>

            <article className="editors-pick__content">
              <span className="editors-pick__location">Singapore</span>
              <h3>Article title max 2 liners than truncate goes here</h3>
              <div className="editors-pick__tags">
                {editorTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href="/" className="editors-pick__link">
                Read more
              </a>
            </article>
          </div>
        </section>

        <section className="journey-section">
          <div className="journey-layout">
            <aside className="journey-sidebar">
              <h2>Globe-trot with Pan Pacific</h2>
              <div className="journey-filters" aria-label="Journey categories">
                {journeyFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`journey-filter${
                      filter === 'Photo Journal' ? ' journey-filter--active' : ''
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="journey-nav">
                <button type="button" aria-label="Previous stories">
                  <span aria-hidden="true">&larr;</span>
                </button>
                <button type="button" aria-label="Next stories">
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </aside>

            <div className="journey-cards">
              {journeyCards.map((card, index) => (
                <article key={`${card.title}-${index}`} className="journey-card">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="journey-card__image"
                  />
                  <div className="journey-card__body">
                    <span className="journey-card__location">{card.location}</span>
                    <h3>{card.title}</h3>
                    <div className="journey-card__tags">
                      <span>Category</span>
                      <span>Category</span>
                    </div>
                  </div>
                  <a href="/" className="journey-card__cta" aria-label={`Read ${card.title}`}>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experiences-section">
          <div className="experience-tabs" aria-label="Experience categories">
            {experienceTabs.map((tab) => (
              <article
                key={tab.title}
                className="experience-tab"
                style={{ '--experience-image': `url(${tab.image})` }}
              >
                <div className="experience-tab__overlay" />
                <h3>{tab.title}</h3>
              </article>
            ))}
          </div>

          <div
            className="romantic-hero"
            style={{ '--romantic-image': "url('/Romantic.png')" }}
          >
            <div className="romantic-hero__overlay" />
            <div className="romantic-hero__content">
              <div className="romantic-copy">
                <h2>Romantic Escapes</h2>
              </div>
              <div className="romantic-summary">
                <p>
                  Discover the ultimate romantic getaway: you need a dreamy
                  destination. One that&apos;s perfect for couples celebrating their
                  honeymoon or babymoon!
                </p>
                <a href="/" className="romantic-button">
                  Discover More
                </a>
              </div>
            </div>

            <div className="romantic-cards">
              {romanticCards.map((card, index) => (
                <article key={`${card.title}-${index}`} className="romantic-card">
                  <div className="romantic-card__eyebrow">{card.location}</div>
                  <div className="romantic-card__row">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="romantic-card__thumb"
                    />
                    <h3>{card.title}</h3>
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

        <section className="destinations-section">
          <div className="destinations-layout">
            <div className="destinations-copy">
              <h2>Explore your next adventure with Pan Pacific</h2>
              <p>
                Discover your next adventure with our handpicked travel
                inspiration, exciting guides, and spotlighted destinations from
                Pan Pacific that will ignite your wanderlust!
              </p>

              <div className="destinations-list" aria-label="Destination list">
                {destinations.map((destination) => (
                  <button
                    key={destination}
                    type="button"
                    className={`destination-item${
                      destination === 'Australia' ? ' destination-item--active' : ''
                    }`}
                  >
                    <span>{destination}</span>
                    {destination === 'Australia' ? <span aria-hidden="true">&rarr;</span> : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="destinations-media">
              <img src="/ausie.png" alt="Australia destination view" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
