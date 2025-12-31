import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useState } from 'preact/hooks'

type NutritionZone = {
  min: number
  max: number
  label: string
  description: string
  color: string
}

const NUTRITION_ZONES: NutritionZone[] = [
  {
    min: 0,
    max: 30,
    label: 'Low',
    description: 'May be insufficient for efforts over 1 hour',
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    min: 30,
    max: 60,
    label: 'Moderate',
    description: 'Good for efforts up to 2-3 hours',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    min: 60,
    max: 90,
    label: 'High',
    description: 'Recommended for marathon and longer',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    min: 90,
    max: 120,
    label: 'Very High',
    description: 'For trained gut, ultra distances',
    color: 'text-purple-600 dark:text-purple-400',
  },
]

const PRESET_DISTANCES = [
  { name: '10km', km: 10 },
  { name: 'Half Marathon', km: 21.0975 },
  { name: 'Marathon', km: 42.195 },
  { name: '50km', km: 50 },
  { name: '100km', km: 100 },
]

export default function GlucidCalculator(): JSX.Element {
  const [weight, setWeight] = useState<number>(70)
  const [distance, setDistance] = useState<number>(42.195)
  const [estimatedHours, setEstimatedHours] = useState<number>(3)
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(55)
  const [glucidPerGel, setGlucidPerGel] = useState<number>(25)
  const [numberOfGels, setNumberOfGels] = useState<number>(9)

  // Calculations
  const totalTimeHours = estimatedHours + estimatedMinutes / 60
  const totalGlucid = glucidPerGel * numberOfGels
  const glucidPerHour = totalTimeHours > 0 ? totalGlucid / totalTimeHours : 0
  const glucidPerKgPerHour =
    totalTimeHours > 0 && weight > 0 ? totalGlucid / totalTimeHours / weight : 0

  // Recommendations based on effort duration
  const getRecommendedRange = (): { min: number; max: number } => {
    if (totalTimeHours < 1) return { min: 0, max: 30 }
    if (totalTimeHours < 2.5) return { min: 30, max: 60 }
    if (totalTimeHours < 4) return { min: 60, max: 90 }
    return { min: 60, max: 120 }
  }

  const recommendedRange = getRecommendedRange()
  const recommendedGelsMin = Math.ceil(
    (recommendedRange.min * totalTimeHours) / glucidPerGel,
  )
  const recommendedGelsMax = Math.ceil(
    (recommendedRange.max * totalTimeHours) / glucidPerGel,
  )

  const getCurrentZone = (): NutritionZone | null => {
    for (const zone of NUTRITION_ZONES) {
      if (glucidPerHour >= zone.min && glucidPerHour < zone.max) {
        return zone
      }
    }
    if (glucidPerHour >= 120) {
      return {
        min: 120,
        max: 999,
        label: 'Extreme',
        description: 'May cause GI distress - train your gut first',
        color: 'text-red-600 dark:text-red-400',
      }
    }
    return null
  }

  const currentZone = getCurrentZone()

  const isLow = glucidPerHour < recommendedRange.min
  const isOptimal =
    glucidPerHour >= recommendedRange.min &&
    glucidPerHour <= recommendedRange.max

  const formatTime = (hours: number, minutes: number): string => {
    return `${hours}h${minutes.toString().padStart(2, '0')}`
  }

  return (
    <div class="space-y-8">
      {/* Input Form */}
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Race Details
        </h2>

        <div class="grid gap-6 md:grid-cols-2">
          {/* Weight */}
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="weight"
            >
              Body Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onInput={e =>
                setWeight(Number((e.target as HTMLInputElement).value))
              }
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              min="30"
              max="200"
              step="1"
            />
          </div>

          {/* Distance with presets */}
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="distance"
            >
              Distance (km)
            </label>
            <div class="flex gap-2">
              <input
                type="number"
                id="distance"
                value={distance}
                onInput={e =>
                  setDistance(Number((e.target as HTMLInputElement).value))
                }
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                min="1"
                max="500"
                step="0.1"
              />
            </div>
            <div class="flex flex-wrap gap-2">
              {PRESET_DISTANCES.map(preset => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setDistance(preset.km)}
                  class={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    Math.abs(distance - preset.km) < 0.1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Time */}
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="estimatedHours"
            >
              Estimated Finish Time
            </label>
            <div class="flex gap-2">
              <div class="flex-1">
                <div class="relative">
                  <input
                    type="number"
                    id="estimatedHours"
                    value={estimatedHours}
                    onInput={e =>
                      setEstimatedHours(
                        Number((e.target as HTMLInputElement).value),
                      )
                    }
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    min="0"
                    max="48"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    h
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <div class="relative">
                  <input
                    type="number"
                    value={estimatedMinutes}
                    onInput={e =>
                      setEstimatedMinutes(
                        Number((e.target as HTMLInputElement).value),
                      )
                    }
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    min="0"
                    max="59"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    min
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Empty cell for grid alignment */}
          <div class="hidden md:block" />
        </div>
      </div>

      {/* Nutrition Plan */}
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Your Nutrition Plan
        </h2>

        <div class="grid gap-6 md:grid-cols-2">
          {/* Glucid per gel */}
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="glucidPerGel"
            >
              Carbs per Gel (g)
            </label>
            <input
              type="number"
              id="glucidPerGel"
              value={glucidPerGel}
              onInput={e =>
                setGlucidPerGel(Number((e.target as HTMLInputElement).value))
              }
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              min="1"
              max="100"
              step="1"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Maurten Gel 100: 25g carbs
            </p>
          </div>

          {/* Number of gels */}
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="numberOfGels"
            >
              Number of Gels
            </label>
            <input
              type="number"
              id="numberOfGels"
              value={numberOfGels}
              onInput={e =>
                setNumberOfGels(Number((e.target as HTMLInputElement).value))
              }
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              min="0"
              max="50"
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div class="grid gap-4 md:grid-cols-3">
        <div
          class={
            isLow
              ? 'rounded-xl p-6 text-white shadow-lg bg-linear-to-br from-amber-500 to-orange-500'
              : isOptimal
                ? 'rounded-xl p-6 text-white shadow-lg bg-linear-to-br from-emerald-500 to-green-500'
                : 'rounded-xl p-6 text-white shadow-lg bg-linear-to-br from-purple-500 to-pink-500'
          }
        >
          <p class="text-sm font-medium opacity-80">Carbs per Hour</p>
          <p class="text-3xl font-bold">{glucidPerHour.toFixed(0)}g/h</p>
          {currentZone && (
            <p class="mt-1 text-sm opacity-80">{currentZone.label}</p>
          )}
        </div>

        <div class="rounded-xl bg-linear-to-br from-slate-600 to-slate-700 p-6 text-white shadow-lg">
          <p class="text-sm font-medium opacity-80">Total Carbs</p>
          <p class="text-3xl font-bold">{totalGlucid}g</p>
          <p class="mt-1 text-sm opacity-80">
            for {formatTime(estimatedHours, estimatedMinutes)}
          </p>
        </div>

        <div class="rounded-xl bg-linear-to-br from-cyan-500 to-teal-500 p-6 text-white shadow-lg">
          <p class="text-sm font-medium opacity-80">Carbs per kg/h</p>
          <p class="text-3xl font-bold">{glucidPerKgPerHour.toFixed(2)}g</p>
          <p class="mt-1 text-sm opacity-80">per kg body weight</p>
        </div>
      </div>

      {/* Recommendation */}
      <div class="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          💡 Recommendation
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          For a <strong>{distance}km</strong> race in{' '}
          <strong>{formatTime(estimatedHours, estimatedMinutes)}</strong>, aim
          for{' '}
          <strong>
            {recommendedRange.min}-{recommendedRange.max}g/hour
          </strong>{' '}
          of carbs.
        </p>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          With your {glucidPerGel}g gels, that's approximately{' '}
          <strong>
            {recommendedGelsMin}-{recommendedGelsMax} gels
          </strong>{' '}
          total.
        </p>

        {glucidPerHour < recommendedRange.min && (
          <div class="mt-4 rounded-lg bg-amber-50 p-3 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            ⚠️ Your plan provides {glucidPerHour.toFixed(0)}g/h which is below
            the recommended range. Consider adding{' '}
            {Math.ceil(
              (recommendedRange.min * totalTimeHours - totalGlucid) /
                glucidPerGel,
            )}{' '}
            more gel(s).
          </div>
        )}

        {glucidPerHour > recommendedRange.max && (
          <div class="mt-4 rounded-lg bg-purple-50 p-3 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            ℹ️ Your plan provides {glucidPerHour.toFixed(0)}g/h which is above
            typical recommendations. Make sure your gut is trained for this
            intake.
          </div>
        )}

        {glucidPerHour >= recommendedRange.min &&
          glucidPerHour <= recommendedRange.max && (
            <div class="mt-4 rounded-lg bg-emerald-50 p-3 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
              ✅ Your nutrition plan is within the recommended range!
            </div>
          )}
      </div>

      {/* Nutrition Zones Reference */}
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Carbohydrate Intake Zones
        </h3>
        <div class="space-y-3">
          {NUTRITION_ZONES.map(zone => (
            <div
              key={zone.label}
              class={`flex items-center justify-between rounded-lg p-3 ${
                currentZone?.label === zone.label
                  ? 'bg-blue-50 ring-2 ring-blue-500 dark:bg-blue-900/20'
                  : 'bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div>
                <span class={`font-semibold ${zone.color}`}>{zone.label}</span>
                <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {zone.min}-{zone.max}g/h
                </span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {zone.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
