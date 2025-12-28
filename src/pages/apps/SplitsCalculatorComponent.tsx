import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import type { Dispatch, StateUpdater } from 'preact/hooks'
import { useState } from 'preact/hooks'

type Distance = {
  name: string
  km: number
}

const DISTANCES: Distance[] = [
  { name: '5km', km: 5 },
  { name: '10km', km: 10 },
  { name: '15km', km: 15 },
  { name: '20km', km: 20 },
  { name: '30km', km: 30 },
  { name: 'Half Marathon', km: 21.0975 },
  { name: 'Marathon', km: 42.195 },
]

type TimeInput = {
  hours: number
  minutes: number
  seconds: number
}

function formatPace(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.round(totalSeconds % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.round(totalSeconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function timeToSeconds(time: TimeInput): number {
  return time.hours * 3600 + time.minutes * 60 + time.seconds
}

function calculatePacePerKm(totalSeconds: number, distanceKm: number): number {
  return totalSeconds / distanceKm
}

function calculateSpeed(totalSeconds: number, distanceKm: number): number {
  const hours = totalSeconds / 3600
  return distanceKm / hours
}

export default function SplitsCalculator(): JSX.Element {
  const [selectedDistance, setSelectedDistance] = useState<Distance>(
    DISTANCES[6],
  ) // Marathon default
  const [time1, setTime1] = useState<TimeInput>({
    hours: 3,
    minutes: 55,
    seconds: 0,
  })
  const [showSecondTime, setShowSecondTime] = useState(false)
  const [time2, setTime2] = useState<TimeInput>({
    hours: 4,
    minutes: 15,
    seconds: 0,
  })

  const totalSeconds1 = timeToSeconds(time1)
  const pacePerKm1 = calculatePacePerKm(totalSeconds1, selectedDistance.km)
  const speed1 = calculateSpeed(totalSeconds1, selectedDistance.km)

  const totalSeconds2 = timeToSeconds(time2)
  const pacePerKm2 = calculatePacePerKm(totalSeconds2, selectedDistance.km)
  const speed2 = calculateSpeed(totalSeconds2, selectedDistance.km)

  // Generate splits
  const fullKms = Math.floor(selectedDistance.km)
  const remainder = selectedDistance.km - fullKms

  const generateSplits = (
    pacePerKm: number,
  ): { km: number; splitTime: number; cumulativeTime: number }[] => {
    const splits: { km: number; splitTime: number; cumulativeTime: number }[] =
      []
    let cumulative = 0

    for (let i = 1; i <= fullKms; i++) {
      cumulative += pacePerKm
      splits.push({
        km: i,
        splitTime: pacePerKm,
        cumulativeTime: cumulative,
      })
    }

    // Add final partial km if there is one
    if (remainder > 0.01) {
      const partialTime = pacePerKm * remainder
      cumulative += partialTime
      splits.push({
        km: selectedDistance.km,
        splitTime: partialTime,
        cumulativeTime: cumulative,
      })
    }

    return splits
  }

  const splits1 = generateSplits(pacePerKm1)
  const splits2 = showSecondTime ? generateSplits(pacePerKm2) : []

  const handleTimeChange = (
    setter: Dispatch<StateUpdater<TimeInput>>,
    field: keyof TimeInput,
    value: number,
  ) => {
    setter((prev: TimeInput) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-8">
      {/* Distance Selection */}
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Race Distance
        </h2>
        <div class="flex flex-wrap gap-2">
          {DISTANCES.map(dist => (
            <button
              key={dist.name}
              type="button"
              onClick={() => setSelectedDistance(dist)}
              class={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedDistance.name === dist.name
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {dist.name}
            </button>
          ))}
        </div>
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Selected: {selectedDistance.km.toFixed(3)} km
        </p>
      </div>

      {/* Time Inputs */}
      <div class="grid gap-6 md:grid-cols-2">
        {/* Time 1 */}
        <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Estimated Time 1
            </h2>
            <div class="h-3 w-3 rounded-full bg-blue-500" />
          </div>

          <div class="flex gap-2">
            <div class="flex-1">
              <label
                class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400"
                htmlFor="time1Hours"
              >
                Hours
              </label>
              <input
                type="number"
                id="time1Hours"
                value={time1.hours}
                onInput={e =>
                  handleTimeChange(
                    setTime1,
                    'hours',
                    Number((e.target as HTMLInputElement).value),
                  )
                }
                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                min="0"
                max="24"
              />
            </div>
            <div class="flex-1">
              <label
                class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400"
                htmlFor="time1Minutes"
              >
                Minutes
              </label>
              <input
                type="number"
                id="time1Minutes"
                value={time1.minutes}
                onInput={e =>
                  handleTimeChange(
                    setTime1,
                    'minutes',
                    Number((e.target as HTMLInputElement).value),
                  )
                }
                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                min="0"
                max="59"
              />
            </div>
            <div class="flex-1">
              <label
                class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400"
                htmlFor="time1Seconds"
              >
                Seconds
              </label>
              <input
                type="number"
                id="time1Seconds"
                value={time1.seconds}
                onInput={e =>
                  handleTimeChange(
                    setTime1,
                    'seconds',
                    Number((e.target as HTMLInputElement).value),
                  )
                }
                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                min="0"
                max="59"
              />
            </div>
          </div>

          {/* Calculated values */}
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
              <p class="text-xs font-medium text-blue-600 dark:text-blue-400">
                Pace
              </p>
              <p class="text-xl font-bold text-blue-700 dark:text-blue-300">
                {formatPace(pacePerKm1)}{' '}
                <span class="text-sm font-normal">/km</span>
              </p>
            </div>
            <div class="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
              <p class="text-xs font-medium text-blue-600 dark:text-blue-400">
                Speed
              </p>
              <p class="text-xl font-bold text-blue-700 dark:text-blue-300">
                {speed1.toFixed(2)}{' '}
                <span class="text-sm font-normal">km/h</span>
              </p>
            </div>
          </div>
        </div>

        {/* Time 2 */}
        <div
          class={`rounded-xl p-6 shadow-lg transition-all ${
            showSecondTime
              ? 'bg-white dark:bg-gray-800'
              : 'border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
          }`}
        >
          {!showSecondTime ? (
            <button
              type="button"
              onClick={() => setShowSecondTime(true)}
              class="flex h-full w-full flex-col items-center justify-center gap-2 py-8 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span class="text-4xl">+</span>
              <span class="text-sm font-medium">
                Add second time to compare
              </span>
            </button>
          ) : (
            <>
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Estimated Time 2
                </h2>
                <div class="flex items-center gap-2">
                  <div class="h-3 w-3 rounded-full bg-emerald-500" />
                  <button
                    type="button"
                    onClick={() => setShowSecondTime(false)}
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label="Remove second time"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div class="flex gap-2">
                <div class="flex-1">
                  <label
                    class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400"
                    htmlFor="time2Hours"
                  >
                    Hours
                  </label>
                  <input
                    type="number"
                    id="time2Hours"
                    value={time2.hours}
                    onInput={e =>
                      handleTimeChange(
                        setTime2,
                        'hours',
                        Number((e.target as HTMLInputElement).value),
                      )
                    }
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    min="0"
                    max="24"
                  />
                </div>
                <div class="flex-1">
                  <label
                    class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400"
                    htmlFor="time2Minutes"
                  >
                    Minutes
                  </label>
                  <input
                    type="number"
                    id="time2Minutes"
                    value={time2.minutes}
                    onInput={e =>
                      handleTimeChange(
                        setTime2,
                        'minutes',
                        Number((e.target as HTMLInputElement).value),
                      )
                    }
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    min="0"
                    max="59"
                  />
                </div>
                <div class="flex-1">
                  <label
                    class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400"
                    htmlFor="time2Seconds"
                  >
                    Seconds
                  </label>
                  <input
                    type="number"
                    id="time2Seconds"
                    value={time2.seconds}
                    onInput={e =>
                      handleTimeChange(
                        setTime2,
                        'seconds',
                        Number((e.target as HTMLInputElement).value),
                      )
                    }
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    min="0"
                    max="59"
                  />
                </div>
              </div>

              {/* Calculated values */}
              <div class="mt-4 grid grid-cols-2 gap-4">
                <div class="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/30">
                  <p class="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Pace
                  </p>
                  <p class="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                    {formatPace(pacePerKm2)}{' '}
                    <span class="text-sm font-normal">/km</span>
                  </p>
                </div>
                <div class="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/30">
                  <p class="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Speed
                  </p>
                  <p class="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                    {speed2.toFixed(2)}{' '}
                    <span class="text-sm font-normal">km/h</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Splits Table */}
      <div class="rounded-xl bg-white shadow-lg dark:bg-gray-800">
        <div class="border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Kilometer Splits
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Split times for {selectedDistance.name} (
            {selectedDistance.km.toFixed(3)} km)
          </p>
        </div>

        <div class="max-h-[60vh] overflow-auto">
          <table class="w-full border-collapse">
            <thead class="sticky top-0 z-10 bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  KM
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  <div class="flex items-center justify-center gap-2">
                    <div class="h-2 w-2 rounded-full bg-blue-500" />
                    Split Time
                  </div>
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  <div class="flex items-center justify-center gap-2">
                    <div class="h-2 w-2 rounded-full bg-blue-500" />
                    Cumulative
                  </div>
                </th>
                {showSecondTime && (
                  <>
                    <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      <div class="flex items-center justify-center gap-2">
                        <div class="h-2 w-2 rounded-full bg-emerald-500" />
                        Split Time
                      </div>
                    </th>
                    <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      <div class="flex items-center justify-center gap-2">
                        <div class="h-2 w-2 rounded-full bg-emerald-500" />
                        Cumulative
                      </div>
                    </th>
                    <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Diff
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
              {splits1.map((split, idx) => {
                const isLastSplit = idx === splits1.length - 1
                const isPartialKm = split.km !== Math.floor(split.km)
                const split2 = splits2[idx]
                const diff = split2
                  ? split.cumulativeTime - split2.cumulativeTime
                  : 0

                return (
                  <tr
                    key={split.km}
                    class={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      isLastSplit
                        ? 'bg-gray-50 font-semibold dark:bg-gray-700/50'
                        : ''
                    }`}
                  >
                    <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {isPartialKm ? split.km.toFixed(3) : split.km}
                      {isLastSplit && (
                        <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          (finish)
                        </span>
                      )}
                    </td>
                    <td class="whitespace-nowrap px-4 py-3 text-center text-sm text-blue-600 dark:text-blue-400">
                      {formatPace(split.splitTime)}
                    </td>
                    <td class="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                      {formatTime(split.cumulativeTime)}
                    </td>
                    {showSecondTime && split2 && (
                      <>
                        <td class="whitespace-nowrap px-4 py-3 text-center text-sm text-emerald-600 dark:text-emerald-400">
                          {formatPace(split2.splitTime)}
                        </td>
                        <td class="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                          {formatTime(split2.cumulativeTime)}
                        </td>
                        <td
                          class={`whitespace-nowrap px-4 py-3 text-center text-sm font-medium ${
                            diff < 0
                              ? 'text-red-600 dark:text-red-400'
                              : diff > 0
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-gray-500'
                          }`}
                        >
                          {diff !== 0 && (diff > 0 ? '+' : '')}
                          {diff !== 0 ? formatTime(Math.abs(diff)) : '-'}
                        </td>
                      </>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary comparison */}
      {showSecondTime && (
        <div class="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            📊 Comparison Summary
          </h3>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Time Difference
              </p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                {formatTime(Math.abs(totalSeconds1 - totalSeconds2))}
                <span class="ml-2 text-sm font-normal text-gray-500">
                  {totalSeconds1 < totalSeconds2
                    ? '(Time 1 faster)'
                    : totalSeconds1 > totalSeconds2
                      ? '(Time 2 faster)'
                      : '(Same)'}
                </span>
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Pace Difference
              </p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                {formatPace(Math.abs(pacePerKm1 - pacePerKm2))}
                <span class="ml-2 text-sm font-normal text-gray-500">/km</span>
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Speed Difference
              </p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                {Math.abs(speed1 - speed2).toFixed(2)}
                <span class="ml-2 text-sm font-normal text-gray-500">km/h</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
