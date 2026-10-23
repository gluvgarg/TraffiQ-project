import { REGION_INFO } from '../data/junctions.js'

function AnalyticsPage() {
  return (
    <div className="page-container">
      <div className="page-content-wrapper">
        <header className="page-header">
          <div className="page-title-block">
            <h1 className="page-title">Analytics</h1>
            <p className="page-subtitle">
              Traffic performance monitoring for <strong>{REGION_INFO.name}</strong>.
            </p>
          </div>
        </header>

        <section className="empty-state-card" aria-label="Analytics Status">
          <div className="empty-state-inner">
            <div className="empty-state-badge">Telemetry Status</div>
            <h2 className="empty-state-title">Traffic performance analytics not connected</h2>
            <p className="empty-state-desc">
              Traffic flow performance, delay reductions, and signal optimization metrics
              will become available once regional simulation engines or physical controller
              telemetry are linked to this interface.
            </p>

            <div className="empty-state-details-grid">
              <div className="empty-state-detail-item">
                <span className="detail-item-label">Target Pilot Area</span>
                <span className="detail-item-value">{REGION_INFO.name}</span>
              </div>
              <div className="empty-state-detail-item">
                <span className="detail-item-label">Candidate Nodes</span>
                <span className="detail-item-value">2 junctions registered</span>
              </div>
              <div className="empty-state-detail-item">
                <span className="detail-item-label">Backend Stream</span>
                <span className="detail-item-value">Pending integration</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AnalyticsPage
