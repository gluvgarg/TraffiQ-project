import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { REGION_INFO } from '../data/junctions.js'
import { DEMO_TRAFFIC_DATA } from '../data/demoTrafficData.js'

function MapView({ selectedJunction, onSelectJunction }) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const popupsRef = useRef({})
  const selectedRef = useRef(selectedJunction)

  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

  // Keep a ref to currently selected junction for event callbacks
  useEffect(() => {
    selectedRef.current = selectedJunction
  }, [selectedJunction])

  // Track map error state
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
          padding: 60,
          maxZoom: 16,
          duration: 0,
        })
      })

      map.on('error', (e) => {
        if (e && e.error && e.error.status === 401) {
          setMapError('Invalid Mapbox access token. Please verify VITE_MAPBOX_ACCESS_TOKEN.')
        }
      })

      // Add compact, recognisable traffic-signal markers
      DEMO_TRAFFIC_DATA.forEach((junction) => {
        const coords = [junction.coordinates.lng, junction.coordinates.lat]

        // Create the traffic-signal marker DOM element
        const markerEl = document.createElement('button')
        markerEl.type = 'button'
        markerEl.className = 'traffic-signal-marker'
        markerEl.id = `marker-${junction.id}`
        markerEl.setAttribute(
          'aria-label',
          `${junction.code}: ${junction.name} - Simulated signal: ${junction.activePhase}`
        )

        // Marker top ID badge (J1, J2)
        const badgeEl = document.createElement('div')
        badgeEl.className = 'signal-marker-badge'
        badgeEl.textContent = junction.code
        markerEl.appendChild(badgeEl)

        // Traffic signal housing with 3 lamps: red, amber, green
        const housingEl = document.createElement('div')
        housingEl.className = 'signal-marker-housing'

        // Red lamp
        const redLamp = document.createElement('div')
        redLamp.className = `signal-lamp lamp-red ${junction.signalLampState === 'red' ? 'lamp-active' : 'lamp-dim'}`
        housingEl.appendChild(redLamp)

        // Amber lamp
        const amberLamp = document.createElement('div')
        amberLamp.className = `signal-lamp lamp-amber ${junction.signalLampState === 'amber' ? 'lamp-active' : 'lamp-dim'}`
        housingEl.appendChild(amberLamp)

        // Green lamp (active for J1 & J2 in demo data)
        const greenLamp = document.createElement('div')
        greenLamp.className = `signal-lamp lamp-green ${junction.signalLampState === 'green' ? 'lamp-active' : 'lamp-dim'}`
        housingEl.appendChild(greenLamp)

        markerEl.appendChild(housingEl)

        // Anchor pole
        const poleEl = document.createElement('div')
        poleEl.className = 'signal-marker-pole'
        markerEl.appendChild(poleEl)

        // Tooltip popup (shows junction name and demo phase on hover)
        const popup = new mapboxgl.Popup({
          offset: 16,
          closeButton: false,
          closeOnClick: false,
          className: 'mapbox-signal-tooltip',
        }).setHTML(`
          <div class="map-signal-tooltip-content">
            <div class="tooltip-header">
              <strong class="tooltip-badge">${junction.code}</strong>
              <span class="tooltip-title">${junction.name}</span>
            </div>
            <div class="tooltip-phase-row">
              <span class="phase-dot phase-green"></span>
              <span class="phase-text">${junction.activePhase} (${junction.greenTimeRemaining}s)</span>
              <span class="phase-demo-tag">DEMO</span>
            </div>
          </div>
        `)

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

        // Click handler to select junction
        markerEl.addEventListener('click', (e) => {
          e.stopPropagation()
          e.preventDefault()
          onSelectJunction(junction)
        })

        // Anchor at bottom of pole so base sits exactly on the intersection
        const marker = new mapboxgl.Marker({
          element: markerEl,
          anchor: 'bottom',
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

  // Update marker selection styles and map position when selectedJunction changes
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
        aria-label="Mapbox regional traffic operations map"
      />
    </div>
  )
}

export default MapView
