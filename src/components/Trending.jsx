import { trendingItems } from '../constants/data'

function Trending() {
  return (
    <section className="trending-section" id="trending">
      <div className="section-heading">
        <h2>What&apos;s trending</h2>
        <p>
          Fresh ideas, popular picks, and travel inspiration that&apos;s having
          its moment.
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
  )
}

export default Trending
