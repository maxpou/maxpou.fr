import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'

type PaceRow = {
  paceMinutes: number
  paceSeconds: number
  speedKmh: number
  times: { distance: string; time: string }[]
}

const DISTANCES = [
  { name: 'Marathon', km: 42.195 },
  { name: '30km', km: 30 },
  { name: 'Half', km: 21.0975 },
  { name: '20km', km: 20 },
  { name: '15km', km: 15 },
  { name: '10km', km: 10 },
  { name: '5km', km: 5 },
]

function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.floor(totalMinutes % 60)
  const seconds = Math.round((totalMinutes % 1) * 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function formatPace(minutes: number, seconds: number): string {
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function generatePaceRows(): PaceRow[] {
  const rows: PaceRow[] = []

  // From 8:00 to 2:00 min/km in 5-second increments
  for (let totalSeconds = 8 * 60; totalSeconds >= 2 * 60; totalSeconds -= 5) {
    const paceMinutes = Math.floor(totalSeconds / 60)
    const paceSeconds = totalSeconds % 60
    const paceInMinutes = totalSeconds / 60
    const speedKmh = 60 / paceInMinutes

    const times = DISTANCES.map(d => ({
      distance: d.name,
      time: formatTime(paceInMinutes * d.km),
    }))

    rows.push({
      paceMinutes,
      paceSeconds,
      speedKmh: Math.round(speedKmh * 100) / 100,
      times,
    })
  }

  return rows
}

export default function RunnerDashboard(): JSX.Element {
  const rows = generatePaceRows()

  return (
    <div class="space-y-6">
      {/* Results Table */}
      <div class="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
        <div class="max-h-[75vh] overflow-auto">
          <table class="w-full border-collapse">
            <thead class="sticky top-0 z-20 bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="sticky left-0 z-30 bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                  Pace
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  km/h
                </th>
                {DISTANCES.map(d => (
                  <th
                    key={d.name}
                    class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  >
                    {d.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
              {rows.map(row => {
                const paceKey = `${row.paceMinutes}:${row.paceSeconds}`

                return (
                  <tr
                    key={paceKey}
                    class="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td class="sticky left-0 z-10 whitespace-nowrap bg-white px-4 py-3 text-sm font-bold text-gray-900 dark:bg-gray-800 dark:text-white">
                      {formatPace(row.paceMinutes, row.paceSeconds)}
                      <span class="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        /km
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                      {row.speedKmh.toFixed(1)}
                    </td>
                    {row.times.map(t => (
                      <td
                        key={t.distance}
                        class="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900 dark:text-white"
                      >
                        {t.time}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
