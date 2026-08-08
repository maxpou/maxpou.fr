import { useEffect, useRef, useState } from 'preact/hooks'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue)
  const isFirstRender = useRef(true)

  // Read from localStorage after hydration
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        setValue(JSON.parse(stored) as T)
      }
    } catch {
      // localStorage unavailable
    }
    isFirstRender.current = false
  }, [key])

  // Persist to localStorage on subsequent changes (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or unavailable */
    }
  }, [key, value])

  return [value, setValue] as const
}
