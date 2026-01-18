import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useState } from 'preact/hooks'

export default function PizzaDoughCalculator(): JSX.Element {
  const [numberOfDoughs, setNumberOfDoughs] = useState<number>(3)
  const [doughSize, setDoughSize] = useState<number>(250)
  const [hydration, setHydration] = useState<number>(67)

  // Calculate ingredients
  // Total dough = flour + water + salt + yeast
  // Water = hydration% × flour, Salt = 2% × flour, Yeast = 0.5% × flour
  // So: Total = flour × (1 + hydration/100 + 0.02 + 0.005)
  // Therefore: flour = Total / (1 + hydration/100 + 0.025)
  const totalDoughWeight = numberOfDoughs * doughSize
  const flour = totalDoughWeight / (1 + hydration / 100 + 0.025)
  const water = flour * (hydration / 100)
  const salt = flour * 0.02
  const yeast = flour * 0.005

  // Round values
  const roundedFlour = Math.round(flour)
  const roundedWater = Math.round(water)
  const roundedSalt = Math.round(salt * 10) / 10
  const roundedYeast = Math.round(yeast * 10) / 10

  return (
    <div class="space-y-8">
      {/* Input Form */}
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Your Pizza Specs
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="numberOfDoughs"
            >
              Number of Doughs
            </label>
            <input
              type="number"
              id="numberOfDoughs"
              value={numberOfDoughs}
              onInput={e =>
                setNumberOfDoughs(
                  Math.max(1, Number((e.target as HTMLInputElement).value)),
                )
              }
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              min="1"
              step="1"
            />
          </div>

          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="doughSize"
            >
              Dough Size (grams)
            </label>
            <input
              type="number"
              id="doughSize"
              value={doughSize}
              onInput={e =>
                setDoughSize(
                  Math.max(100, Number((e.target as HTMLInputElement).value)),
                )
              }
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              min="100"
              step="10"
            />
          </div>

          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="hydration"
            >
              Hydration (%)
            </label>
            <input
              type="number"
              id="hydration"
              value={hydration}
              onInput={e =>
                setHydration(
                  Math.min(
                    90,
                    Math.max(50, Number((e.target as HTMLInputElement).value)),
                  ),
                )
              }
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              min="50"
              max="90"
              step="1"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              60-65% for beginners, 70%+ for Neapolitan style
            </p>
          </div>
        </div>
      </div>

      {/* Results Cards */}
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl bg-linear-to-br from-amber-400 to-amber-500 p-6 text-white shadow-lg">
          <div class="mb-2 text-4xl">🌾</div>
          <p class="text-sm font-medium opacity-90">Flour</p>
          <p class="text-3xl font-bold">{roundedFlour}g</p>
        </div>

        <div class="rounded-xl bg-linear-to-br from-sky-400 to-sky-500 p-6 text-white shadow-lg">
          <div class="mb-2 text-4xl">💧</div>
          <p class="text-sm font-medium opacity-90">Water</p>
          <p class="text-3xl font-bold">{roundedWater}g</p>
        </div>

        <div class="rounded-xl bg-linear-to-br from-slate-400 to-slate-500 p-6 text-white shadow-lg">
          <div class="mb-2 text-4xl">🧂</div>
          <p class="text-sm font-medium opacity-90">Salt</p>
          <p class="text-3xl font-bold">{roundedSalt}g</p>
          <p class="mt-1 text-xs opacity-75">2% of flour</p>
        </div>

        <div class="rounded-xl bg-linear-to-br from-lime-400 to-lime-500 p-6 text-white shadow-lg">
          <div class="mb-2 text-4xl">🦠</div>
          <p class="text-sm font-medium opacity-90">Yeast</p>
          <p class="text-3xl font-bold">{roundedYeast}g</p>
          <p class="mt-1 text-xs opacity-75">0.5% of flour</p>
        </div>
      </div>
    </div>
  )
}
