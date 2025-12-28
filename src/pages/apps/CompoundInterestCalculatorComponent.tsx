import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useState } from 'preact/hooks'

type CalculationResult = {
  year: number
  balance: number
  totalContributions: number
  totalInterest: number
}

export default function CompoundInterestCalculator(): JSX.Element {
  const [initialCapital, setInitialCapital] = useState<number>(10000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500)
  const [duration, setDuration] = useState<number>(20)
  const [interestRate, setInterestRate] = useState<number>(7)
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12)
  const [rateVariance, setRateVariance] = useState<number>(2)

  const calculateCompoundInterest = (
    rate: number = interestRate,
  ): CalculationResult[] => {
    const results: CalculationResult[] = []
    const periodsPerYear = 12 / compoundFrequency
    const ratePerPeriod = rate / 100 / periodsPerYear

    let balance = initialCapital
    let totalContributions = initialCapital

    for (let year = 1; year <= duration; year++) {
      for (let period = 0; period < periodsPerYear; period++) {
        // Add monthly contributions for each month in this compound period
        const monthsInPeriod = compoundFrequency
        balance += monthlyContribution * monthsInPeriod
        totalContributions += monthlyContribution * monthsInPeriod

        // Apply compound interest at the end of the period
        balance *= 1 + ratePerPeriod
      }

      results.push({
        year,
        balance: Math.round(balance * 100) / 100,
        totalContributions: Math.round(totalContributions * 100) / 100,
        totalInterest: Math.round((balance - totalContributions) * 100) / 100,
      })
    }

    return results
  }

  const results = calculateCompoundInterest()
  const finalResult = results[results.length - 1]

  const lowResults =
    rateVariance > 0
      ? calculateCompoundInterest(Math.max(0, interestRate - rateVariance))
      : null
  const highResults =
    rateVariance > 0
      ? calculateCompoundInterest(interestRate + rateVariance)
      : null
  const lowFinalResult = lowResults ? lowResults[lowResults.length - 1] : null
  const highFinalResult = highResults
    ? highResults[highResults.length - 1]
    : null

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const frequencyOptions = [
    { value: 1, label: 'Monthly' },
    { value: 3, label: 'Quarterly' },
    { value: 6, label: 'Semi-annually' },
    { value: 12, label: 'Annually' },
  ]

  return (
    <div class="space-y-8">
      {/* Input Form */}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="initialCapital"
          >
            Initial Capital (€)
          </label>
          <input
            type="number"
            id="initialCapital"
            value={initialCapital}
            onInput={e =>
              setInitialCapital(Number((e.target as HTMLInputElement).value))
            }
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="0"
            step="100"
          />
        </div>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="monthlyContribution"
          >
            Monthly Contribution (€)
          </label>
          <input
            type="number"
            id="monthlyContribution"
            value={monthlyContribution}
            onInput={e =>
              setMonthlyContribution(
                Number((e.target as HTMLInputElement).value),
              )
            }
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="0"
            step="50"
          />
        </div>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="duration"
          >
            Duration (years)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onInput={e =>
              setDuration(Number((e.target as HTMLInputElement).value))
            }
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="1"
            max="50"
          />
        </div>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="compoundFrequency"
          >
            Compound Frequency
          </label>
          <select
            id="compoundFrequency"
            value={compoundFrequency}
            onChange={e =>
              setCompoundFrequency(
                Number((e.target as HTMLSelectElement).value),
              )
            }
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {frequencyOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="interestRate"
          >
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onInput={e =>
              setInterestRate(Number((e.target as HTMLInputElement).value))
            }
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="0"
            max="30"
            step="0.1"
          />
        </div>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="rateVariance"
          >
            Interest Rate Variance (±%)
          </label>
          <input
            type="number"
            id="rateVariance"
            value={rateVariance}
            onInput={e =>
              setRateVariance(Number((e.target as HTMLInputElement).value))
            }
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="0"
            max="10"
            step="0.5"
          />
          {rateVariance > 0 && (
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Range: {Math.max(0, interestRate - rateVariance).toFixed(1)}% to{' '}
              {(interestRate + rateVariance).toFixed(1)}%
            </p>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      {finalResult && (
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-xl bg-linear-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
            <p class="text-sm font-medium opacity-80">Final Balance</p>
            <p class="text-3xl font-bold">
              {formatCurrency(finalResult.balance)}
            </p>
            {rateVariance > 0 && lowFinalResult && highFinalResult && (
              <p class="mt-1 text-sm opacity-80">
                Range: {formatCurrency(lowFinalResult.balance)} -{' '}
                {formatCurrency(highFinalResult.balance)}
              </p>
            )}
          </div>
          <div class="rounded-xl bg-linear-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
            <p class="text-sm font-medium opacity-80">Total Contributions</p>
            <p class="text-3xl font-bold">
              {formatCurrency(finalResult.totalContributions)}
            </p>
          </div>
          <div class="rounded-xl bg-linear-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
            <p class="text-sm font-medium opacity-80">Total Interest Earned</p>
            <p class="text-3xl font-bold">
              {formatCurrency(finalResult.totalInterest)}
            </p>
            {rateVariance > 0 && lowFinalResult && highFinalResult && (
              <p class="mt-1 text-sm opacity-80">
                Range: {formatCurrency(lowFinalResult.totalInterest)} -{' '}
                {formatCurrency(highFinalResult.totalInterest)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Visual Chart */}
      <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Growth Over Time
        </h3>
        <div class="relative h-64">
          <div class="absolute inset-0 flex items-end justify-between gap-1">
            {results.map(result => {
              const maxBalance = results[results.length - 1].balance
              const contributionHeight =
                (result.totalContributions / maxBalance) * 100
              const totalHeight = (result.balance / maxBalance) * 100

              return (
                <div
                  key={result.year}
                  class="group relative flex h-full flex-1 flex-col justify-end"
                >
                  {/* Tooltip */}
                  <div class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-700">
                    <p>Year {result.year}</p>
                    <p>Balance: {formatCurrency(result.balance)}</p>
                    <p>Interest: {formatCurrency(result.totalInterest)}</p>
                  </div>

                  {/* Interest bar (stacked on top) */}
                  <div
                    class="w-full rounded-t bg-purple-400 transition-all duration-300 dark:bg-purple-500"
                    style={{ height: `${totalHeight - contributionHeight}%` }}
                  />
                  {/* Contributions bar */}
                  <div
                    class="w-full bg-green-400 transition-all duration-300 dark:bg-green-500"
                    style={{ height: `${contributionHeight}%` }}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div class="mt-4 flex justify-center gap-6 text-sm">
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded bg-green-400 dark:bg-green-500" />
            <span class="text-gray-600 dark:text-gray-300">Contributions</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded bg-purple-400 dark:bg-purple-500" />
            <span class="text-gray-600 dark:text-gray-300">Interest</span>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div class="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Year
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Balance
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Contributions
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Interest Earned
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
              {results.map(result => (
                <tr
                  key={result.year}
                  class="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {result.year}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                    {formatCurrency(result.balance)}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-green-600 dark:text-green-400">
                    {formatCurrency(result.totalContributions)}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-purple-600 dark:text-purple-400">
                    {formatCurrency(result.totalInterest)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
