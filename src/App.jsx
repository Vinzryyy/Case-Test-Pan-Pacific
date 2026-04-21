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
  return (
    <div className="page-shell">
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
