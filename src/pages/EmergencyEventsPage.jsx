import { REGION_INFO } from '../data/junctions.js'

function EmergencyEventsPage() {
  return (
    <div className="page-container">
      <div className="page-content-wrapper">
        <header className="page-header">
          <div className="page-title-block">
            <h1 className="page-title">Emergency Events</h1>
            <p className="page-subtitle">
              Emergency vehicle priority monitoring for <strong>{REGION_INFO.name}</strong>.
            </p>
          </div>
        </header>

        <section className="empty-state-card" aria-label="Emergency Feed Status">
          <div className="empty-state-inner">
            <div className="empty-state-badge">Dispatch Feed</div>
            <h2 className="empty-state-title">Emergency event feed is not connected yet.</h2>
            <p className="empty-state-desc">
              This operational view will display verified emergency transit events, active priority
              signal requests, and green corridor preemptions once emergency dispatch telemetry
              is integrated.
            </p>

            <div className="empty-state-details-grid">
              <div className="empty-state-detail-item">
                <span className="detail-item-label">Monitoring Area</span>
                <span className="detail-item-value">{REGION_INFO.name}</span>
              </div>
              <div className="empty-state-detail-item">
                <span className="detail-item-label">Dispatch Integration</span>
                <span className="detail-item-value">Awaiting regional emergency feed</span>
              </div>
              <div className="empty-state-detail-item">
                <span className="detail-item-label">Signal Preemption</span>
                <span className="detail-item-value">Standby mode</span>
              </div>
            </div>

            <div className="empty-state-notice">
              <strong>Notice:</strong> Emergency priority routes and preemption overrides require
              authenticated integration with municipal traffic control and regional emergency services.
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default EmergencyEventsPage
