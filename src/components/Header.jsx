function Header() {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <button type="button" className="utility-location">
          <span>You&apos;re in Pan Pacific Suzhou</span>
          <span aria-hidden="true">&or;</span>
        </button>
        <div className="utility-actions">
          <button type="button" className="utility-item">
            <span>CNY</span>
            <span aria-hidden="true">&or;</span>
          </button>
          <button type="button" className="utility-item utility-item--language">
            <span className="utility-dot" aria-hidden="true" />
            <span>English</span>
            <span aria-hidden="true">&or;</span>
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
          <img
            src="/Logo.png"
            alt="Pan Pacific Hotels and Resorts"
            className="brand-logo"
            width="96"
            height="32"
            decoding="async"
          />
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
        <button type="button" className="mobile-user-icon" aria-label="User account">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-1a6 6 0 0 1 12 0v1" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
