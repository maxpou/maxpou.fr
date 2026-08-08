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

  const resetAll = () => {
    Object.keys(window.localStorage)
      .filter(key => key.startsWith('runner-dashboard:'))
      .forEach(key => {
        window.localStorage.removeItem(key)
      })
    window.location.reload()
  }

  return (
    <div class="space-y-8">
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Saved Preferences
        </h2>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Your preferences are saved in your browser's local storage. You can
          reset them individually by section or all at once.
        </p>
      </div>

      <div class="space-y-4">
        {STORAGE_SECTIONS.map(section => (
          <div
            key={section.name}
            class="flex items-center justify-between rounded-xl bg-white p-5 shadow-lg dark:bg-gray-800"
          >
            <div class="flex items-center gap-4">
              <span class="text-2xl">{section.icon}</span>
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
                  class="cursor-pointer rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(section.name)}
                class="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Reset
              </button>
            )}
          </div>
        ))}
      </div>

      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        {confirming === 'all' ? (
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              This will reset all preferences and return to the default tab.
            </span>
            <div class="flex items-center gap-2">
              <button
                type="button"
                onClick={resetAll}
                class="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
              >
                Confirm Reset All
              </button>
              <button
                type="button"
                onClick={() => setConfirming(null)}
                class="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming('all')}
            class="w-full cursor-pointer rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            Reset All Preferences
          </button>
        )}
      </div>
    </div>
  )
}
