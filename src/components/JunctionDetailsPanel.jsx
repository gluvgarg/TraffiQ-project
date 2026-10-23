function JunctionDetailsPanel({ junction, onClose }) {
  if (!junction) return null

  return (
    <aside className="junction-panel" aria-label="Junction Details">
      <div className="panel-header">
        <div className="panel-header-title">
          <div className="panel-eyebrow-row">
            <span className="panel-code-badge">{junction.code}</span>
            <span className="panel-eyebrow">{junction.type}</span>
          </div>
          <h2 className="panel-title">{junction.name}</h2>
        </div>
        <button
          type="button"
          className="panel-close-btn"
          onClick={onClose}
          aria-label="Close details panel"
          title="Close panel and restore full map"
        >
          &times;
        </button>
      </div>

      <div className="panel-body">
        <div className="panel-section">
          <span className="section-label">Operational Status</span>
          <div className="status-badge-neutral">
            <span className="status-badge-dot" />
            <span className="status-badge-text">{junction.status}</span>
          </div>
        </div>

        <div className="panel-section">
          <span className="section-label">Geographic Area</span>
          <p className="section-value">{junction.area}</p>
          <p className="section-subvalue">
            {junction.corridor} &times; {junction.crossStreet}
          </p>
        </div>

        <div className="panel-section">
          <span className="section-label">Coordinates</span>
          <div className="coordinates-box">
            <div className="coordinate-row">
              <span className="coord-label">Latitude:</span>
              <span className="coord-value">{junction.coordinates.lat.toFixed(4)}&deg; N</span>
            </div>
            <div className="coordinate-row">
              <span className="coord-label">Longitude:</span>
              <span className="coord-value">{junction.coordinates.lng.toFixed(4)}&deg; E</span>
            </div>
          </div>
        </div>

        {junction.verification && (
          <div className="panel-section">
            <span className="section-label">Location Verification</span>
            <p className="verification-text">{junction.verification.source}</p>
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

export default JunctionDetailsPanel
