import { useEffect, useState } from 'react'
import { fetchDestinations } from '../api'

function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [activeDestination, setActiveDestination] = useState(null)

  useEffect(() => {
    fetchDestinations()
      .then((rows) => {
        setDestinations(rows)
        if (rows.length > 0) setActiveDestination(rows[0].name)
      })
      .catch((err) => console.error('destinations failed', err))
  }, [])

  const activeDest =
    destinations.find((dest) => dest.name === activeDestination) ?? destinations[0]

  if (!activeDest) return <section className="destinations-section" aria-busy="true" />

  return (
    <section className="destinations-section" id="destinations" data-reveal>
      <div className="destinations-layout">
        <div className="destinations-copy">
          <h2>Explore your next adventure with Pan Pacific</h2>
          <p>
            Discover your next adventure with our handpicked travel
            inspiration, exciting guides, and spotlighted destinations from Pan
            Pacific that will ignite your wanderlust!
          </p>

          <div
            className="destinations-list desktop-destinations"
            aria-label="Destination list"
          >
            {destinations.map((dest) => {
              const isActive = dest.name === activeDestination
              return (
                <button
                  key={dest.name}
                  type="button"
                  onClick={() => setActiveDestination(dest.name)}
                  aria-pressed={isActive}
                  className={`destination-item${
                    isActive ? ' destination-item--active' : ''
                  }`}
                >
                  <span>{dest.name}</span>
                  {isActive ? <span aria-hidden="true">&rarr;</span> : null}
                </button>
              )
            })}
            <button type="button" className="destination-item">
              <span>More destinations</span>
            </button>
          </div>
        </div>

        <div className="destinations-media">
          <img
            src={activeDest.image}
            alt={`${activeDest.name} destination view`}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="mobile-destinations">
        <div className="mobile-destinations__header">
          <h2>Explore the world with Pan Pacific</h2>
          <p>
            Discover your next adventure with our handpicked travel
            inspiration, exciting guides, and spotlighted destinations from Pan
            Pacific that will ignite your wanderlust!
          </p>
        </div>
        <div
          className="mobile-destinations__cards"
          aria-label="Destinations — swipe to browse"
        >
          {destinations.map((dest) => (
            <button
              key={dest.name}
              type="button"
              onClick={() => setActiveDestination(dest.name)}
              className="mobile-dest-card"
              style={{ backgroundImage: `url(${dest.image})` }}
              aria-label={`View ${dest.name} destination`}
            >
              <div className="mobile-dest-card__overlay" />
              <h3>{dest.name}</h3>
            </button>
          ))}
        </div>
        <button type="button" className="mobile-destinations__more">
          Show More
        </button>
      </div>
    </section>
  )
}

export default Destinations
