export type GoalDistanceId = '5k' | '10k' | 'half' | 'marathon'

export type GoalDistance = {
  id: GoalDistanceId
  label: string
  km: number
}

export const GOAL_DISTANCES: GoalDistance[] = [
  { id: '5k', label: '5 km', km: 5 },
  { id: '10k', label: '10 km', km: 10 },
  { id: 'half', label: 'Half marathon', km: 21.0975 },
  { id: 'marathon', label: 'Marathon', km: 42.195 },
]

/**
 * Riegel endurance exponent. Predicts a time at another distance from one
 * known performance: t2 = t1 * (d2 / d1) ^ 1.06
 */
const RIEGEL_EXPONENT = 1.06

export type TrainingPaceId =
  | 'recovery'
  | 'easy'
  | 'long'
  | 'race'
  | 'threshold'
  | 'interval'

export type TrainingPace = {
  id: TrainingPaceId
  label: string
  description: string
  secPerKm: number
}

function equivalentPace(
  goalKm: number,
  goalSecPerKm: number,
  targetKm: number,
): number {
  const goalSeconds = goalSecPerKm * goalKm
  const targetSeconds = goalSeconds * (targetKm / goalKm) ** RIEGEL_EXPONENT
  return targetSeconds / targetKm
}

export function computeTrainingPaces(
  goalKm: number,
  goalSecPerKm: number,
): Record<TrainingPaceId, TrainingPace> {
  const marathonPace = equivalentPace(goalKm, goalSecPerKm, 42.195)
  const tenKPace = equivalentPace(goalKm, goalSecPerKm, 10)
  const threeKPace = equivalentPace(goalKm, goalSecPerKm, 3)

  const paces: TrainingPace[] = [
    {
      id: 'recovery',
      label: 'Recovery',
      description: 'Very easy. Between hard sessions.',
      secPerKm: marathonPace * 1.25,
    },
    {
      id: 'easy',
      label: 'Easy',
      description: 'Conversational. Most of your weekly volume.',
      secPerKm: marathonPace * 1.15,
    },
    {
      id: 'long',
      label: 'Long run',
      description: 'Steady endurance pace.',
      secPerKm: marathonPace * 1.08,
    },
    {
      id: 'race',
      label: 'Race pace',
      description: 'Your goal pace.',
      secPerKm: goalSecPerKm,
    },
    {
      id: 'threshold',
      label: 'Threshold',
      description: 'Comfortably hard. About one hour of race effort.',
      secPerKm: tenKPace * 1.02,
    },
    {
      id: 'interval',
      label: 'Interval',
      description: 'Hard. 3 km to 5 km race effort.',
      secPerKm: threeKPace,
    },
  ]

  return Object.fromEntries(paces.map(pace => [pace.id, pace])) as Record<
    TrainingPaceId,
    TrainingPace
  >
}

/** Half-width of the pace window sent to the watch, in seconds per km. */
export const PACE_WINDOW_SEC = 5

export function paceRange(secPerKm: number) {
  return {
    fastSecPerKm: Math.max(60, secPerKm - PACE_WINDOW_SEC),
    slowSecPerKm: secPerKm + PACE_WINDOW_SEC,
  }
}

export function formatPace(secPerKm: number): string {
  const total = Math.round(secPerKm)
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function formatDuration(totalSeconds: number): string {
  const seconds = Math.round(totalSeconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${rest.toString().padStart(2, '0')}`
  }
  return `${minutes}:${rest.toString().padStart(2, '0')}`
}
