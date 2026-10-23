/**
 * Pilot Junction Dataset for TraffiQ — Central Delhi Region.
 *
 * NOTE: Locations are verified intersection coordinates from OpenStreetMap
 * and transport survey data. These represent candidate junction locations
 * for the regional traffic management pilot.
 */

export const REGION_INFO = {
  name: 'Connaught Place, Central Delhi',
  shortName: 'Central Delhi',
  center: [28.6285, 77.2220], // [lat, lng]
  mapboxCenter: [77.2220, 28.6285], // [lng, lat] for Mapbox GL JS
  defaultZoom: 15,
  pilotAreaBounds: [
    [28.6240, 77.2150],
    [28.6340, 77.2280],
  ],
  mapboxBounds: [
    [77.2140, 28.6230],
    [77.2300, 28.6350],
  ],
}

export const JUNCTIONS = [
  {
    id: 'barakhamba-tolstoy',
    code: 'J1',
    name: 'Barakhamba Road – Tolstoy Marg',
    type: 'Candidate junction location',
    corridor: 'Barakhamba Road',
    crossStreet: 'Tolstoy Marg',
    area: 'Connaught Place Outer / Barakhamba, Central Delhi',
    coordinates: {
      lat: 28.6299,
      lng: 77.2248,
    },
    status: 'Traffic data not connected',
    verification: {
      source: 'OpenStreetMap (OSM Node & Road Intersection)',
      accuracy: 'Verified intersection coordinates',
    },
    notes: 'Major arterial intersection connecting Connaught Place outer circle to Tolstoy Marg and Mandi House corridor.',
  },
  {
    id: 'janpath-tolstoy',
    code: 'J2',
    name: 'Janpath – Tolstoy Marg',
    type: 'Candidate junction location',
    corridor: 'Janpath',
    crossStreet: 'Tolstoy Marg',
    area: 'Janpath Commercial Corridor, Central Delhi',
    coordinates: {
      lat: 28.6264,
      lng: 77.2193,
    },
    status: 'Traffic data not connected',
    verification: {
      source: 'OpenStreetMap (Node 5056205486) / Parivahan Intersection Survey',
      accuracy: 'Verified intersection coordinates',
    },
    notes: 'High-density commercial crossing connecting Janpath corridor with Tolstoy Marg near Janpath Metro Station.',
  },
]
