import { REGION_INFO } from '../data/junctions.js'

function Navbar({ activeTab, onTabChange }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <span className="brand-mark">TraffiQ</span>
        </div>

        <nav className="navbar-nav" aria-label="Operational views navigation">
          <button
            type="button"
            className={`nav-item ${activeTab === 'overview' ? 'is-active' : ''}`}
            onClick={() => onTabChange('overview')}
          >
            Overview
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'junctions' ? 'is-active' : ''}`}
            onClick={() => onTabChange('junctions')}
          >
            Junctions
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'analytics' ? 'is-active' : ''}`}
            onClick={() => onTabChange('analytics')}
          >
            Analytics
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'emergency' ? 'is-active' : ''}`}
            onClick={() => onTabChange('emergency')}
          >
            Emergency Events
          </button>
        </nav>
      </div>

      <div className="navbar-center">
        <div className="region-badge" title="Active regional monitoring area">
          <span className="region-icon" aria-hidden="true">📍</span>
          <span className="region-label">Selected area:</span>
          <span className="region-name">{REGION_INFO.name}</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="demo-indicator" title="Operating in demonstration mode">
          <span className="demo-indicator-dot" />
          <span className="demo-indicator-text">Demo Mode</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
