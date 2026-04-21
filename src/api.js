const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function getJSON(path) {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) throw new Error(`${path} failed (${res.status})`)
  return res.json()
}

export const fetchHeroSlides = () => getJSON('/api/hero-slides')
export const fetchDestinations = () => getJSON('/api/destinations')
export const fetchJourneys = () => getJSON('/api/journeys')

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_URL}/api/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `request failed (${res.status})`)
  }
  return res.json()
}
