import { experienceTabs, romanticCards } from '../constants/data'

function Experiences() {
  return (
    <section className="experiences-section" id="experiences">
      <div className="experience-tabs" aria-label="Experience categories">
        {experienceTabs.map((tab) => (
          <article
            key={tab.title}
            className="experience-tab"
            style={{ '--experience-image': `url(${tab.image})` }}
          >
            <div className="experience-tab__overlay" />
            <h3>{tab.title}</h3>
            <span className="experience-tab__chevron" aria-hidden="true">
              &or;
            </span>
          </article>
        ))}
      </div>

      <div
        className="romantic-hero"
        id="romantic"
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
