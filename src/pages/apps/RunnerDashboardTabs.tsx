import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useState } from 'preact/hooks'
import GlucidCalculatorComponent from './GlucidCalculatorComponent'
import PaceCalculatorComponent from './PaceCalculatorComponent'
import SplitsCalculatorComponent from './SplitsCalculatorComponent'

type Tab = 'pace' | 'splits' | 'nutrition'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'pace', label: 'Pace Calculator', icon: '⏱️' },
  { id: 'splits', label: 'Splits', icon: '📏' },
  { id: 'nutrition', label: 'Nutrition Planner', icon: '🍯' },
]

export default function RunnerDashboardTabs(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>('pace')

  return (
    <div class="space-y-6">
      {/* Tab Navigation */}
      <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            class={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div class="min-h-[600px]">
        {activeTab === 'pace' && <PaceCalculatorComponent />}
        {activeTab === 'splits' && <SplitsCalculatorComponent />}
        {activeTab === 'nutrition' && <GlucidCalculatorComponent />}
      </div>
    </div>
  )
}
