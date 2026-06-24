import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useLocalStorage } from '../../hooks/useLocalStorage'

type HeartZone = {
  zone: number
  name: string
  minPct: number
  maxPct: number
  description: string
  gradient: string
}

const HEART_ZONES: HeartZone[] = [
  {
    zone: 1,
    name: 'Recovery',
    minPct: 50,
    maxPct: 60,
    description: 'Easy effort, active recovery',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    zone: 2,
    name: 'Aerobic',
    minPct: 60,
    maxPct: 70,
    description: 'Conversational pace, fat burning',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    zone: 3,
    name: 'Tempo',
    minPct: 70,
    maxPct: 80,
    description: 'Moderate effort, aerobic capacity',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    zone: 4,
    name: 'Threshold',
    minPct: 80,
    maxPct: 90,
    description: 'Hard effort, lactate threshold',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    zone: 5,
    name: 'VO2 Max',
    minPct: 90,
    maxPct: 100,
    description: 'Max effort, speed training',
    gradient: 'from-red-500 to-rose-500',
  },
]

export default function HeartZonesComponent(): JSX.Element {
  const [maxHr, setMaxHr] = useLocalStorage<number>(
    'runner-dashboard:heartZones.maxHr',
    190,
  )

  const getZoneBpm = (pct: number): number => Math.round((pct / 100) * maxHr)

  return (
    <div class="space-y-8">
      {/* Input */}
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Max Heart Rate
        </h2>

        <div class="max-w-xs space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="maxHr"
          >
            Max HR (bpm)
          </label>
          <input
            type="number"
            id="maxHr"
            value={maxHr}
            onInput={e =>
              setMaxHr(Number((e.target as HTMLInputElement).value))
            }
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="120"
            max="220"
            step="1"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Rough estimate: 220 - your age
          </p>
        </div>
      </div>

      {/* Zone Cards */}
      <div class="grid gap-4 md:grid-cols-5">
        {HEART_ZONES.map(zone => (
          <div
            key={zone.zone}
            class={`rounded-xl bg-linear-to-br ${zone.gradient} p-5 text-white shadow-lg`}
          >
            <p class="text-sm font-medium opacity-80">Zone {zone.zone}</p>
            <p class="text-lg font-bold">{zone.name}</p>
            <p class="mt-2 text-2xl font-bold">
              {getZoneBpm(zone.minPct)}-{getZoneBpm(zone.maxPct)}
            </p>
            <p class="text-sm opacity-80">bpm</p>
            <p class="mt-3 text-xs opacity-70">{zone.description}</p>
          </div>
        ))}
      </div>

      {/* Zones Table */}
      <div class="rounded-xl bg-white shadow-lg dark:bg-gray-800">
        <div class="border-b border-gray-200 p-6 pb-4 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Zone Details
          </h3>
        </div>
        <table class="w-full border-collapse">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Zone
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Name
              </th>
              <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                % of Max
              </th>
              <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Heart Rate
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Description
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
            {HEART_ZONES.map(zone => (
              <tr
                key={zone.zone}
                class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td class="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  Z{zone.zone}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                  {zone.name}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                  {zone.minPct}-{zone.maxPct}%
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                  {getZoneBpm(zone.minPct)}-{getZoneBpm(zone.maxPct)} bpm
                </td>
                <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {zone.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
