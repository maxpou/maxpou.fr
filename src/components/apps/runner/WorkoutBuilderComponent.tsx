import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useMemo, useState } from 'preact/hooks'
import {
  downloadWorkoutFit,
  type Workout,
  type WorkoutBlock,
  type WorkoutStep,
} from './fit/workoutFile'
import { useLocalStorage } from './useLocalStorage'
import {
  formatDistance,
  generateWorkouts,
  stepSeconds,
  WORKOUT_CATEGORIES,
  workoutMeters,
  workoutSeconds,
} from './workouts/generateWorkouts'
import {
  computeTrainingPaces,
  formatDuration,
  formatPace,
  GOAL_DISTANCES,
  type GoalDistanceId,
  PACE_WINDOW_SEC,
} from './workouts/trainingPaces'

type Intensity = WorkoutStep['intensity']

const INTENSITIES: { id: Intensity; label: string; rail: string }[] = [
  { id: 'warmup', label: 'Warm up', rail: 'bg-amber-400' },
  { id: 'active', label: 'Steady', rail: 'bg-blue-500' },
  { id: 'interval', label: 'Hard', rail: 'bg-rose-500' },
  { id: 'recovery', label: 'Recovery', rail: 'bg-emerald-500' },
  { id: 'rest', label: 'Rest', rail: 'bg-gray-400' },
  { id: 'cooldown', label: 'Cool down', rail: 'bg-sky-400' },
]

const RAIL: Record<Intensity, string> = Object.fromEntries(
  INTENSITIES.map(i => [i.id, i.rail]),
) as Record<Intensity, string>

const LABEL: Record<Intensity, string> = Object.fromEntries(
  INTENSITIES.map(i => [i.id, i.label]),
) as Record<Intensity, string>

function describeStep(step: WorkoutStep): string {
  if (step.duration.type === 'open') return 'lap button'
  if (step.duration.type === 'time')
    return formatDuration(step.duration.seconds)
  const { meters } = step.duration
  return meters >= 1000 ? `${meters / 1000} km` : `${meters} m`
}

function describeTarget(step: WorkoutStep): string | null {
  if (step.target.type !== 'pace') return null
  return `${formatPace(step.target.fastSecPerKm)}-${formatPace(step.target.slowSecPerKm)}/km`
}

/** One bar segment per step, repeats expanded, so the shape of the session is visible. */
function timelineSegments(
  workout: Workout,
): { intensity: Intensity; seconds: number }[] {
  const segments: { intensity: Intensity; seconds: number }[] = []

  const push = (step: WorkoutStep) =>
    segments.push({ intensity: step.intensity, seconds: stepSeconds(step) })

  for (const block of workout.blocks) {
    if (block.kind === 'step') {
      push(block)
      continue
    }
    for (let round = 0; round < block.times; round += 1) {
      block.steps.forEach(push)
    }
  }

  return segments
}

function Timeline({ workout }: { workout: Workout }): JSX.Element {
  const segments = timelineSegments(workout)

  return (
    <div
      aria-hidden="true"
      class="flex h-2 gap-px overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700"
    >
      {segments.map((segment, index) => (
        <span
          key={`${segment.intensity}-${index}`}
          class={`min-w-0.5 ${RAIL[segment.intensity]}`}
          style={{ flexGrow: Math.max(segment.seconds, 1), flexBasis: 0 }}
        />
      ))}
    </div>
  )
}

function StepRow({ step }: { step: WorkoutStep }): JSX.Element {
  const target = describeTarget(step)

  return (
    <li class="flex items-center gap-3 py-2">
      <span
        aria-hidden="true"
        class={`h-6 w-1 shrink-0 rounded-full ${RAIL[step.intensity]}`}
      />
      <span class="min-w-0 flex-1">
        <span class="block truncate text-sm text-gray-800 dark:text-gray-200">
          {step.name}
        </span>
        <span class="text-xs text-gray-400 dark:text-gray-500">
          {LABEL[step.intensity]}
        </span>
      </span>
      <span class="text-right">
        <span class="block text-sm font-semibold tabular-nums text-gray-900 dark:text-white">
          {describeStep(step)}
        </span>
        {target && (
          <span class="text-xs tabular-nums text-gray-500 dark:text-gray-400">
            {target}
          </span>
        )}
      </span>
    </li>
  )
}

function BlockView({ block }: { block: WorkoutBlock }): JSX.Element {
  if (block.kind === 'step') return <StepRow step={block} />

  return (
    <li class="py-2">
      <div class="flex gap-3">
        <span class="flex w-8 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-bold tabular-nums text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          ×{block.times}
        </span>
        <ul class="flex-1 divide-y divide-gray-100 dark:divide-gray-700/60">
          {block.steps.map(step => (
            <StepRow key={step.name} step={step} />
          ))}
        </ul>
      </div>
    </li>
  )
}

function WorkoutCard({ workout }: { workout: Workout }): JSX.Element {
  const [downloaded, setDownloaded] = useState(false)

  const download = () => {
    downloadWorkoutFit(workout)
    setDownloaded(true)
    window.setTimeout(() => setDownloaded(false), 2500)
  }

  return (
    <article class="flex flex-col rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800">
      <div class="space-y-3 p-5">
        <div class="flex items-start justify-between gap-3">
          <h3 class="font-semibold text-gray-900 dark:text-white">
            {workout.name}
          </h3>
          <span class="flex shrink-0 gap-1.5">
            <span class="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {formatDuration(workoutSeconds(workout))}
            </span>
            <span class="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {formatDistance(workoutMeters(workout))}
            </span>
          </span>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {workout.summary}
        </p>
        <Timeline workout={workout} />
      </div>

      <ul class="flex-1 divide-y divide-gray-100 px-5 dark:divide-gray-700/60">
        {workout.blocks.map((block, index) => (
          <BlockView
            key={block.kind === 'repeat' ? `repeat-${index}` : block.name}
            block={block}
          />
        ))}
      </ul>

      <div class="p-5 pt-4">
        <button
          type="button"
          onClick={download}
          class="w-full cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-gray-600 dark:text-gray-200 dark:hover:border-blue-500"
        >
          {downloaded ? 'Saved to your downloads' : 'Download .fit'}
        </button>
      </div>
    </article>
  )
}

export default function WorkoutBuilderComponent(): JSX.Element {
  const [goalId, setGoalId] = useLocalStorage<GoalDistanceId>(
    'runner-dashboard:workouts.goalDistance',
    '10k',
  )
  const [paceMinutes, setPaceMinutes] = useLocalStorage(
    'runner-dashboard:workouts.paceMinutes',
    5,
  )
  const [paceSeconds, setPaceSeconds] = useLocalStorage(
    'runner-dashboard:workouts.paceSeconds',
    0,
  )

  const goal = GOAL_DISTANCES.find(d => d.id === goalId) ?? GOAL_DISTANCES[1]
  const goalSecPerKm = Math.max(
    120,
    Math.min(900, paceMinutes * 60 + paceSeconds),
  )

  const paces = useMemo(
    () => computeTrainingPaces(goal.km, goalSecPerKm),
    [goal.km, goalSecPerKm],
  )
  const workouts = useMemo(
    () => generateWorkouts(goal.id, goal.km, goalSecPerKm),
    [goal.id, goal.km, goalSecPerKm],
  )

  return (
    <div class="space-y-6">
      {/* Goal */}
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <div class="flex flex-wrap items-end gap-x-10 gap-y-6">
          <div>
            <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Race
            </span>
            <div class="inline-flex rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
              {GOAL_DISTANCES.map(distance => (
                <button
                  key={distance.id}
                  type="button"
                  onClick={() => setGoalId(distance.id)}
                  class={`cursor-pointer rounded-md px-3.5 py-1.5 text-sm font-medium transition-all ${
                    distance.id === goalId
                      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white'
                      : 'text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {distance.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Target pace
            </span>
            <div class="flex items-center gap-1.5">
              <input
                type="number"
                min={2}
                max={15}
                aria-label="Target pace, minutes"
                value={paceMinutes}
                onInput={event =>
                  setPaceMinutes(
                    Number((event.target as HTMLInputElement).value) || 0,
                  )
                }
                class="w-16 rounded-lg border border-gray-300 px-3 py-2 text-center tabular-nums text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <span class="font-semibold text-gray-400">:</span>
              <input
                type="number"
                min={0}
                max={59}
                aria-label="Target pace, seconds"
                value={paceSeconds}
                onInput={event =>
                  setPaceSeconds(
                    Number((event.target as HTMLInputElement).value) || 0,
                  )
                }
                class="w-16 rounded-lg border border-gray-300 px-3 py-2 text-center tabular-nums text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <span class="ml-1 text-sm text-gray-500 dark:text-gray-400">
                /km
              </span>
            </div>
          </div>

          <div class="ml-auto text-right">
            <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              You finish in
            </span>
            <span class="text-3xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
              {formatDuration(goalSecPerKm * goal.km)}
            </span>
          </div>
        </div>
      </div>

      {/* Training paces */}
      <div class="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
        <div class="flex flex-wrap items-baseline justify-between gap-2 px-5 pt-5 pb-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Your training paces
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Riegel formula, ±{PACE_WINDOW_SEC} s/km window on the watch
          </p>
        </div>
        <div class="grid divide-y divide-gray-100 border-t border-gray-100 sm:grid-cols-2 sm:divide-x lg:grid-cols-3 dark:divide-gray-700 dark:border-gray-700">
          {Object.values(paces).map(pace => (
            <div key={pace.id} class="p-4">
              <div class="flex items-baseline justify-between gap-2">
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {pace.label}
                </span>
                <span class="whitespace-nowrap text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                  {formatPace(pace.secPerKm)}
                  <span class="ml-0.5 text-xs font-normal text-gray-400">
                    /km
                  </span>
                </span>
              </div>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {pace.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Workouts */}
      <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 pt-2">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          {workouts.length} sessions for your {goal.label}
        </h2>
        <ul class="flex flex-wrap items-center gap-x-4 gap-y-1">
          {INTENSITIES.filter(i => i.id !== 'rest').map(intensity => (
            <li
              key={intensity.id}
              class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
            >
              <span
                aria-hidden="true"
                class={`h-2 w-2 rounded-full ${intensity.rail}`}
              />
              {intensity.label}
            </li>
          ))}
        </ul>
      </div>

      {WORKOUT_CATEGORIES.map(category => {
        const group = workouts.filter(w => w.category === category.id)
        if (group.length === 0) return null

        return (
          <section key={category.id} class="space-y-4">
            <div class="border-b border-gray-200 pb-2 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {category.label}
                <span class="ml-2 text-sm font-normal tabular-nums text-gray-400 dark:text-gray-500">
                  {group.length}
                </span>
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {category.description}
              </p>
            </div>
            <div class="grid gap-6 lg:grid-cols-2">
              {group.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </section>
        )
      })}

      {/* How to use */}
      <div class="rounded-xl border-l-4 border-blue-500 bg-white p-5 shadow-lg dark:bg-gray-800">
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Getting a workout onto your watch
        </h3>
        <ol class="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li class="flex gap-3">
            <span class="font-bold tabular-nums text-blue-500">1</span>
            Download the .fit file.
          </li>
          <li class="flex gap-3">
            <span class="font-bold tabular-nums text-blue-500">2</span>
            <span>
              Plug the watch in over USB and drop the file in{' '}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-700">
                GARMIN/NEWFILES
              </code>
              , then eject the watch and restart it. Garmin Connect does not
              accept workout files, so do not upload it there.
            </span>
          </li>
          <li class="flex gap-3">
            <span class="font-bold tabular-nums text-blue-500">3</span>
            On the watch: Training, then Workouts, then start it.
          </li>
        </ol>
        <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Everything is built in your browser, nothing is uploaded. Coros,
          Suunto and Wahoo read the same format.
        </p>
      </div>
    </div>
  )
}
