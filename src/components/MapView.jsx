import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { REGION_INFO, JUNCTIONS } from '../data/junctions.js'

// Fix default Leaflet asset path resolution in bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Factory for compact circular markers labelled J1, J2
function createJunctionIcon(code, isSelected) {
  return L.divIcon({
    className: 'junction-marker-wrapper',
    html: `
      <div class="junction-marker-disc ${isSelected ? 'is-selected' : ''}" title="${code}">
        <span class="marker-code-text">${code}</span>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  })
}

// Controller to manage bounds, panTo, and resize triggers
function MapController({ selectedJunction, isPanelOpen }) {
  const map = useMap()
  const initialFitRef = useRef(false)

  // Fit to pilot area bounds on initial render
  useEffect(() => {
    if (!initialFitRef.current) {
      initialFitRef.current = true
      map.fitBounds(REGION_INFO.pilotAreaBounds, {
        padding: [60, 60],
        maxZoom: 16,
      })
    }
  }, [map])

  // Center on selected junction
  useEffect(() => {
    if (selectedJunction) {
      map.panTo(
        [selectedJunction.coordinates.lat, selectedJunction.coordinates.lng],
        { animate: true, duration: 0.5 }
      )
    }
  }, [selectedJunction, map])

  // Invalidate map dimensions when details panel opens or closes
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 220)
    return () => clearTimeout(timer)
  }, [isPanelOpen, map])

  return null
}

function MapView({ selectedJunction, onSelectJunction, isPanelOpen }) {
  return (
    <div className={`map-wrapper ${isPanelOpen ? 'has-panel-open' : ''}`}>
      <MapContainer
        center={REGION_INFO.center}
        zoom={REGION_INFO.defaultZoom}
        minZoom={13}
        maxZoom={18}
        scrollWheelZoom={true}
        className="leaflet-map-canvas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapController
          selectedJunction={selectedJunction}
          isPanelOpen={isPanelOpen}
        />

        {JUNCTIONS.map((junction) => {
          const isSelected = selectedJunction?.id === junction.id

          return (
            <Marker
              key={junction.id}
              position={[junction.coordinates.lat, junction.coordinates.lng]}
              icon={createJunctionIcon(junction.code, isSelected)}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e)
                  onSelectJunction(junction)
                },
              }}
            >
              <Tooltip
                permanent
                direction="top"
                offset={[0, -14]}
                className={`junction-map-tooltip ${isSelected ? 'is-selected' : ''}`}
              >
                <strong className="tooltip-tag">{junction.code}</strong> {junction.name}
              </Tooltip>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default MapView
