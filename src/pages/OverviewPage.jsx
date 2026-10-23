import MapView from '../components/MapView.jsx'
import JunctionDetailsPanel from '../components/JunctionDetailsPanel.jsx'

function OverviewPage({ selectedJunction, onSelectJunction, onClearSelection }) {
  return (
    <div className="overview-dashboard-container">
      <div className="overview-content-wrapper">
        {/* Compact Page Heading */}
        <header className="overview-header">
          <div className="overview-title-block">
            <h1 className="overview-title">Traffic network</h1>
            <p className="overview-subtitle">Connaught Place &middot; Central Delhi</p>
          </div>
        </header>

        {/* Two-Column Main Workspace */}
        <div className="overview-workspace-grid">
          {/* Left Column: Interactive Mapbox Map (~65%) */}
          <section className="overview-map-column" aria-label="Regional Traffic Map">
            <div className="overview-map-card">
              <div className="map-card-header">
                <div className="map-card-title-group">
                  <span className="map-card-eyebrow">REGIONAL OVERVIEW</span>
                  <h2 className="map-card-title">Pilot Corridor Map</h2>
                </div>
                <span className="map-style-badge">Mapbox Streets</span>
              </div>

              <div className="map-card-body">
                <MapView
                  selectedJunction={selectedJunction}
                  onSelectJunction={onSelectJunction}
                />
              </div>
            </div>
          </section>

          {/* Right Column: Junction Panel (~35%) */}
          <section className="overview-panel-column" aria-label="Junction Control Panel">
            <div className="overview-panel-card">
              <JunctionDetailsPanel
                selectedJunction={selectedJunction}
                onSelectJunction={onSelectJunction}
                onClearSelection={onClearSelection}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
