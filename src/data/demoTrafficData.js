/**
 * Synthetic Demo Traffic Data for TraffiQ Regional Pilot.
 *
 * NOTE FOR TRAFFIC OPERATORS:
 * These records contain synthetic demonstration values for interface inspection.
 * They do NOT represent live road sensor measurements or real controller feeds.
 */

import { JUNCTIONS } from './junctions.js'

export const DEMO_TRAFFIC_DATA = [
  {
    ...JUNCTIONS[0], // Barakhamba Road – Tolstoy Marg (J1)
    mode: 'AI (DEMO)',
    activePhase: 'North–South GREEN',
    signalLampState: 'green',
    greenTimeRemaining: 18, // seconds
    vehiclesWaiting: 12,
    queueLength: 42, // metres
    isDemo: true,
    demoLabel: 'DEMO DATA',
  },
  {
    ...JUNCTIONS[1], // Janpath – Tolstoy Marg (J2)
    mode: 'AI (DEMO)',
    activePhase: 'East–West GREEN',
    signalLampState: 'green',
    greenTimeRemaining: 12, // seconds
    vehiclesWaiting: 7,
    queueLength: 25, // metres
    isDemo: true,
    demoLabel: 'DEMO DATA',
  },
]

export const getDemoJunctionById = (id) => {
  return DEMO_TRAFFIC_DATA.find((j) => j.id === id) || null
}
