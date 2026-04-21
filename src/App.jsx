import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Trending from './components/Trending'
import EditorsPick from './components/EditorsPick'
import Journey from './components/Journey'
import Experiences from './components/Experiences'
import Destinations from './components/Destinations'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const elements = document.querySelectorAll('[data-reveal]')
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-shell" id="top">
      <Header />
      <main>
        <Hero />
        <Trending />
        <EditorsPick />
        <Journey />
        <Experiences />
        <Destinations />
      </main>
      <Footer />
    </div>
  )
}

export default App
