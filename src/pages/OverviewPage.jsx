import { useState, useMemo } from 'react'
import MapView from '../components/MapView.jsx'
import JunctionDetailsPanel from '../components/JunctionDetailsPanel.jsx'
import { JUNCTIONS } from '../data/junctions.js'

function OverviewPage({ selectedJunction, onSelectJunction, onClosePanel }) {
  const [searchQuery, setSearchQuery] = useState('')

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []
    return JUNCTIONS.filter((j) => {
      return (
        j.name.toLowerCase().includes(query) ||
        j.code.toLowerCase().includes(query) ||
        j.corridor.toLowerCase().includes(query) ||
        j.crossStreet.toLowerCase().includes(query) ||
        j.area.toLowerCase().includes(query)
      )
    })
  }, [searchQuery])

  const handleSearchResultClick = (junction) => {
    onSelectJunction(junction)
    setSearchQuery('')
  }

  return (
    <div className="overview-page">
      {/* Compact Local Junction Search Box */}
      <div className="map-search-container" role="search">
        <div className="map-search-bar">
          <span className="search-icon" aria-hidden="true">&#x1F50D;</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search pilot junctions (e.g. J1, Tolstoy)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search pilot junctions"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        {searchQuery.trim() !== '' && (
          <div className="search-results-dropdown" role="listbox">
            {searchResults.length > 0 ? (
              searchResults.map((j) => (
                <button
                  key={j.id}
                  type="button"
                  className="search-result-item"
                  onClick={() => handleSearchResultClick(j)}
                >
                  <span className="result-code">{j.code}</span>
                  <div className="result-info">
                    <span className="result-name">{j.name}</span>
                    <span className="result-area">{j.area}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="search-no-results">
                No candidate junctions match &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Interactive Geographic Map */}
      <MapView
        selectedJunction={selectedJunction}
        onSelectJunction={onSelectJunction}
        isPanelOpen={Boolean(selectedJunction)}
      />

      {/* Compact Junction Details Panel */}
      {selectedJunction && (
        <JunctionDetailsPanel
          junction={selectedJunction}
          onClose={onClosePanel}
        />
      )}
    </div>
  )
}

export default OverviewPage
