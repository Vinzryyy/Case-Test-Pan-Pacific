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

function App() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="utility-bar">
          <span>You&apos;re in Pan Pacific Suzhou</span>
          <div className="utility-actions">
            <span>CNY</span>
            <span>English</span>
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
            <div className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="brand-copy">
              <strong>PAN PACIFIC</strong>
              <span>SUZHOU</span>
            </div>
          </div>

          <nav className="nav-links" aria-label="Primary">
            <a href="/">Pan Pacific DISCOVERY Join</a>
            <a href="/">Sign In</a>
            <a href="/" className="pill-button pill-button--solid">
              Book Now
            </a>
            <a href="/" className="pill-button">
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
            <span className="section-icon" aria-hidden="true">
              ♕
            </span>
            <h2>Editor&apos;s pick</h2>
          </div>

          <div className="editors-pick__layout">
            <div className="editors-pick__media">
              <img
                src="/card%20Road%20Trips.png"
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
      </main>
    </div>
  )
}

export default App
