import type { JSX } from 'preact'
import React from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import MoonIcon from './icons/moon.svg'
import SunIcon from './icons/sun.svg'

type ThemeToggleProps = {
  className?: string
  textOnly?: boolean
}

export default function ThemeToggle({
  className,
  textOnly = false,
}: ThemeToggleProps): JSX.Element {
  const [theme, setTheme] = useState(
    window.localStorage.getItem('theme') ?? 'light',
  )

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      className={`px-2 py-4 ${className}`}
      onClick={handleClick}
      aria-label={`Activate ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {textOnly && (
        <span>{`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}</span>
      )}
      {theme === 'light' && !textOnly && (
        <img
          src={MoonIcon.src}
          alt="moon"
          style={'filter: invert(100%) contrast(50%);'}
          class="hover:animate-spin"
        />
      )}
      {theme === 'dark' && !textOnly && (
        <img src={SunIcon.src} alt="sun" class="hover:animate-spin" />
      )}
    </button>
  )
}
