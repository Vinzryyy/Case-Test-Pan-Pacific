import { useState } from 'react'
import {
  footerBrandLogos,
  footerBrandSections,
  footerPolicies,
} from '../constants/data'
import { subscribeNewsletter } from '../api'

function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ kind: 'idle', message: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ kind: 'loading', message: '' })
    try {
      await subscribeNewsletter(email)
      setStatus({ kind: 'success', message: 'Subscribed — thanks!' })
      setEmail('')
    } catch (err) {
      setStatus({ kind: 'error', message: err.message })
    }
  }

  return (
    <footer className="site-footer" data-reveal>
      <div className="footer-shell">
        <div
          className="footer-logo-grid desktop-footer-logos"
          aria-label="Pan Pacific brands"
        >
          {footerBrandLogos.map((logo) => (
            <div key={logo} className="footer-logo-card">
              <img
                src={logo}
                alt=""
                className="footer-logo-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <div className="mobile-footer-logos" aria-label="Pan Pacific brands">
          {footerBrandSections.map((section) => (
            <div key={section.heading} className="mobile-footer-section">
              <h4 className="mobile-footer-section__heading">{section.heading}</h4>
              <div className="mobile-footer-section__logos">
                {section.logos.map((logo) => (
                  <div key={logo} className="footer-logo-card">
                    <img
                      src={logo}
                      alt=""
                      className="footer-logo-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <span className="mobile-footer-section__dot" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="footer-main">
          <section className="footer-column footer-column--about">
            <h3>About Pan Pacific</h3>
            <div className="footer-block">
              <h4>Toll-Free Room Reservation Numbers</h4>
              <div className="footer-contact-list">
                <p className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    &#9906;
                  </span>
                  <span>259 Xin Shi Road, Suzhou, Jiangsu, China 215007</span>
                </p>
                <p className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    &#9742;
                  </span>
                  <span>+86 512 6510 3388</span>
                </p>
                <p className="footer-contact-item footer-contact-item--plain">
                  <span>1 833 710 7747 (Toll-free)</span>
                </p>
                <p className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    &#9993;
                  </span>
                  <span>enquiry.ppszv@panpacific.com</span>
                </p>
              </div>
            </div>
          </section>

          <section className="footer-column">
            <div className="footer-block">
              <h4>Want to Leave Us a Message Instead?</h4>
              <a href="/" className="footer-link-button">
                Send Enquiry
              </a>
            </div>
          </section>

          <section className="footer-column">
            <div className="footer-block">
              <h4>Sign up for newsletter</h4>
              <p>Be the first to know about our exclusive deals.</p>
              <form onSubmit={onSubmit} className="footer-newsletter-form">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  disabled={status.kind === 'loading'}
                />
                <button
                  type="submit"
                  className="footer-link-button"
                  disabled={status.kind === 'loading'}
                >
                  {status.kind === 'loading' ? 'Joining…' : 'Join Now'}
                </button>
              </form>
              {status.message ? (
                <p
                  role="status"
                  className={`footer-newsletter-status footer-newsletter-status--${status.kind}`}
                >
                  {status.message}
                </p>
              ) : null}
            </div>
          </section>

          <section className="footer-column footer-column--app">
            <div className="footer-block">
              <h4>Download the App</h4>
              <img
                src="/Footer/Store.png"
                alt="App Store"
                className="footer-store-badge"
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <div className="footer-affiliates">
            <div className="footer-affiliate-copy">
              <span>global hotel alliance</span>
            </div>
            <div className="footer-affiliate-logos">
              <img
                src="/Footer/UOL.png"
                alt="UOL"
                className="footer-affiliate-logo footer-affiliate-logo--uol"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/Footer/logo pan.png"
                alt="Pan Pacific"
                className="footer-affiliate-logo footer-affiliate-logo--pan"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="footer-policy-links">
            {footerPolicies.map((item) => (
              <a key={item} href="/">
                {item}
              </a>
            ))}
          </div>

          <p className="footer-copyright">
            2026 Pan Pacific Hotels and Resorts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
