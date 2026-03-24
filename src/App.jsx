import { useState, useEffect, useCallback } from 'react'
import './App.css'

const TOTAL_SLIDES = 17

const slideNames = [
  "Cover",
  "Market Overview",
  "The Great Rotation",
  "Three Themes",
  "Iran Conflict Primer",
  "Strait of Hormuz",
  "Inflation Fears",
  "AI Agents Revolution",
  "Jevons Paradox",
  "Fastest Growing Companies",
  "AI Valuations",
  "Infrastructure Sprint",
  "Dispersion Extremes",
  "Global Rotation",
  "Opportunity & Caution",
  "Key Takeaways",
  "Disclosures",
]

function App() {
  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNav, setShowNav] = useState(true)

  const next = useCallback(() => {
    setCurrent(c => Math.min(c + 1, TOTAL_SLIDES - 1))
  }, [])

  const prev = useCallback(() => {
    setCurrent(c => Math.max(c - 1, 0))
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      if (e.key === 'Escape') setIsFullscreen(false)
      if (e.key === 'f' || e.key === 'F') setIsFullscreen(fs => !fs)
      if (e.key === 'n' || e.key === 'N') setShowNav(n => !n)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  const slideNum = String(current + 1).padStart(2, '0')
  const slidePath = `/slides/slide-${slideNum}.jpg`

  return (
    <div className={`app ${isFullscreen ? 'fullscreen' : ''}`}>
      <header className="top-bar">
        <div className="brand">
          <span className="brand-accent">Q1 2026</span>
          <span className="brand-title">Market Update: Navigating Crosscurrents</span>
        </div>
        <div className="controls">
          <button className="control-btn" onClick={() => setShowNav(n => !n)} title="Toggle navigation (N)">
            {showNav ? '☰' : '☰'}
          </button>
          <button className="control-btn" onClick={() => setIsFullscreen(f => !f)} title="Toggle fullscreen (F)">
            {isFullscreen ? '✕' : '⛶'}
          </button>
        </div>
      </header>

      <div className="main-area">
        {showNav && (
          <nav className="side-nav">
            {slideNames.map((name, i) => (
              <button
                key={i}
                className={`nav-item ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
              >
                <span className="nav-num">{i + 1}</span>
                <span className="nav-label">{name}</span>
              </button>
            ))}
          </nav>
        )}

        <div className="slide-area" onClick={next}>
          <div className="slide-container">
            <img
              src={slidePath}
              alt={`Slide ${current + 1}: ${slideNames[current]}`}
              className="slide-img"
              draggable={false}
            />
          </div>

          <div className="bottom-bar">
            <button className="nav-btn" onClick={(e) => { e.stopPropagation(); prev() }} disabled={current === 0}>
              ← Previous
            </button>
            <div className="progress-info">
              <span className="slide-counter">{current + 1} / {TOTAL_SLIDES}</span>
              <span className="slide-name">{slideNames[current]}</span>
            </div>
            <button className="nav-btn" onClick={(e) => { e.stopPropagation(); next() }} disabled={current === TOTAL_SLIDES - 1}>
              Next →
            </button>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
