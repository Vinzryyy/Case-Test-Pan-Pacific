import { useEffect, useState } from 'react'
import { menuSections } from '../constants/data'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

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
            <svg
              className="utility-globe"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
            >
              <circle cx="7" cy="7" r="6.5" fill="#d94548" />
              <path
                d="M0.8 7 H13.2 M7 0.8 V13.2"
                stroke="#fff"
                strokeWidth="0.7"
                fill="none"
              />
              <ellipse
                cx="7"
                cy="7"
                rx="6.5"
                ry="3"
                stroke="#fff"
                strokeWidth="0.7"
                fill="none"
              />
            </svg>
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
          <button
            type="button"
            className={`menu-button${isMenuOpen ? ' menu-button--open' : ''}`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="primary-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
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
            <span
              className="pill-button__icon pill-button__icon--bag"
              aria-hidden="true"
            />
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

      <div
        className={`nav-drawer${isMenuOpen ? ' nav-drawer--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="nav-drawer__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
        <nav
          id="primary-menu"
          className="nav-drawer__panel"
          aria-label="Site navigation"
        >
          <div className="nav-drawer__header">
            <span className="nav-drawer__eyebrow">Menu</span>
            <button
              type="button"
              className="nav-drawer__close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {menuSections.map((section) => (
            <div key={section.heading} className="nav-drawer__section">
              <h3>{section.heading}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={closeMenu}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
