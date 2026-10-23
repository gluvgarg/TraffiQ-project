import { useState, useMemo } from 'react'
import { JUNCTIONS, REGION_INFO } from '../data/junctions.js'

function JunctionsPage({ onViewOnMap }) {
  const [filterQuery, setFilterQuery] = useState('')

  const filteredJunctions = useMemo(() => {
    const q = filterQuery.trim().toLowerCase()
    if (!q) return JUNCTIONS
    return JUNCTIONS.filter((j) => {
      return (
        j.name.toLowerCase().includes(q) ||
        j.code.toLowerCase().includes(q) ||
        j.corridor.toLowerCase().includes(q) ||
        j.crossStreet.toLowerCase().includes(q) ||
        j.area.toLowerCase().includes(q)
      )
    })
  }, [filterQuery])

  return (
    <div className="page-container">
      <div className="page-content-wrapper">
        <header className="page-header">
          <div className="page-title-block">
            <h1 className="page-title">Junctions</h1>
            <p className="page-subtitle">
              Pilot study area: <strong>{REGION_INFO.name}</strong>. Candidate junction locations
              monitored for adaptive traffic signal deployment.
            </p>
          </div>

          <div className="table-search-box">
            <span className="search-icon" aria-hidden="true">&#x1F50D;</span>
            <input
              type="text"
              className="table-search-input"
              placeholder="Filter candidate junctions..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              aria-label="Filter candidate junctions"
            />
            {filterQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setFilterQuery('')}
                aria-label="Clear filter"
              >
                &times;
              </button>
            )}
          </div>
        </header>

        <section className="table-card">
          <div className="table-scroll-wrapper">
            <table className="junctions-table">
              <thead>
                <tr>
                  <th scope="col" className="col-code">Code</th>
                  <th scope="col" className="col-name">Junction Name</th>
                  <th scope="col" className="col-area">Area</th>
                  <th scope="col" className="col-coords">Coordinates</th>
                  <th scope="col" className="col-status">Status</th>
                  <th scope="col" className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJunctions.length > 0 ? (
                  filteredJunctions.map((junction) => (
                    <tr key={junction.id} className="junction-row">
                      <td className="col-code">
                        <span className="code-pill">{junction.code}</span>
                      </td>
                      <td className="col-name">
                        <span className="junction-table-name">{junction.name}</span>
                        <span className="junction-table-corridor">
                          {junction.corridor} &times; {junction.crossStreet}
                        </span>
                      </td>
                      <td className="col-area">{junction.area}</td>
                      <td className="col-coords">
                        <code>
                          {junction.coordinates.lat.toFixed(4)}&deg; N, {junction.coordinates.lng.toFixed(4)}&deg; E
                        </code>
                      </td>
                      <td className="col-status">
                        <span className="status-tag-neutral">
                          <span className="status-dot-sm" />
                          {junction.status}
                        </span>
                      </td>
                      <td className="col-actions">
                        <button
                          type="button"
                          className="btn-view-map"
                          onClick={() => onViewOnMap(junction)}
                          title={`View ${junction.name} on map`}
                        >
                          View on map
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="table-empty-cell">
                      No candidate junctions found matching &ldquo;{filterQuery}&rdquo;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <footer className="table-footer">
            <span>Showing {filteredJunctions.length} of {JUNCTIONS.length} candidate pilot locations</span>
            <span className="footer-meta">Verification: OpenStreetMap Geographic Coordinates</span>
          </footer>
        </section>
      </div>
    </div>
  )
}

export default JunctionsPage
