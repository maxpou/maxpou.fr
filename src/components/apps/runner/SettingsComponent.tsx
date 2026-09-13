import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useState } from 'preact/hooks'

const STORAGE_SECTIONS = [
  {
    name: 'Splits',
    icon: '📏',
    description: 'Distance, target times, and comparison settings',
    keys: [
      'runner-dashboard:splits.distanceName',
      'runner-dashboard:splits.time1',
      'runner-dashboard:splits.showSecondTime',
      'runner-dashboard:splits.time2',
    ],
  },
  {
    name: 'Nutrition Planner',
    icon: '🍯',
    description: 'Weight, distance, estimated time, and gel settings',
    keys: [
      'runner-dashboard:nutrition.weight',
      'runner-dashboard:nutrition.distance',
      'runner-dashboard:nutrition.estimatedHours',
      'runner-dashboard:nutrition.estimatedMinutes',
      'runner-dashboard:nutrition.glucidPerGel',
      'runner-dashboard:nutrition.numberOfGels',
    ],
  },
  {
    name: 'Heart Zones',
    icon: '❤️',
    description: 'Maximum heart rate',
    keys: ['runner-dashboard:heartZones.maxHr'],
  },
]

export default function SettingsComponent(): JSX.Element {
  const [confirming, setConfirming] = useState<string | null>(null)

  const resetSection = (keys: string[]) => {
    keys.forEach(key => {
      window.localStorage.removeItem(key)
    })
    window.location.reload()
  }

  return (
    <div class="space-y-8">
      <div class="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
        <div class="border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Saved Preferences
          </h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Your preferences are saved in your browser's local storage. You can
            reset them individually by section or all at once.
          </p>
        </div>

        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          {STORAGE_SECTIONS.map(section => (
            <li
              key={section.name}
              class="flex flex-wrap items-center justify-between gap-4 p-5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/40"
            >
              <div class="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl dark:bg-gray-700"
                >
                  {section.icon}
                </span>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">
                    {section.name}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </div>

              {confirming === section.name ? (
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure?
                  </span>
                  <button
                    type="button"
                    onClick={() => resetSection(section.keys)}
                    class="cursor-pointer rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-red-600"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(null)}
                    class="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirming(section.name)}
                  class="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                >
                  Reset
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
