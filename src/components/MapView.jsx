import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { REGION_INFO, JUNCTIONS } from '../data/junctions.js'

function MapView({ selectedJunction, onSelectJunction }) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const popupsRef = useRef({})
  const selectedRef = useRef(selectedJunction)

  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

  // Keep a ref to the currently selected junction for event callbacks
  useEffect(() => {
    selectedRef.current = selectedJunction
  }, [selectedJunction])

  // Track map initialization error state (e.g. invalid token)
  const [mapError, setMapError] = useState(null)

  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current) return

    mapboxgl.accessToken = mapboxToken

    let map = null

    try {
      map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: REGION_INFO.mapboxCenter,
        zoom: REGION_INFO.defaultZoom,
        minZoom: 13,
        maxZoom: 18,
        attributionControl: true,
      })

      mapRef.current = map

      // Add navigation controls (zoom in/out and compass)
      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }),
        'top-right'
      )

      // Fit map to show pilot area
      map.on('load', () => {
        map.fitBounds(REGION_INFO.mapboxBounds, {
          padding: 50,
          maxZoom: 16,
          duration: 0,
        })
      })

      map.on('error', (e) => {
        if (e && e.error && e.error.status === 401) {
          setMapError('Invalid Mapbox access token. Please verify VITE_MAPBOX_ACCESS_TOKEN.')
        }
      })

      // Add junction markers
      JUNCTIONS.forEach((junction) => {
        const coords = [junction.coordinates.lng, junction.coordinates.lat]

        // Create marker DOM node
        const markerEl = document.createElement('button')
        markerEl.type = 'button'
        markerEl.className = 'mapbox-junction-marker'
        markerEl.id = `marker-${junction.id}`
        markerEl.setAttribute('aria-label', `${junction.code}: ${junction.name}`)

        const codeSpan = document.createElement('span')
        codeSpan.className = 'marker-code-badge'
        codeSpan.textContent = junction.code
        markerEl.appendChild(codeSpan)

        // Create tooltip popup (shown on hover or when selected)
        const popup = new mapboxgl.Popup({
          offset: 14,
          closeButton: false,
          closeOnClick: false,
          className: 'mapbox-junction-tooltip',
        }).setHTML(
          `<div class="map-tooltip-content"><strong class="tooltip-badge">${junction.code}</strong> <span class="tooltip-label">${junction.name}</span></div>`
        )

        popupsRef.current[junction.id] = popup

        // Show tooltip on hover
        markerEl.addEventListener('mouseenter', () => {
          popup.setLngLat(coords).addTo(map)
        })

        // Hide tooltip on mouse leave unless this junction is currently selected
        markerEl.addEventListener('mouseleave', () => {
          if (selectedRef.current?.id !== junction.id) {
            popup.remove()
          }
        })

        // Marker click handler
        markerEl.addEventListener('click', (e) => {
          e.stopPropagation()
          e.preventDefault()
          onSelectJunction(junction)
        })

        const marker = new mapboxgl.Marker({
          element: markerEl,
          anchor: 'center',
        })
          .setLngLat(coords)
          .addTo(map)

        markersRef.current.push({ id: junction.id, marker, element: markerEl, popup, coords })
      })
    } catch (err) {
      setTimeout(() => {
        setMapError(err.message || 'Error initializing Mapbox map.')
      }, 0)
    }

    // Handle container resizing cleanly
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.resize()
      }
    })

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
      markersRef.current.forEach(({ marker, popup }) => {
        popup.remove()
        marker.remove()
      })
      markersRef.current = []
      popupsRef.current = {}
      if (map) {
        map.remove()
      }
      mapRef.current = null
    }
  }, [mapboxToken, onSelectJunction])

  // Update marker styles and map position when selectedJunction changes
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markersRef.current.forEach(({ id, element, popup, coords }) => {
      const isSelected = selectedJunction?.id === id

      if (isSelected) {
        element.classList.add('is-selected')
        popup.setLngLat(coords).addTo(map)
      } else {
        element.classList.remove('is-selected')
        popup.remove()
      }
    })

    if (selectedJunction) {
      map.flyTo({
        center: [selectedJunction.coordinates.lng, selectedJunction.coordinates.lat],
        zoom: 15.5,
        duration: 600,
        essential: true,
      })
    }
  }, [selectedJunction])

  // If no Mapbox access token is configured, show a helpful setup guide
  if (!mapboxToken || mapError) {
    return (
      <div className="mapbox-setup-notice" role="alert">
        <div className="setup-notice-card">
          <div className="setup-notice-badge">Configuration Required</div>
          <h3 className="setup-notice-title">Mapbox Access Token Missing</h3>
          <p className="setup-notice-desc">
            To view the interactive regional traffic map, configure your Mapbox public access token.
          </p>
          <div className="setup-notice-code">
            <code>VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1I...</code>
          </div>
          <p className="setup-notice-help">
            1. Create a <code>.env.local</code> file in the project root.<br />
            2. Add your Mapbox token (copy from <code>.env.example</code>).<br />
            3. Restart the development server with <code>npm run dev</code>.
          </p>
          {mapError && (
            <div className="setup-notice-error">
              <strong>Error details:</strong> {mapError}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mapbox-map-wrapper">
      <div
        ref={mapContainerRef}
        className="mapbox-canvas-container"
        aria-label="Mapbox traffic operations map"
      />
    </div>
  )
}

export default MapView
