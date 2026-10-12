import type { JSX } from 'preact'
// biome-ignore lint/correctness/noUnusedImports: Needed for JSX types
import * as React from 'preact/compat'
import { useEffect, useRef, useState } from 'preact/hooks'

type Phase = 'prompt' | 'model' | 'tool' | 'answer'

interface ToolCall {
  id: string
  name: string
  input: Record<string, string>
}

interface Step {
  id: string
  phase: Phase
  role: 'user' | 'assistant' | 'tool'
  text?: string
  toolCall?: ToolCall
  toolResult?: { toolUseId: string; content: string; isError?: boolean }
  stopReason?: 'tool_use' | 'end_turn'
}

const SLUGIFY_SOURCE = `export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}`

const STEPS: Step[] = [
  {
    id: 'u1',
    phase: 'prompt',
    role: 'user',
    text: 'The slugify test is failing on CI. Can you fix it?',
  },
  {
    id: 'a1',
    phase: 'model',
    role: 'assistant',
    text: "I'll run the failing test first to see the error.",
    toolCall: {
      id: 'toolu_01',
      name: 'Bash',
      input: { command: 'npm test -- slugify' },
    },
    stopReason: 'tool_use',
  },
  {
    id: 't1',
    phase: 'tool',
    role: 'tool',
    toolResult: {
      toolUseId: 'toolu_01',
      isError: true,
      content: `FAIL src/utils/slugify.test.ts
  ✕ removes accents (3 ms)

  Expected: "cafe-au-lait"
  Received: "caf-au-lait"

Tests: 1 failed, 2 passed`,
    },
  },
  {
    id: 'a2',
    phase: 'model',
    role: 'assistant',
    text: 'The accented "é" is dropped instead of converted. Let me read the implementation.',
    toolCall: {
      id: 'toolu_02',
      name: 'Read',
      input: { file_path: 'src/utils/slugify.ts' },
    },
    stopReason: 'tool_use',
  },
  {
    id: 't2',
    phase: 'tool',
    role: 'tool',
    toolResult: { toolUseId: 'toolu_02', content: SLUGIFY_SOURCE },
  },
  {
    id: 'a3',
    phase: 'model',
    role: 'assistant',
    text: 'The regex removes every non-ASCII character. I need to strip the accents before that step.',
    toolCall: {
      id: 'toolu_03',
      name: 'Edit',
      input: {
        file_path: 'src/utils/slugify.ts',
        old_string: '.toLowerCase()\n    .trim()',
        new_string:
          ".normalize('NFD')\n    .replace(/[\\u0300-\\u036f]/g, '')\n    .toLowerCase()\n    .trim()",
      },
    },
    stopReason: 'tool_use',
  },
  {
    id: 't3',
    phase: 'tool',
    role: 'tool',
    toolResult: {
      toolUseId: 'toolu_03',
      content: 'The file src/utils/slugify.ts has been updated.',
    },
  },
  {
    id: 'a4',
    phase: 'model',
    role: 'assistant',
    text: 'Now I verify the fix.',
    toolCall: {
      id: 'toolu_04',
      name: 'Bash',
      input: { command: 'npm test -- slugify' },
    },
    stopReason: 'tool_use',
  },
  {
    id: 't4',
    phase: 'tool',
    role: 'tool',
    toolResult: {
      toolUseId: 'toolu_04',
      content: `PASS src/utils/slugify.test.ts
  ✓ lowercases (1 ms)
  ✓ replaces spaces (1 ms)
  ✓ removes accents (2 ms)

Tests: 3 passed`,
    },
  },
  {
    id: 'a5',
    phase: 'answer',
    role: 'assistant',
    text: 'Fixed. slugify now decomposes accented characters with NFD normalisation and strips the combining marks before the ASCII filter runs. All 3 tests pass.',
    stopReason: 'end_turn',
  },
]

const PHASES: { key: Phase; label: string }[] = [
  { key: 'prompt', label: 'Prompt' },
  { key: 'model', label: 'Model' },
  { key: 'tool', label: 'Tool' },
  { key: 'answer', label: 'Answer' },
]

const ROLE_LABEL: Record<Step['role'], string> = {
  user: 'You',
  assistant: 'Model',
  tool: 'Harness',
}

const SEGMENT_COLOR: Record<Phase, string> = {
  prompt: 'bg-blue-400',
  model: 'bg-mainYellow',
  tool: 'bg-gray-400',
  answer: 'bg-green-500',
}

function toolNameFor(toolUseId: string): string {
  return STEPS.find(s => s.toolCall?.id === toolUseId)?.toolCall?.name ?? ''
}

function apiCallNumber(index: number): number {
  return STEPS.slice(0, index + 1).filter(s => s.role === 'assistant').length
}

function describe(step: Step, index: number): JSX.Element {
  const code = (text: string): JSX.Element => (
    <code class="rounded bg-gray-100 px-1 py-0.5 font-mono text-[0.85em] dark:bg-gray-700">
      {text}
    </code>
  )

  if (step.phase === 'prompt') {
    return (
      <>
        You send a request. The harness adds it to the transcript and calls the
        model.
      </>
    )
  }
  if (step.phase === 'tool' && step.toolResult) {
    return (
      <>
        The harness runs {code(toolNameFor(step.toolResult.toolUseId))} on your
        machine, appends the output to the transcript, then calls the model
        again.
      </>
    )
  }
  if (step.phase === 'answer') {
    return (
      <>
        <strong>API call #{apiCallNumber(index)}.</strong> No tool requested, so{' '}
        {code('stop_reason: "end_turn"')}. The loop exits and you see the
        answer.
      </>
    )
  }
  return (
    <>
      <strong>API call #{apiCallNumber(index)}.</strong> The model reads the
      whole transcript and asks for {code(step.toolCall?.name ?? '')}. Response
      ends with {code('stop_reason: "tool_use"')}.
    </>
  )
}

function toApiMessages(steps: Step[]): unknown[] {
  const messages: unknown[] = []
  for (const step of steps) {
    if (step.role === 'user') {
      messages.push({ role: 'user', content: step.text })
    } else if (step.role === 'assistant') {
      const content: unknown[] = []
      if (step.text) content.push({ type: 'text', text: step.text })
      if (step.toolCall) {
        content.push({
          type: 'tool_use',
          id: step.toolCall.id,
          name: step.toolCall.name,
          input: step.toolCall.input,
        })
      }
      messages.push({ role: 'assistant', content })
    } else if (step.toolResult) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: step.toolResult.toolUseId,
            content: step.toolResult.content,
            ...(step.toolResult.isError ? { is_error: true } : {}),
          },
        ],
      })
    }
  }
  return messages
}

function ToolCallBody({ call }: { call: ToolCall }): JSX.Element {
  if (call.name === 'Bash') {
    return (
      <>
        <span class="select-none text-gray-400">$ </span>
        {call.input.command}
      </>
    )
  }
  if (call.name === 'Edit') {
    return (
      <>
        <div class="mb-1 text-gray-400">{call.input.file_path}</div>
        {call.input.old_string.split('\n').map(line => (
          <div key={`-${line}`} class="text-red-400">
            - {line.trim()}
          </div>
        ))}
        {call.input.new_string.split('\n').map(line => (
          <div key={`+${line}`} class="text-green-400">
            + {line.trim()}
          </div>
        ))}
      </>
    )
  }
  if (call.input.file_path) return <>{call.input.file_path}</>
  return <>{JSON.stringify(call.input, null, 2)}</>
}

function TranscriptItem({
  step,
  latest,
}: {
  step: Step
  latest: boolean
}): JSX.Element {
  return (
    <li
      class={`grid grid-cols-[4.5rem_1fr] gap-3 border-l-2 py-3 pl-3 pr-1 transition-opacity sm:grid-cols-[5.5rem_1fr] ${
        latest ? 'border-mainYellow' : 'border-transparent opacity-60'
      }`}
    >
      <div class="pt-0.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {ROLE_LABEL[step.role]}
      </div>

      <div class="min-w-0 space-y-2 text-sm text-gray-900 dark:text-gray-100">
        {step.text && <p class="leading-relaxed">{step.text}</p>}

        {step.toolCall && (
          <div class="overflow-hidden rounded-lg border border-mainYellow/60">
            <div class="flex items-center gap-2 bg-mainYellow/20 px-3 py-1 text-xs">
              <span class="font-semibold">Tool call</span>
              <span class="font-mono">{step.toolCall.name}</span>
            </div>
            <pre class="overflow-x-auto whitespace-pre-wrap bg-gray-900 px-3 py-2 font-mono text-xs leading-relaxed text-gray-100">
              <ToolCallBody call={step.toolCall} />
            </pre>
          </div>
        )}

        {step.toolResult && (
          <div
            class={`overflow-hidden rounded-lg border ${
              step.toolResult.isError
                ? 'border-red-400/60'
                : 'border-gray-200 dark:border-gray-600'
            }`}
          >
            <div
              class={`flex items-center gap-2 px-3 py-1 text-xs ${
                step.toolResult.isError
                  ? 'bg-red-500/15 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <span class="font-semibold">Tool result</span>
              <span class="font-mono">
                {toolNameFor(step.toolResult.toolUseId)}
              </span>
              {step.toolResult.isError && (
                <span class="ml-auto font-mono">is_error</span>
              )}
            </div>
            <pre class="max-h-48 overflow-auto bg-gray-900 px-3 py-2 font-mono text-xs leading-relaxed text-gray-100">
              {step.toolResult.content}
            </pre>
          </div>
        )}
      </div>
    </li>
  )
}

function LoopIndicator({ phase }: { phase: Phase }): JSX.Element {
  const pill = (key: Phase): JSX.Element => {
    const item = PHASES.find(p => p.key === key)
    const active = key === phase
    return (
      <span
        aria-current={active ? 'step' : undefined}
        class={`rounded-full px-3 py-1 transition-colors ${
          active
            ? 'bg-mainYellow font-semibold text-gray-900'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {item?.label}
      </span>
    )
  }
  const arrow = (symbol: string, title: string): JSX.Element => (
    <span aria-hidden="true" title={title} class="text-gray-400">
      {symbol}
    </span>
  )

  return (
    <div class="flex items-center gap-1 text-xs sm:text-sm">
      {pill('prompt')}
      {arrow('→', '')}
      {pill('model')}
      {arrow('⇄', 'Repeats until the model stops asking for tools')}
      {pill('tool')}
      <span class="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
      {pill('answer')}
    </div>
  )
}

const iconButton =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-30 dark:text-gray-200 dark:hover:bg-gray-700'

export default function AgentLoopComponent(): JSX.Element {
  const [cursor, setCursor] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [view, setView] = useState<'transcript' | 'raw'>('transcript')
  const logRef = useRef<HTMLDivElement>(null)

  const visible = STEPS.slice(0, cursor + 1)
  const current = STEPS[cursor]
  const isLast = cursor === STEPS.length - 1
  const messages = toApiMessages(visible)

  useEffect(() => {
    if (!playing) return
    if (cursor >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const id = setTimeout(() => setCursor(c => c + 1), 1800)
    return () => clearTimeout(id)
  }, [playing, cursor])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [cursor, view])

  const goTo = (index: number): void => {
    setPlaying(false)
    setCursor(Math.max(0, Math.min(STEPS.length - 1, index)))
  }

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'ArrowRight') goTo(cursor + 1)
    if (e.key === 'ArrowLeft') goTo(cursor - 1)
  }

  return (
    <section
      class="not-prose overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      aria-label="Agent loop demo"
      onKeyDown={onKeyDown}
    >
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <LoopIndicator phase={current.phase} />

        <fieldset class="flex rounded-lg bg-gray-100 p-0.5 text-xs dark:bg-gray-900">
          <legend class="sr-only">View mode</legend>
          {(['transcript', 'raw'] as const).map(mode => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              aria-pressed={view === mode}
              class={`rounded-md px-3 py-1 font-medium transition-colors ${
                view === mode
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {mode === 'transcript' ? 'Transcript' : 'Raw API messages'}
            </button>
          ))}
        </fieldset>
      </div>

      <div
        ref={logRef}
        class="h-[26rem] overflow-y-auto px-2 py-2 [scrollbar-width:thin] sm:px-4 dark:[color-scheme:dark]"
        aria-live="polite"
      >
        {view === 'transcript' ? (
          <ol>
            {visible.map((step, index) => (
              <TranscriptItem
                key={step.id}
                step={step}
                latest={index === cursor}
              />
            ))}
          </ol>
        ) : (
          <div class="py-2 font-mono text-xs leading-relaxed text-gray-800 dark:text-gray-200">
            <div class="mb-2 text-gray-500 dark:text-gray-400">
              {`// messages[] sent on the next API call (${messages.length})`}
            </div>
            {messages.map((message, index) => (
              <pre
                key={index}
                class={`overflow-x-auto border-l-2 py-1 pl-3 ${
                  index === messages.length - 1
                    ? 'border-mainYellow bg-mainYellow/10'
                    : 'border-transparent opacity-60'
                }`}
              >
                {JSON.stringify(message, null, 2)}
              </pre>
            ))}
          </div>
        )}
      </div>

      <div class="border-t border-gray-200 bg-gray-100/50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
        <p class="min-h-[2.75rem] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {describe(current, cursor)}
        </p>

        <div class="mt-3 flex items-center gap-3">
          <div class="flex items-center gap-1">
            <button
              type="button"
              onClick={() => goTo(cursor - 1)}
              disabled={cursor === 0}
              aria-label="Previous step"
              class={iconButton}
            >
              <svg
                viewBox="0 0 20 20"
                class="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.7 4.3a1 1 0 0 1 0 1.4L8.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => (isLast ? goTo(0) : setPlaying(p => !p))}
              aria-label={isLast ? 'Restart' : playing ? 'Pause' : 'Play'}
              class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mainYellow text-gray-900 transition-transform hover:scale-105"
            >
              <svg
                viewBox="0 0 20 20"
                class="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                {isLast ? (
                  <path d="M10 3a7 7 0 1 1-6.6 4.7 1 1 0 1 1 1.9.6A5 5 0 1 0 10 5v2L6.5 4 10 1v2Z" />
                ) : playing ? (
                  <path d="M5 3h3.5v14H5zM11.5 3H15v14h-3.5z" />
                ) : (
                  <path d="M5 2.5v15L17 10 5 2.5Z" />
                )}
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(cursor + 1)}
              disabled={isLast}
              aria-label="Next step"
              class={iconButton}
            >
              <svg
                viewBox="0 0 20 20"
                class="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7.3 15.7a1 1 0 0 1 0-1.4l4.3-4.3-4.3-4.3a1 1 0 0 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0Z" />
              </svg>
            </button>
          </div>

          <div class="flex flex-1 gap-1">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to step ${index + 1}: ${ROLE_LABEL[step.role]}`}
                class="group flex-1 py-2"
              >
                <span
                  class={`block h-1.5 rounded-full transition-all group-hover:opacity-100 ${
                    index <= cursor
                      ? SEGMENT_COLOR[step.phase]
                      : 'bg-gray-200 dark:bg-gray-700'
                  } ${index === cursor ? 'ring-2 ring-offset-1 ring-gray-400 dark:ring-offset-gray-800' : ''}`}
                />
              </button>
            ))}
          </div>

          <span class="text-xs tabular-nums text-gray-500 dark:text-gray-400">
            {cursor + 1}/{STEPS.length}
          </span>
        </div>
      </div>
    </section>
  )
}
