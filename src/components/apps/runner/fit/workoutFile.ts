import { BaseType, FitFileWriter, toFitDateTime } from './fitWriter'

const MESG_FILE_ID = 0
const MESG_WORKOUT = 26
const MESG_WORKOUT_STEP = 27

const FILE_TYPE_WORKOUT = 5
const SPORT_RUNNING = 1
const WORKOUT_CAPABILITY_INTERVAL = 1

const DURATION_TIME = 0
const DURATION_DISTANCE = 1
const DURATION_OPEN = 5
const DURATION_REPEAT_UNTIL_STEPS_CMPLT = 6

const TARGET_SPEED = 0
const TARGET_OPEN = 2

const INTENSITY: Record<StepIntensity, number> = {
  active: 0,
  rest: 1,
  warmup: 2,
  cooldown: 3,
  recovery: 4,
  interval: 5,
}

export type StepIntensity =
  | 'active'
  | 'rest'
  | 'warmup'
  | 'cooldown'
  | 'recovery'
  | 'interval'

export type StepDuration =
  | { type: 'time'; seconds: number }
  | { type: 'distance'; meters: number }
  | { type: 'open' }

/** Pace bounds in seconds per kilometre. `fast` is the lower number. */
export type PaceRange = { fastSecPerKm: number; slowSecPerKm: number }

export type StepTarget = { type: 'open' } | ({ type: 'pace' } & PaceRange)

export type WorkoutStep = {
  kind: 'step'
  name: string
  duration: StepDuration
  target: StepTarget
  intensity: StepIntensity
}

export type WorkoutRepeat = {
  kind: 'repeat'
  times: number
  steps: WorkoutStep[]
}

export type WorkoutBlock = WorkoutStep | WorkoutRepeat

export type WorkoutCategoryId =
  | 'endurance'
  | 'threshold'
  | 'speed'
  | 'race'
  | 'technique'

export type Workout = {
  id: string
  category: WorkoutCategoryId
  name: string
  summary: string
  blocks: WorkoutBlock[]
}

function speedMillimetresPerSecond(secPerKm: number): number {
  return Math.round((1000 / secPerKm) * 1000)
}

function stepFields(step: WorkoutStep, messageIndex: number) {
  let durationType = DURATION_OPEN
  let durationValue: number | null = null

  if (step.duration.type === 'time') {
    durationType = DURATION_TIME
    durationValue = Math.round(step.duration.seconds * 1000)
  } else if (step.duration.type === 'distance') {
    durationType = DURATION_DISTANCE
    durationValue = Math.round(step.duration.meters * 100)
  }

  const pace = step.target.type === 'pace' ? step.target : null

  return [
    { num: 254, baseType: BaseType.uint16, value: messageIndex },
    { num: 0, baseType: BaseType.string, value: step.name.slice(0, 30) },
    { num: 1, baseType: BaseType.enum, value: durationType },
    { num: 2, baseType: BaseType.uint32, value: durationValue },
    {
      num: 3,
      baseType: BaseType.enum,
      value: pace ? TARGET_SPEED : TARGET_OPEN,
    },
    { num: 4, baseType: BaseType.uint32, value: 0 },
    {
      num: 5,
      baseType: BaseType.uint32,
      value: pace ? speedMillimetresPerSecond(pace.slowSecPerKm) : null,
    },
    {
      num: 6,
      baseType: BaseType.uint32,
      value: pace ? speedMillimetresPerSecond(pace.fastSecPerKm) : null,
    },
    { num: 7, baseType: BaseType.enum, value: INTENSITY[step.intensity] },
  ] as const
}

function repeatFields(times: number, fromIndex: number, messageIndex: number) {
  return [
    { num: 254, baseType: BaseType.uint16, value: messageIndex },
    {
      num: 1,
      baseType: BaseType.enum,
      value: DURATION_REPEAT_UNTIL_STEPS_CMPLT,
    },
    { num: 2, baseType: BaseType.uint32, value: fromIndex },
    { num: 3, baseType: BaseType.enum, value: TARGET_OPEN },
    { num: 4, baseType: BaseType.uint32, value: times },
  ] as const
}

export function countSteps(blocks: WorkoutBlock[]): number {
  return blocks.reduce(
    (total, block) =>
      total + (block.kind === 'repeat' ? block.steps.length + 1 : 1),
    0,
  )
}

export function encodeWorkoutFit(
  workout: Workout,
  createdAt: Date = new Date(),
): Uint8Array {
  const writer = new FitFileWriter()

  writer.writeMesg(MESG_FILE_ID, [
    { num: 0, baseType: BaseType.enum, value: FILE_TYPE_WORKOUT },
    { num: 1, baseType: BaseType.uint16, value: 255 }, // manufacturer: development
    { num: 2, baseType: BaseType.uint16, value: 0 },
    { num: 3, baseType: BaseType.uint32z, value: 1 },
    { num: 4, baseType: BaseType.uint32, value: toFitDateTime(createdAt) },
  ])

  writer.writeMesg(MESG_WORKOUT, [
    { num: 4, baseType: BaseType.enum, value: SPORT_RUNNING },
    { num: 5, baseType: BaseType.uint32z, value: WORKOUT_CAPABILITY_INTERVAL },
    { num: 6, baseType: BaseType.uint16, value: countSteps(workout.blocks) },
    { num: 8, baseType: BaseType.string, value: workout.name.slice(0, 30) },
  ])

  let messageIndex = 0
  for (const block of workout.blocks) {
    if (block.kind === 'step') {
      writer.writeMesg(MESG_WORKOUT_STEP, [...stepFields(block, messageIndex)])
      messageIndex += 1
      continue
    }

    const repeatFrom = messageIndex
    for (const step of block.steps) {
      writer.writeMesg(MESG_WORKOUT_STEP, [...stepFields(step, messageIndex)])
      messageIndex += 1
    }
    writer.writeMesg(MESG_WORKOUT_STEP, [
      ...repeatFields(block.times, repeatFrom, messageIndex),
    ])
    messageIndex += 1
  }

  return writer.close()
}

export function workoutFileName(workout: Workout): string {
  const slug = workout.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
  return `${slug || 'workout'}.fit`
}

export function downloadWorkoutFit(workout: Workout): void {
  const bytes = encodeWorkoutFit(workout)
  // Copy into a fresh ArrayBuffer so the Blob never sees a pooled view.
  const blob = new Blob([bytes.slice().buffer], {
    type: 'application/vnd.ant.fit',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = workoutFileName(workout)
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
