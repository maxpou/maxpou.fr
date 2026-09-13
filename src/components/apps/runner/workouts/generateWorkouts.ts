import type {
  Workout,
  WorkoutBlock,
  WorkoutCategoryId,
  WorkoutStep,
} from '../fit/workoutFile'
import {
  computeTrainingPaces,
  formatDuration,
  formatPace,
  type GoalDistanceId,
  paceRange,
  type TrainingPace,
  type TrainingPaceId,
} from './trainingPaces'

export const WORKOUT_CATEGORIES: {
  id: WorkoutCategoryId
  label: string
  description: string
}[] = [
  {
    id: 'endurance',
    label: 'Endurance',
    description: 'The easy volume that builds the engine. Most of your week.',
  },
  {
    id: 'threshold',
    label: 'Threshold',
    description: 'Comfortably hard. Raises the pace you can hold for an hour.',
  },
  {
    id: 'speed',
    label: 'Speed and VO2 max',
    description:
      'Short and hard, with recovery. One session per week is enough.',
  },
  {
    id: 'race',
    label: 'Race specific',
    description: 'Goal pace on tired legs, so race day feels known.',
  },
  {
    id: 'technique',
    label: 'Technique',
    description: 'Cheap on the legs, good for your form.',
  },
]

type Plan = {
  longRunKm: number
  longEasyKm: number
  progressionKm: number
  easyMinutes: number
  recoveryMinutes: number
  intervalReps: number
  intervalMeters: number
  intervalRecoverySec: number
  shortReps: number
  shortMeters: number
  hillReps: number
  tempoMinutes: number
  cruiseReps: number
  cruiseMeters: number
  overUnderReps: number
  overUnderMeters: number
  racePaceReps: number
  racePaceMeters: number
  raceSimMeters: number
}

const PLANS: Record<GoalDistanceId, Plan> = {
  '5k': {
    longRunKm: 10,
    longEasyKm: 12,
    progressionKm: 9,
    easyMinutes: 40,
    recoveryMinutes: 30,
    intervalReps: 6,
    intervalMeters: 800,
    intervalRecoverySec: 150,
    shortReps: 10,
    shortMeters: 400,
    hillReps: 8,
    tempoMinutes: 15,
    cruiseReps: 4,
    cruiseMeters: 1200,
    overUnderReps: 4,
    overUnderMeters: 800,
    racePaceReps: 5,
    racePaceMeters: 1000,
    raceSimMeters: 4000,
  },
  '10k': {
    longRunKm: 14,
    longEasyKm: 16,
    progressionKm: 12,
    easyMinutes: 45,
    recoveryMinutes: 30,
    intervalReps: 5,
    intervalMeters: 1000,
    intervalRecoverySec: 180,
    shortReps: 12,
    shortMeters: 400,
    hillReps: 10,
    tempoMinutes: 20,
    cruiseReps: 5,
    cruiseMeters: 1600,
    overUnderReps: 5,
    overUnderMeters: 1000,
    racePaceReps: 4,
    racePaceMeters: 1600,
    raceSimMeters: 8000,
  },
  half: {
    longRunKm: 18,
    longEasyKm: 20,
    progressionKm: 15,
    easyMinutes: 50,
    recoveryMinutes: 35,
    intervalReps: 5,
    intervalMeters: 1000,
    intervalRecoverySec: 180,
    shortReps: 10,
    shortMeters: 400,
    hillReps: 10,
    tempoMinutes: 25,
    cruiseReps: 4,
    cruiseMeters: 2000,
    overUnderReps: 4,
    overUnderMeters: 1600,
    racePaceReps: 3,
    racePaceMeters: 3000,
    raceSimMeters: 12000,
  },
  marathon: {
    longRunKm: 28,
    longEasyKm: 30,
    progressionKm: 20,
    easyMinutes: 60,
    recoveryMinutes: 40,
    intervalReps: 4,
    intervalMeters: 1200,
    intervalRecoverySec: 210,
    shortReps: 8,
    shortMeters: 400,
    hillReps: 8,
    tempoMinutes: 30,
    cruiseReps: 4,
    cruiseMeters: 2400,
    overUnderReps: 4,
    overUnderMeters: 2000,
    racePaceReps: 3,
    racePaceMeters: 5000,
    raceSimMeters: 16000,
  },
}

const WARMUP_SEC = 900
const COOLDOWN_SEC = 600

type PaceMap = Record<TrainingPaceId, TrainingPace>

function timeStep(
  name: string,
  seconds: number,
  pace: TrainingPace,
  intensity: WorkoutStep['intensity'] = 'active',
): WorkoutStep {
  return {
    kind: 'step',
    name,
    duration: { type: 'time', seconds },
    target: { type: 'pace', ...paceRange(pace.secPerKm) },
    intensity,
  }
}

function distanceStep(
  name: string,
  meters: number,
  pace: TrainingPace,
  intensity: WorkoutStep['intensity'] = 'active',
): WorkoutStep {
  return {
    kind: 'step',
    name,
    duration: { type: 'distance', meters },
    target: { type: 'pace', ...paceRange(pace.secPerKm) },
    intensity,
  }
}

function warmup(paces: PaceMap): WorkoutStep {
  return timeStep('Warm up', WARMUP_SEC, paces.easy, 'warmup')
}

function cooldown(paces: PaceMap): WorkoutStep {
  return timeStep('Cool down', COOLDOWN_SEC, paces.recovery, 'cooldown')
}

/** Pace used when a step has no pace target, so estimates stay finite. */
const FALLBACK_SEC_PER_KM = 330

function stepPaceSecPerKm(step: WorkoutStep): number {
  if (step.target.type !== 'pace') return FALLBACK_SEC_PER_KM
  return (step.target.fastSecPerKm + step.target.slowSecPerKm) / 2
}

export function stepSeconds(step: WorkoutStep): number {
  if (step.duration.type === 'time') return step.duration.seconds
  if (step.duration.type === 'distance') {
    return (step.duration.meters / 1000) * stepPaceSecPerKm(step)
  }
  return 0
}

export function stepMeters(step: WorkoutStep): number {
  if (step.duration.type === 'distance') return step.duration.meters
  if (step.duration.type === 'time') {
    return (step.duration.seconds / stepPaceSecPerKm(step)) * 1000
  }
  return 0
}

/** Rough totals of one block, used for the "about X" labels only. */
function blockTotal(
  block: WorkoutBlock,
  of: (step: WorkoutStep) => number,
): number {
  if (block.kind === 'repeat') {
    return block.times * block.steps.reduce((t, s) => t + of(s), 0)
  }
  return of(block)
}

export function workoutSeconds(workout: Workout): number {
  return workout.blocks.reduce((t, b) => t + blockTotal(b, stepSeconds), 0)
}

export function workoutMeters(workout: Workout): number {
  return workout.blocks.reduce((t, b) => t + blockTotal(b, stepMeters), 0)
}

export function formatDistance(meters: number): string {
  const km = meters / 1000
  return `${km >= 10 ? Math.round(km) : Math.round(km * 10) / 10} km`
}

export function generateWorkouts(
  goalId: GoalDistanceId,
  goalKm: number,
  goalSecPerKm: number,
): Workout[] {
  const paces = computeTrainingPaces(goalKm, goalSecPerKm)
  const plan = PLANS[goalId]
  const label =
    goalId === 'half'
      ? 'Half'
      : goalId === 'marathon'
        ? 'Marathon'
        : goalId.toUpperCase()

  const ladderMeters = [400, 800, 1200, 800, 400]

  return [
    // Endurance
    {
      id: 'recovery',
      category: 'endurance',
      name: `Recovery run ${plan.recoveryMinutes} min`,
      summary: `${plan.recoveryMinutes} min at ${formatPace(paces.recovery.secPerKm)}/km. The day after a hard session. Slower than you think.`,
      blocks: [timeStep('Recovery', plan.recoveryMinutes * 60, paces.recovery)],
    },
    {
      id: 'easy',
      category: 'endurance',
      name: `Easy run ${plan.easyMinutes} min`,
      summary: `${plan.easyMinutes} min at ${formatPace(paces.easy.secPerKm)}/km. Slow enough to hold a conversation. If it hurts, you went too fast.`,
      blocks: [timeStep('Easy', plan.easyMinutes * 60, paces.easy)],
    },
    {
      id: 'long-easy',
      category: 'endurance',
      name: `Long easy run ${plan.longEasyKm} km`,
      summary: `${plan.longEasyKm} km at one pace, no surprises. Time on your feet is the point.`,
      blocks: [distanceStep('Steady', plan.longEasyKm * 1000, paces.long)],
    },
    {
      id: 'long',
      category: 'endurance',
      name: `Long run ${plan.longRunKm} km`,
      summary: `${plan.longRunKm} km steady, then 3 km at race pace on legs that are already tired.`,
      blocks: [
        distanceStep('Steady', (plan.longRunKm - 3) * 1000, paces.long),
        distanceStep('Race pace finish', 3000, paces.race),
      ],
    },
    {
      id: 'progression',
      category: 'endurance',
      name: `Progression run ${plan.progressionKm} km`,
      summary: `Three equal blocks: easy, then long run pace, then threshold. Each one faster than the last.`,
      blocks: [
        distanceStep(
          'Block 1 easy',
          (plan.progressionKm / 3) * 1000,
          paces.easy,
          'warmup',
        ),
        distanceStep(
          'Block 2 steady',
          (plan.progressionKm / 3) * 1000,
          paces.long,
        ),
        distanceStep(
          'Block 3 threshold',
          (plan.progressionKm / 3) * 1000,
          paces.threshold,
          'interval',
        ),
      ],
    },

    // Threshold
    {
      id: 'tempo',
      category: 'threshold',
      name: `Tempo ${plan.tempoMinutes} min`,
      summary: `One block at ${formatPace(paces.threshold.secPerKm)}/km, no breaks. Comfortably hard, not a race.`,
      blocks: [
        warmup(paces),
        timeStep('Tempo', plan.tempoMinutes * 60, paces.threshold),
        cooldown(paces),
      ],
    },
    {
      id: 'cruise',
      category: 'threshold',
      name: `${plan.cruiseReps} x ${plan.cruiseMeters} m cruise`,
      summary: `Same work as a tempo, cut into pieces with a 90 s jog. It hurts less.`,
      blocks: [
        warmup(paces),
        {
          kind: 'repeat',
          times: plan.cruiseReps,
          steps: [
            distanceStep(
              `${plan.cruiseMeters} m threshold`,
              plan.cruiseMeters,
              paces.threshold,
              'interval',
            ),
            timeStep('Jog recovery', 90, paces.recovery, 'recovery'),
          ],
        },
        cooldown(paces),
      ],
    },
    {
      id: 'over-under',
      category: 'threshold',
      name: `Over-under ${plan.overUnderReps} x ${plan.overUnderMeters} m`,
      summary: `Half above threshold, half back at race pace, no rest between the two. Teaches you to clear the burn while still running.`,
      blocks: [
        warmup(paces),
        {
          kind: 'repeat',
          times: plan.overUnderReps,
          steps: [
            distanceStep(
              'Over',
              plan.overUnderMeters / 2,
              paces.interval,
              'interval',
            ),
            distanceStep('Under', plan.overUnderMeters / 2, paces.race),
            timeStep('Jog recovery', 120, paces.recovery, 'recovery'),
          ],
        },
        cooldown(paces),
      ],
    },

    // Speed and VO2 max
    {
      id: 'intervals',
      category: 'speed',
      name: `${plan.intervalReps} x ${plan.intervalMeters} m intervals`,
      summary: `Repeats at ${formatPace(paces.interval.secPerKm)}/km, jog between each one. The last two reps are the ones that count.`,
      blocks: [
        warmup(paces),
        {
          kind: 'repeat',
          times: plan.intervalReps,
          steps: [
            distanceStep(
              `${plan.intervalMeters} m hard`,
              plan.intervalMeters,
              paces.interval,
              'interval',
            ),
            timeStep(
              'Jog recovery',
              plan.intervalRecoverySec,
              paces.recovery,
              'recovery',
            ),
          ],
        },
        cooldown(paces),
      ],
    },
    {
      id: 'short-intervals',
      category: 'speed',
      name: `${plan.shortReps} x ${plan.shortMeters} m`,
      summary: `Short and sharp at ${formatPace(paces.interval.secPerKm)}/km with a 90 s jog. Start controlled, the volume adds up.`,
      blocks: [
        warmup(paces),
        {
          kind: 'repeat',
          times: plan.shortReps,
          steps: [
            distanceStep(
              `${plan.shortMeters} m fast`,
              plan.shortMeters,
              paces.interval,
              'interval',
            ),
            timeStep('Jog recovery', 90, paces.recovery, 'recovery'),
          ],
        },
        cooldown(paces),
      ],
    },
    {
      id: 'ladder',
      category: 'speed',
      name: 'Ladder 400-800-1200-800-400 m',
      summary:
        'Up the ladder and back down, 2 min jog after each rep. The way down is where you find out.',
      blocks: [
        warmup(paces),
        ...ladderMeters.flatMap((meters, index): WorkoutBlock[] => [
          distanceStep(`${meters} m hard`, meters, paces.interval, 'interval'),
          ...(index < ladderMeters.length - 1
            ? [timeStep('Jog recovery', 120, paces.recovery, 'recovery')]
            : []),
        ]),
        cooldown(paces),
      ],
    },
    {
      id: 'hills',
      category: 'speed',
      name: `${plan.hillReps} x 60 s hills`,
      summary:
        'Find a climb of about 5 %. Hard on the way up, walk or jog down. Strength work that does not feel like the gym.',
      blocks: [
        warmup(paces),
        {
          kind: 'repeat',
          times: plan.hillReps,
          steps: [
            timeStep('Uphill hard', 60, paces.interval, 'interval'),
            timeStep('Jog down', 120, paces.recovery, 'recovery'),
          ],
        },
        cooldown(paces),
      ],
    },
    {
      id: 'fartlek',
      category: 'speed',
      name: 'Fartlek 1-2-3-2-1 min',
      summary:
        'A pyramid of hard bursts with equal easy running between them. Twice through. No track needed.',
      blocks: [
        warmup(paces),
        {
          kind: 'repeat',
          times: 2,
          steps: [
            timeStep('1 min hard', 60, paces.interval, 'interval'),
            timeStep('1 min easy', 60, paces.easy, 'recovery'),
            timeStep('2 min hard', 120, paces.interval, 'interval'),
            timeStep('2 min easy', 120, paces.easy, 'recovery'),
            timeStep('3 min hard', 180, paces.threshold, 'interval'),
            timeStep('3 min easy', 180, paces.easy, 'recovery'),
            timeStep('2 min hard', 120, paces.interval, 'interval'),
            timeStep('2 min easy', 120, paces.easy, 'recovery'),
            timeStep('1 min hard', 60, paces.interval, 'interval'),
            timeStep('1 min easy', 60, paces.easy, 'recovery'),
          ],
        },
        cooldown(paces),
      ],
    },

    // Race specific
    {
      id: 'race-pace',
      category: 'race',
      name: `${label} pace ${plan.racePaceReps} x ${plan.racePaceMeters} m`,
      summary: `Reps at your goal pace of ${formatPace(goalSecPerKm)}/km. Race day is a bad time to discover what it feels like.`,
      blocks: [
        warmup(paces),
        {
          kind: 'repeat',
          times: plan.racePaceReps,
          steps: [
            distanceStep(
              `${plan.racePaceMeters} m race pace`,
              plan.racePaceMeters,
              paces.race,
            ),
            timeStep('Easy float', 120, paces.easy, 'recovery'),
          ],
        },
        cooldown(paces),
      ],
    },
    {
      id: 'race-simulation',
      category: 'race',
      name: `Race simulation ${formatDistance(plan.raceSimMeters)}`,
      summary: `One unbroken block at ${formatPace(goalSecPerKm)}/km. A dress rehearsal for shoes, drinks and pacing.`,
      blocks: [
        warmup(paces),
        distanceStep('Goal pace', plan.raceSimMeters, paces.race),
        cooldown(paces),
      ],
    },
    {
      id: 'negative-split',
      category: 'race',
      name: `Negative split ${plan.progressionKm} km`,
      summary:
        'First half easy, second half at goal pace. The pacing you want on race day.',
      blocks: [
        distanceStep(
          'First half easy',
          (plan.progressionKm / 2) * 1000,
          paces.easy,
          'warmup',
        ),
        distanceStep(
          'Second half goal pace',
          (plan.progressionKm / 2) * 1000,
          paces.race,
        ),
      ],
    },

    // Technique
    {
      id: 'strides',
      category: 'technique',
      name: 'Easy run + 8 strides',
      summary:
        'Easy running, then 8 short bursts of speed. Good for your form, cheap on your legs.',
      blocks: [
        timeStep('Easy', 1800, paces.easy, 'warmup'),
        {
          kind: 'repeat',
          times: 8,
          steps: [
            timeStep('Stride', 20, paces.interval, 'interval'),
            timeStep('Walk back', 60, paces.recovery, 'recovery'),
          ],
        },
        timeStep('Easy', 600, paces.easy, 'cooldown'),
      ],
    },
  ]
}

export { formatDuration, formatPace }
