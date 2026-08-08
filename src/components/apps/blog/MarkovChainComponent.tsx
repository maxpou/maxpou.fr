import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useMemo, useState } from 'preact/hooks'

const DEFAULT_TEXT = 'The cat sat on the rug. The dog sat on the sofa.'

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?]/g, '')
    .split(/\s+/)
    .filter(Boolean)
}

function buildTransitions(
  words: string[],
): Record<string, Record<string, number>> {
  const transitions: Record<string, Record<string, number>> = {}

  for (let i = 0; i < words.length - 1; i++) {
    const current = words[i]
    const next = words[i + 1]
    transitions[current] ??= {}
    transitions[current][next] = (transitions[current][next] ?? 0) + 1
  }

  return transitions
}

function pickNext(counts: Record<string, number>): string {
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0)
  let roll = Math.random() * total

  for (const [word, count] of Object.entries(counts)) {
    roll -= count
    if (roll <= 0) return word
  }

  return Object.keys(counts)[0]
}

function generateSentence(
  transitions: Record<string, Record<string, number>>,
  start: string,
  maxWords: number,
): string[] {
  const sentence = [start]
  let current = start

  for (let i = 0; i < maxWords - 1; i++) {
    const counts = transitions[current]
    if (!counts) break
    current = pickNext(counts)
    sentence.push(current)
  }

  return sentence
}

export default function MarkovChainComponent(): JSX.Element {
  const [text, setText] = useState(DEFAULT_TEXT)
  const [selectedWord, setSelectedWord] = useState('the')
  const [generated, setGenerated] = useState<string[]>([
    'the',
    'dog',
    'sat',
    'on',
    'the',
    'cat',
  ])

  const words = useMemo(() => tokenize(text), [text])
  const transitions = useMemo(() => buildTransitions(words), [words])
  const keywords = useMemo(() => Object.keys(transitions), [transitions])

  const currentWord = keywords.includes(selectedWord)
    ? selectedWord
    : keywords[0]
  const counts = transitions[currentWord] ?? {}
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0)

  const handleGenerate = (): void => {
    if (keywords.length === 0) return
    setGenerated(generateSentence(transitions, keywords[0], 8))
  }

  return (
    <div class="not-prose rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <label class="flex flex-col gap-1">
        <span class="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Training text
        </span>
        <textarea
          value={text}
          onInput={e => setText((e.target as HTMLTextAreaElement).value)}
          rows={2}
          class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </label>

      <div class="mt-4 flex flex-wrap items-end gap-3">
        <label class="flex flex-col gap-1">
          <span class="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            After the word
          </span>
          <select
            value={currentWord}
            onChange={e =>
              setSelectedWord((e.target as HTMLSelectElement).value)
            }
            class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {keywords.map(word => (
              <option key={word} value={word}>
                {word}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleGenerate}
          class="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          Generate a sentence
        </button>
      </div>

      <ul class="mt-6 space-y-3">
        {Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map(([word, count]) => (
            <li key={word} class="flex items-center gap-3">
              <span class="w-24 shrink-0 font-semibold text-gray-900 dark:text-white">
                {word}
              </span>
              <span class="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <span
                  class="block h-full rounded-full bg-blue-500"
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </span>
              <span class="w-16 shrink-0 text-right text-sm tabular-nums text-gray-600 dark:text-gray-300">
                {((count / total) * 100).toFixed(0)}%
              </span>
            </li>
          ))}
      </ul>

      {generated.length > 0 && (
        <p class="mt-6 rounded-lg bg-gray-100 p-3 text-gray-900 dark:bg-gray-700 dark:text-white">
          {generated.join(' ')}
        </p>
      )}
    </div>
  )
}
