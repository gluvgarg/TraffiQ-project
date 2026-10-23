import { DEMO_TRAFFIC_DATA } from '../data/demoTrafficData.js'

function JunctionDetailsPanel({ selectedJunction, onSelectJunction, onClearSelection }) {
  // -------------------------------------------------------------------------
  // Case A: A junction is currently selected -> show simulated demo signal details
  // -------------------------------------------------------------------------
  if (selectedJunction) {
    // Find the latest demo record for this junction
    const demoData =
      DEMO_TRAFFIC_DATA.find((j) => j.id === selectedJunction.id) || selectedJunction

    return (
      <aside className="junction-sidebar-panel" aria-label="Selected Junction Details">
        <div className="panel-header-selected">
          <button
            type="button"
            className="btn-back-to-list"
            onClick={onClearSelection}
            title="Return to junction list"
          >
            &larr; Back to junction list
          </button>

          <div className="panel-selected-title-block">
            <div className="panel-header-badges">
              <span className="panel-code-badge">{demoData.code}</span>
              <span className="panel-demo-tag">DEMO DATA</span>
            </div>
            <h2 className="panel-title">{demoData.name}</h2>
            <span className="panel-road-names">
              {demoData.corridor} &times; {demoData.crossStreet}
            </span>
          </div>
        </div>

        <div className="panel-body">
          {/* 1. Control Mode */}
          <div className="signal-metric-card">
            <span className="metric-label">Control Mode</span>
            <div className="metric-value-row">
              <span className="mode-badge-ai">{demoData.mode}</span>
            </div>
          </div>

          {/* 2. Current Simulated Signal Phase */}
          <div className="signal-metric-card">
            <span className="metric-label">Current Simulated Signal Phase</span>
            <div className="phase-indicator-row">
              <div className="mini-traffic-light" aria-hidden="true">
                <span className={`mini-lamp red ${demoData.signalLampState === 'red' ? 'active' : ''}`} />
                <span className={`mini-lamp amber ${demoData.signalLampState === 'amber' ? 'active' : ''}`} />
                <span className={`mini-lamp green ${demoData.signalLampState === 'green' ? 'active' : ''}`} />
              </div>
              <span className="phase-name">{demoData.activePhase}</span>
            </div>
          </div>

          {/* 3. Remaining Green Time */}
          <div className="signal-metric-card">
            <span className="metric-label">Remaining Green Time</span>
            <p className="metric-primary-value">
              <strong>{demoData.greenTimeRemaining}</strong> seconds
            </p>
          </div>

          {/* 4. Vehicles Waiting */}
          <div className="signal-metric-card">
            <span className="metric-label">Vehicles Waiting</span>
            <p className="metric-primary-value">
              <strong>{demoData.vehiclesWaiting}</strong> vehicles
            </p>
          </div>

          {/* 5. Estimated Demo Queue Length */}
          <div className="signal-metric-card">
            <span className="metric-label">Estimated Demo Queue Length</span>
            <p className="metric-primary-value">
              <strong>{demoData.queueLength}</strong> metres
            </p>
          </div>

          {/* Operator Notice */}
          <div className="panel-disclaimer-notice">
            <span className="disclaimer-title">SYNTHETIC OPERATOR RECORD</span>
            <p className="disclaimer-text">
              These values are synthetic demonstration metrics for interface testing.
              Physical traffic signal controllers are not yet connected to this console.
            </p>
          </div>
        </div>
      </aside>
    )
  }

  // -------------------------------------------------------------------------
  // Case B: Default state -> show compact list of candidate junctions
  // -------------------------------------------------------------------------
  return (
    <aside className="junction-sidebar-panel" aria-label="Candidate Junctions List">
      <div className="panel-header-default">
        <div className="panel-header-title">
          <span className="panel-eyebrow">PILOT CORRIDOR</span>
          <h2 className="panel-title">Monitored Signals</h2>
        </div>
        <span className="panel-count-pill">{DEMO_TRAFFIC_DATA.length} demo signals</span>
      </div>

      <div className="panel-body panel-list-body">
        <p className="panel-list-help">
          Select a junction below or click its map signal to inspect simulated timings and phase states.
        </p>

        <div className="junction-cards-list" role="list">
          {DEMO_TRAFFIC_DATA.map((junction) => (
            <button
              key={junction.id}
              type="button"
              className="junction-summary-card"
              onClick={() => onSelectJunction(junction)}
              role="listitem"
            >
              <div className="card-top-row">
                <div className="card-id-group">
                  <span className="card-code-pill">{junction.code}</span>
                  <span className="card-name">{junction.name}</span>
                </div>
                <span className="card-demo-badge">DEMO</span>
              </div>

              <div className="card-meta-row">
                <span className="card-cross-street">
                  Cross street: <strong>{junction.crossStreet}</strong>
                </span>
              </div>

              <div className="card-phase-preview-row">
                <div className="card-phase-indicator">
                  <span className="card-phase-dot green" />
                  <span className="card-phase-text">{junction.activePhase}</span>
                </div>
                <span className="card-green-time">{junction.greenTimeRemaining}s green</span>
              </div>

              <div className="card-status-row">
                <span className="card-mode-tag">{junction.mode}</span>
                <span className="card-inspect-action">Inspect signal &rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default JunctionDetailsPanel
