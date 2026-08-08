import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useState } from 'preact/hooks'

const VOCABULARY: Record<string, number[]> = {
  king: [0.9, 0.1, 0.2],
  queen: [0.92, 0.88, 0.22],
  man: [0.2, 0.1, 0.15],
  woman: [0.21, 0.89, 0.16],
  prince: [0.75, 0.12, 0.4],
  princess: [0.77, 0.87, 0.42],
  throne: [0.85, 0.48, 0.85],
  crown: [0.88, 0.5, 0.82],
  apple: [0.05, 0.5, 0.95],
  fruit: [0.02, 0.48, 0.9],
  chair: [0.1, 0.5, 0.8],
}

const WORDS = Object.keys(VOCABULARY)

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] ** 2
    normB += vecB[i] ** 2
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

function solveAnalogy(
  wordA: string,
  wordB: string,
  wordC: string,
): { word: string; similarity: number }[] {
  // Target = A - B + C, e.g. king - man + woman
  const target = VOCABULARY[wordA].map(
    (val, i) => val - VOCABULARY[wordB][i] + VOCABULARY[wordC][i],
  )

  return Object.entries(VOCABULARY)
    .filter(([word]) => ![wordA, wordB, wordC].includes(word))
    .map(([word, vec]) => ({ word, similarity: cosineSimilarity(target, vec) }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)
}

function WordSelect({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (word: string) => void
}): JSX.Element {
  return (
    <label class="flex flex-col gap-1">
      <span class="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <select
        value={value}
        onChange={e => onChange((e.target as HTMLSelectElement).value)}
        class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {WORDS.map(word => (
          <option key={word} value={word}>
            {word}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function WordAnalogyComponent(): JSX.Element {
  const [wordA, setWordA] = useState('king')
  const [wordB, setWordB] = useState('man')
  const [wordC, setWordC] = useState('woman')

  const matches = solveAnalogy(wordA, wordB, wordC)

  return (
    <div class="not-prose rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div class="flex flex-wrap items-end gap-3">
        <WordSelect label="Word A" value={wordA} onChange={setWordA} />
        <span class="pb-2 text-xl font-bold text-gray-400">−</span>
        <WordSelect label="Word B" value={wordB} onChange={setWordB} />
        <span class="pb-2 text-xl font-bold text-gray-400">+</span>
        <WordSelect label="Word C" value={wordC} onChange={setWordC} />
        <span class="pb-2 text-xl font-bold text-gray-400">≈ ?</span>
      </div>

      <ul class="mt-6 space-y-3">
        {matches.map((match, index) => (
          <li key={match.word} class="flex items-center gap-3">
            <span
              class={`w-24 shrink-0 font-semibold ${
                index === 0
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {match.word}
            </span>
            <span class="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <span
                class={`block h-full rounded-full ${
                  index === 0 ? 'bg-blue-500' : 'bg-blue-300 dark:bg-blue-800'
                }`}
                style={{ width: `${Math.max(0, match.similarity) * 100}%` }}
              />
            </span>
            <span class="w-16 shrink-0 text-right text-sm tabular-nums text-gray-600 dark:text-gray-300">
              {(match.similarity * 100).toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
