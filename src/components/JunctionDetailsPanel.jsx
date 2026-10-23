import { JUNCTIONS } from '../data/junctions.js'

function JunctionDetailsPanel({ selectedJunction, onSelectJunction, onClearSelection }) {
  // -------------------------------------------------------------------------
  // Case A: A junction is currently selected -> show detailed metadata
  // -------------------------------------------------------------------------
  if (selectedJunction) {
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
            <div className="panel-eyebrow-row">
              <span className="panel-code-badge">{selectedJunction.code}</span>
              <span className="panel-eyebrow">{selectedJunction.type}</span>
            </div>
            <h2 className="panel-title">{selectedJunction.name}</h2>
          </div>
        </div>

        <div className="panel-body">
          <div className="panel-section">
            <span className="section-label">Operational Status</span>
            <div className="status-badge-neutral">
              <span className="status-badge-dot" />
              <span className="status-badge-text">{selectedJunction.status}</span>
            </div>
          </div>

          <div className="panel-section">
            <span className="section-label">Geographic Area</span>
            <p className="section-value">{selectedJunction.area}</p>
            <p className="section-subvalue">
              {selectedJunction.corridor} &times; {selectedJunction.crossStreet}
            </p>
          </div>

          <div className="panel-section">
            <span className="section-label">Coordinates</span>
            <div className="coordinates-box">
              <div className="coordinate-row">
                <span className="coord-label">Latitude:</span>
                <span className="coord-value">{selectedJunction.coordinates.lat.toFixed(4)}&deg; N</span>
              </div>
              <div className="coordinate-row">
                <span className="coord-label">Longitude:</span>
                <span className="coord-value">{selectedJunction.coordinates.lng.toFixed(4)}&deg; E</span>
              </div>
            </div>
          </div>

          {selectedJunction.verification && (
            <div className="panel-section">
              <span className="section-label">Location Verification</span>
              <p className="verification-text">{selectedJunction.verification.source}</p>
            </div>
          )}

          <div className="panel-section panel-section-notice">
            <span className="section-label">Telemetry Notice</span>
            <p className="notice-text">
              Signal timings, vehicle density, and adaptive traffic measurements will appear here
              once regional backend telemetry is connected.
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
          <h2 className="panel-title">Candidate Junctions</h2>
        </div>
        <span className="panel-count-pill">{JUNCTIONS.length} monitored</span>
      </div>

      <div className="panel-body panel-list-body">
        <p className="panel-list-help">
          Select a junction below or click its map marker to inspect coordinates and telemetry readiness.
        </p>

        <div className="junction-cards-list" role="list">
          {JUNCTIONS.map((junction) => (
            <button
              key={junction.id}
              type="button"
              className="junction-summary-card"
              onClick={() => onSelectJunction(junction)}
              role="listitem"
            >
              <div className="card-top-row">
                <span className="card-code-pill">{junction.code}</span>
                <span className="card-name">{junction.name}</span>
              </div>

              <div className="card-meta-row">
                <span className="card-cross-street">
                  Cross street: <strong>{junction.crossStreet}</strong>
                </span>
              </div>

              <div className="card-status-row">
                <span className="status-badge-neutral-compact">
                  <span className="status-badge-dot" />
                  {junction.status}
                </span>
                <span className="card-inspect-action">Inspect &rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default JunctionDetailsPanel
