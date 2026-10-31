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

// Palette validated for colorblind separation against light and dark surfaces
const CONTRIB_FILL = 'fill-[#1e5a8c] dark:fill-[#3987e5]'
const CONTRIB_BG = 'bg-[#1e5a8c] dark:bg-[#3987e5]'
const INTEREST_FILL = 'fill-[#e0a106] dark:fill-[#c98500]'
const INTEREST_STROKE = 'stroke-[#e0a106] dark:stroke-[#c98500]'
const INTEREST_BG = 'bg-[#e0a106] dark:bg-[#c98500]'

const frequencyOptions = [
  { value: 1, label: 'Monthly' },
  { value: 3, label: 'Quarterly' },
  { value: 6, label: 'Biannual' },
  { value: 12, label: 'Yearly' },
]

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const compactFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const formatCurrency = (value: number): string =>
  currencyFormatter.format(value)

const niceStep = (raw: number): number => {
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const n = raw / magnitude
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10
  return nice * magnitude
}

type SliderFieldProps = {
  id: string
  label: string
  unit: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  hint?: string
}

function SliderField({
  id,
  label,
  unit,
  value,
  onChange,
  min,
  max,
  step,
  hint,
}: SliderFieldProps): JSX.Element {
  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) =>
    onChange(Number(e.currentTarget.value))

  return (
    <div>
      <div class="flex items-center justify-between gap-3">
        <label
          class="text-sm font-semibold text-gray-700 dark:text-gray-200"
          htmlFor={id}
        >
          {label}
        </label>
        <div class="flex items-center rounded-lg bg-gray-100 px-3 py-1 focus-within:ring-2 focus-within:ring-darkBlue dark:bg-gray-700 dark:focus-within:ring-mainYellow">
          <input
            type="number"
            id={id}
            value={value}
            onInput={handleInput}
            min={min}
            step={step}
            class="w-20 [appearance:textfield] bg-transparent text-right font-bold tabular-nums text-darkBlue outline-none dark:text-white [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span class="ml-1 text-sm text-gray-400 dark:text-gray-300">
            {unit}
          </span>
        </div>
      </div>
      <input
        type="range"
        aria-label={label}
        value={value}
        onInput={handleInput}
        min={min}
        max={max}
        step={step}
        class="mt-3 w-full cursor-pointer accent-darkBlue dark:accent-mainYellow"
      />
      {hint && (
        <p class="mt-1 text-xs text-gray-400 dark:text-gray-300">{hint}</p>
      )}
    </div>
  )
}

export default function CompoundInterestCalculator(): JSX.Element {
  const [initialCapital, setInitialCapital] = useState<number>(10000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500)
  const [duration, setDuration] = useState<number>(20)
  const [interestRate, setInterestRate] = useState<number>(7)
  const [advanced, setAdvanced] = useState<boolean>(false)
  const [compoundFrequencySetting, setCompoundFrequency] = useState<number>(12)
  const [rateVarianceSetting, setRateVariance] = useState<number>(2)
  const [entryFeeSetting, setEntryFee] = useState<number>(0)
  const [annualFeeSetting, setAnnualFee] = useState<number>(0.5)

  // Advanced settings keep their values while hidden, but only apply in advanced mode
  const compoundFrequency = advanced ? compoundFrequencySetting : 12
  const rateVariance = advanced ? rateVarianceSetting : 0
  const entryFee = advanced ? entryFeeSetting : 0
  const annualFee = advanced ? annualFeeSetting : 0
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const years = Math.min(100, Math.max(1, Math.round(duration) || 1))

  const calculateCompoundInterest = (
    rate: number = interestRate,
    applyFees = true,
  ): CalculationResult[] => {
    const results: CalculationResult[] = []
    const periodsPerYear = 12 / compoundFrequency
    const ratePerPeriod = rate / 100 / periodsPerYear
    const feePerPeriod = applyFees ? annualFee / 100 / periodsPerYear : 0
    const afterEntryFee = applyFees ? 1 - entryFee / 100 : 1

    let balance = initialCapital * afterEntryFee
    let totalContributions = initialCapital

    for (let year = 1; year <= years; year++) {
      for (let period = 0; period < periodsPerYear; period++) {
        // Add monthly contributions for each month in this compound period
        const monthsInPeriod = compoundFrequency
        balance += monthlyContribution * monthsInPeriod * afterEntryFee
        totalContributions += monthlyContribution * monthsInPeriod

        // Apply compound interest at the end of the period
        balance *= 1 + ratePerPeriod
        balance *= 1 - feePerPeriod
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

  const hasFees = entryFee > 0 || annualFee > 0
  const noFeeResults = calculateCompoundInterest(interestRate, false)
  const noFeeFinalResult = noFeeResults[noFeeResults.length - 1]
  const feeCost = noFeeFinalResult.balance - finalResult.balance
  const feeCostShare =
    noFeeFinalResult.balance > 0
      ? (feeCost / noFeeFinalResult.balance) * 100
      : 0
  const entryFeesPaid = (finalResult.totalContributions * entryFee) / 100

  const lowRate = Math.max(0, interestRate - rateVariance)
  const highRate = interestRate + rateVariance
  const lowResults =
    rateVariance > 0 ? calculateCompoundInterest(lowRate) : null
  const highResults =
    rateVariance > 0 ? calculateCompoundInterest(highRate) : null
  const lowFinalResult = lowResults?.[lowResults.length - 1]
  const highFinalResult = highResults?.[highResults.length - 1]

  const contributionShare =
    finalResult.balance > 0
      ? Math.max(
          0,
          Math.min(
            100,
            (finalResult.totalContributions / finalResult.balance) * 100,
          ),
        )
      : 100

  // Chart
  const startBalance = initialCapital * (1 - entryFee / 100)
  const startPoint: CalculationResult = {
    year: 0,
    balance: startBalance,
    totalContributions: initialCapital,
    totalInterest: startBalance - initialCapital,
  }
  const chartData = [startPoint, ...results]
  const noFeeData: CalculationResult[] = [
    {
      year: 0,
      balance: initialCapital,
      totalContributions: initialCapital,
      totalInterest: 0,
    },
    ...noFeeResults,
  ]
  const withStart = (data: CalculationResult[] | null) =>
    data ? [startPoint, ...data] : null
  const lowData = withStart(lowResults)
  const highData = withStart(highResults)

  const dataMax = Math.max(
    1,
    ...chartData.map(d => d.balance),
    highFinalResult?.balance ?? 0,
    hasFees ? noFeeFinalResult.balance : 0,
  )
  const yStep = niceStep(dataMax / 4)
  const yMax = Math.ceil(dataMax / yStep) * yStep
  const yTicks = Array.from(
    { length: Math.round(yMax / yStep) + 1 },
    (_, i) => i * yStep,
  )

  const x = (i: number) => (i / (chartData.length - 1)) * 100
  const y = (value: number) => 100 - (Math.max(0, value) / yMax) * 100
  const linePoints = (values: number[]) =>
    values.map((v, i) => `${x(i)},${y(v)}`).join(' L ')

  const contributionLine = linePoints(chartData.map(d => d.totalContributions))
  const balanceLine = linePoints(chartData.map(d => d.balance))
  const contributionArea = `M ${contributionLine} L 100,100 L 0,100 Z`
  const interestArea = `M ${balanceLine} L ${linePoints(
    chartData.map(d => d.totalContributions),
  )
    .split(' L ')
    .reverse()
    .join(' L ')} Z`

  const xTickStep = years <= 10 ? 1 : years <= 25 ? 5 : 10
  const xTicks = chartData.filter(d => d.year % xTickStep === 0)

  const hovered = hoveredIndex !== null ? chartData[hoveredIndex] : null

  return (
    <div class="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
      {/* Inputs */}
      <div class="space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 lg:sticky lg:top-6 dark:bg-gray-800 dark:ring-gray-700">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-lg font-bold text-darkBlue dark:text-white">
            Your plan
          </h2>
          <button
            type="button"
            role="switch"
            aria-checked={advanced}
            onClick={() => setAdvanced(!advanced)}
            class="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-300"
          >
            Advanced
            <span
              class={`relative h-5 w-9 rounded-full transition ${
                advanced
                  ? 'bg-darkBlue dark:bg-mainYellow'
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                class={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition ${
                  advanced ? 'translate-x-4' : ''
                }`}
              />
            </span>
          </button>
        </div>
        <SliderField
          id="initialCapital"
          label="Initial capital"
          unit="€"
          value={initialCapital}
          onChange={setInitialCapital}
          min={0}
          max={200000}
          step={1000}
        />
        <SliderField
          id="monthlyContribution"
          label="Monthly contribution"
          unit="€"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          min={0}
          max={5000}
          step={50}
        />
        <SliderField
          id="duration"
          label="Duration"
          unit="yrs"
          value={duration}
          onChange={setDuration}
          min={1}
          max={50}
          step={1}
        />
        <SliderField
          id="interestRate"
          label="Annual return"
          unit="%"
          value={interestRate}
          onChange={setInterestRate}
          min={0}
          max={15}
          step={0.1}
        />
        {advanced && (
          <div class="space-y-6 border-t border-gray-100 pt-6 dark:border-gray-700">
            <SliderField
              id="rateVariance"
              label="Return variance"
              unit="±%"
              value={rateVarianceSetting}
              onChange={setRateVariance}
              min={0}
              max={5}
              step={0.5}
              hint={
                rateVarianceSetting > 0
                  ? `Range: ${lowRate.toFixed(1)}% to ${highRate.toFixed(1)}%`
                  : 'Set above 0 to see a best/worst case range'
              }
            />
            <SliderField
              id="entryFee"
              label="Entry fee"
              unit="%"
              value={entryFeeSetting}
              onChange={setEntryFee}
              min={0}
              max={5}
              step={0.1}
              hint="Taken from each deposit"
            />
            <SliderField
              id="annualFee"
              label="Annual fees"
              unit="%/yr"
              value={annualFeeSetting}
              onChange={setAnnualFee}
              min={0}
              max={3}
              step={0.05}
              hint="Management fees, taken from the balance"
            />
            <fieldset>
              <legend class="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Compounding
              </legend>
              <div class="mt-2 grid grid-cols-4 gap-1 rounded-full bg-gray-100 p-1 dark:bg-gray-700">
                {frequencyOptions.map(option => {
                  const active = option.value === compoundFrequency
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCompoundFrequency(option.value)}
                      class={`rounded-full py-1.5 text-xs font-semibold transition ${
                        active
                          ? 'bg-white text-darkBlue shadow dark:bg-mainYellow'
                          : 'text-gray-400 hover:text-darkBlue dark:text-gray-300 dark:hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>
        )}
      </div>

      <div class="min-w-0 space-y-6">
        {/* Headline */}
        <div class="rounded-2xl bg-darkBlue p-6 text-white shadow-lg sm:p-8">
          <p class="text-sm font-medium text-white/70">
            After {years} {years === 1 ? 'year' : 'years'}, you could have
          </p>
          <p class="mt-1 text-5xl font-black tracking-tight tabular-nums text-mainYellow sm:text-6xl">
            {formatCurrency(finalResult.balance)}
          </p>
          {lowFinalResult && highFinalResult && (
            <p class="mt-2 text-sm text-white/70">
              Between{' '}
              <span class="font-semibold text-white">
                {formatCurrency(lowFinalResult.balance)}
              </span>{' '}
              and{' '}
              <span class="font-semibold text-white">
                {formatCurrency(highFinalResult.balance)}
              </span>{' '}
              at {lowRate.toFixed(1)}–{highRate.toFixed(1)}% return
            </p>
          )}

          <div
            class="mt-6 flex h-3 gap-0.5 overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <div
              class="rounded-l-full bg-[#3987e5]"
              style={{ width: `${contributionShare}%` }}
            />
            <div class="flex-1 rounded-r-full bg-mainYellow" />
          </div>
          <dl class="mt-4 grid grid-cols-2 gap-4">
            <div>
              <dt class="flex items-center gap-2 text-sm text-white/70">
                <span class="size-2.5 rounded-full bg-[#3987e5]" />
                You put in
              </dt>
              <dd class="mt-1 text-xl font-bold tabular-nums sm:text-2xl">
                {formatCurrency(finalResult.totalContributions)}
                <span class="ml-2 text-sm font-medium text-white/60">
                  {Math.round(contributionShare)}%
                </span>
              </dd>
            </div>
            <div>
              <dt class="flex items-center gap-2 text-sm text-white/70">
                <span class="size-2.5 rounded-full bg-mainYellow" />
                Interest earned
              </dt>
              <dd class="mt-1 text-xl font-bold tabular-nums sm:text-2xl">
                {formatCurrency(finalResult.totalInterest)}
                <span class="ml-2 text-sm font-medium text-white/60">
                  {Math.round(100 - contributionShare)}%
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Fees */}
        {hasFees && (
          <div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-300">
              Fees cost you
            </p>
            <p class="mt-1 text-3xl font-black tabular-nums text-red-600 dark:text-red-400">
              {formatCurrency(feeCost)}
              <span class="ml-2 text-base font-semibold text-gray-400 dark:text-gray-300">
                {feeCostShare.toFixed(1)}% of your potential balance
              </span>
            </p>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">
              Without fees, you could have{' '}
              <span class="font-semibold text-darkBlue dark:text-white">
                {formatCurrency(noFeeFinalResult.balance)}
              </span>
              .
            </p>
            <dl class="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 dark:border-gray-700">
              <div>
                <dt class="text-sm text-gray-500 dark:text-gray-300">
                  Entry fees paid
                </dt>
                <dd class="mt-1 text-lg font-bold tabular-nums text-darkBlue dark:text-white">
                  {formatCurrency(entryFeesPaid)}
                </dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500 dark:text-gray-300">
                  Annual fees + lost growth
                </dt>
                <dd class="mt-1 text-lg font-bold tabular-nums text-darkBlue dark:text-white">
                  {formatCurrency(feeCost - entryFeesPaid)}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {/* Chart */}
        <div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
          <div class="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <h3 class="text-lg font-bold text-darkBlue dark:text-white">
              Growth over time
            </h3>
            <ul class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-300">
              <li class="flex items-center gap-2">
                <span class={`size-3 rounded-sm ${CONTRIB_BG}`} />
                Contributions
              </li>
              <li class="flex items-center gap-2">
                <span class={`size-3 rounded-sm ${INTEREST_BG}`} />
                Interest
              </li>
              {hasFees && (
                <li class="flex items-center gap-2">
                  <span class="w-4 border-t-2 border-dotted border-red-600 dark:border-red-400" />
                  Without fees
                </li>
              )}
              {rateVariance > 0 && (
                <li class="flex items-center gap-2">
                  <span class="w-4 border-t-2 border-dashed border-gray-400" />±
                  {rateVariance}% range
                </li>
              )}
            </ul>
          </div>

          <div class="relative ml-14 h-64 sm:h-72">
            {yTicks.map(tick => (
              <span
                key={tick}
                class="absolute right-full mr-3 -translate-y-1/2 text-xs tabular-nums text-gray-400 dark:text-gray-300"
                style={{ top: `${y(tick)}%` }}
              >
                {compactFormatter.format(tick)}
              </span>
            ))}

            <svg
              class="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="img"
              aria-label="Stacked area chart of contributions and interest over time"
            >
              {yTicks.map(tick => (
                <line
                  key={tick}
                  x1="0"
                  x2="100"
                  y1={y(tick)}
                  y2={y(tick)}
                  class="stroke-gray-100 dark:stroke-gray-700"
                  stroke-width="1"
                  vector-effect="non-scaling-stroke"
                />
              ))}
              <path d={contributionArea} class={CONTRIB_FILL} />
              <path d={interestArea} class={INTEREST_FILL} />
              {/* Surface-colored seam separates the two stacked fills */}
              <path
                d={`M ${contributionLine}`}
                fill="none"
                class="stroke-white dark:stroke-gray-800"
                stroke-width="2"
                vector-effect="non-scaling-stroke"
              />
              <path
                d={`M ${balanceLine}`}
                fill="none"
                class={INTEREST_STROKE}
                stroke-width="2"
                vector-effect="non-scaling-stroke"
              />
              {lowData && highData && (
                <>
                  <path
                    d={`M ${linePoints(lowData.map(d => d.balance))}`}
                    fill="none"
                    class="stroke-gray-400"
                    stroke-width="1.5"
                    stroke-dasharray="4 4"
                    vector-effect="non-scaling-stroke"
                  />
                  <path
                    d={`M ${linePoints(highData.map(d => d.balance))}`}
                    fill="none"
                    class="stroke-gray-400"
                    stroke-width="1.5"
                    stroke-dasharray="4 4"
                    vector-effect="non-scaling-stroke"
                  />
                </>
              )}
              {hasFees && (
                <path
                  d={`M ${linePoints(noFeeData.map(d => d.balance))}`}
                  fill="none"
                  class="stroke-red-600 dark:stroke-red-400"
                  stroke-width="2"
                  stroke-dasharray="2 3"
                  vector-effect="non-scaling-stroke"
                />
              )}
            </svg>

            {hovered && hoveredIndex !== null && (
              <>
                <div
                  class="pointer-events-none absolute inset-y-0 w-px bg-gray-400"
                  style={{ left: `${x(hoveredIndex)}%` }}
                />
                <div
                  class="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-darkBlue ring-2 ring-white dark:bg-white dark:ring-gray-800"
                  style={{
                    left: `${x(hoveredIndex)}%`,
                    top: `${y(hovered.balance)}%`,
                  }}
                />
                <div
                  class={`pointer-events-none absolute top-0 z-10 w-52 rounded-xl bg-gray-900 p-3 text-xs text-white shadow-xl ${
                    x(hoveredIndex) > 55 ? '-translate-x-full -ml-3' : 'ml-3'
                  }`}
                  style={{ left: `${x(hoveredIndex)}%` }}
                >
                  <p class="mb-2 font-bold">Year {hovered.year}</p>
                  <div class="space-y-1 tabular-nums">
                    <p class="flex justify-between gap-2">
                      <span class="text-gray-300">Balance</span>
                      <span class="font-semibold">
                        {formatCurrency(hovered.balance)}
                      </span>
                    </p>
                    <p class="flex items-center justify-between gap-2">
                      <span class="flex items-center gap-1.5 text-gray-300">
                        <span class={`size-2 rounded-sm ${CONTRIB_BG}`} />
                        Contributions
                      </span>
                      <span>{formatCurrency(hovered.totalContributions)}</span>
                    </p>
                    <p class="flex items-center justify-between gap-2">
                      <span class="flex items-center gap-1.5 text-gray-300">
                        <span class={`size-2 rounded-sm ${INTEREST_BG}`} />
                        Interest
                      </span>
                      <span>{formatCurrency(hovered.totalInterest)}</span>
                    </p>
                    {hasFees && (
                      <p class="flex justify-between gap-2">
                        <span class="text-gray-300">Fees cost</span>
                        <span class="text-red-400">
                          {formatCurrency(
                            noFeeData[hoveredIndex].balance - hovered.balance,
                          )}
                        </span>
                      </p>
                    )}
                    {lowData && highData && (
                      <p class="flex justify-between gap-2 border-t border-gray-700 pt-1">
                        <span class="text-gray-300">Range</span>
                        <span>
                          {compactFormatter.format(
                            lowData[hoveredIndex].balance,
                          )}{' '}
                          –{' '}
                          {compactFormatter.format(
                            highData[hoveredIndex].balance,
                          )}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Overhang by half a column so each hit target is centered on its year */}
            <div
              class="absolute inset-y-0 flex"
              style={{
                left: `-${50 / (chartData.length - 1)}%`,
                right: `-${50 / (chartData.length - 1)}%`,
              }}
              onPointerLeave={() => setHoveredIndex(null)}
            >
              {chartData.map((d, i) => (
                <div
                  key={d.year}
                  class="h-full flex-1"
                  onPointerEnter={() => setHoveredIndex(i)}
                />
              ))}
            </div>
          </div>

          <div class="relative ml-14 mt-2 h-5">
            {xTicks.map(d => (
              <span
                key={d.year}
                class="absolute -translate-x-1/2 text-xs tabular-nums text-gray-400 dark:text-gray-300"
                style={{ left: `${x(d.year)}%` }}
              >
                {d.year === 0 ? 'Today' : `Y${d.year}`}
              </span>
            ))}
          </div>
        </div>

        {/* Table */}
        <details class="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
          <summary class="flex cursor-pointer list-none items-center justify-between p-6 font-bold text-darkBlue dark:text-white [&::-webkit-details-marker]:hidden">
            Year-by-year breakdown
            <span class="text-gray-400 transition group-open:rotate-90">▸</span>
          </summary>
          <div class="overflow-x-auto border-t border-gray-100 dark:border-gray-700">
            <table class="w-full text-sm tabular-nums">
              <thead class="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-300">
                <tr>
                  <th class="px-4 py-3 sm:px-6 text-left font-semibold">
                    Year
                  </th>
                  <th class="px-4 py-3 sm:px-6 text-right font-semibold">
                    Balance
                  </th>
                  <th class="px-4 py-3 sm:px-6 text-right font-semibold">
                    <span class="inline-flex items-center gap-1.5">
                      <span class={`size-2 rounded-sm ${CONTRIB_BG}`} />
                      Contributions
                    </span>
                  </th>
                  <th class="px-4 py-3 sm:px-6 text-right font-semibold">
                    <span class="inline-flex items-center gap-1.5">
                      <span class={`size-2 rounded-sm ${INTEREST_BG}`} />
                      Interest
                    </span>
                  </th>
                  {hasFees && (
                    <th class="px-4 py-3 sm:px-6 text-right font-semibold">
                      Fees cost
                    </th>
                  )}
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                {results.map((result, i) => (
                  <tr
                    key={result.year}
                    class="text-gray-500 hover:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-700/50"
                  >
                    <td class="whitespace-nowrap px-4 py-3 sm:px-6 font-semibold text-darkBlue dark:text-white">
                      {result.year}
                    </td>
                    <td class="whitespace-nowrap px-4 py-3 sm:px-6 text-right font-semibold text-darkBlue dark:text-white">
                      {formatCurrency(result.balance)}
                    </td>
                    <td class="whitespace-nowrap px-4 py-3 sm:px-6 text-right">
                      {formatCurrency(result.totalContributions)}
                    </td>
                    <td class="whitespace-nowrap px-4 py-3 sm:px-6 text-right">
                      {formatCurrency(result.totalInterest)}
                    </td>
                    {hasFees && (
                      <td class="whitespace-nowrap px-4 py-3 sm:px-6 text-right text-red-600 dark:text-red-400">
                        {formatCurrency(
                          noFeeResults[i].balance - result.balance,
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  )
}
