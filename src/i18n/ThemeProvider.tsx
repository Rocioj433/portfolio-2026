import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './theme-context.ts'
import type { Theme } from './theme-context.ts'

const STORAGE_KEY = 'portfolio:theme'

/** Kept in sync with the `theme-color` meta tag and the inline script in index.html. */
const THEME_COLOR: Record<Theme, string> = {
  light: '#f6f7f5',
  dark: '#030303',
}

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function systemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Resolution order: localStorage → OS preference → dark (the signature theme).
 * The inline script in index.html applies the same order before React mounts,
 * so there is no flash of the wrong theme.
 */
function readInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isTheme(stored)) {
      return stored
    }
  } catch {
    // Private mode / storage disabled — fall back to the OS preference.
  }

  return systemTheme()
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)
  // Once the user picks a theme explicitly we stop following the OS.
  const [followSystem, setFollowSystem] = useState(() => {
    try {
      return !isTheme(window.localStorage.getItem(STORAGE_KEY))
    } catch {
      return true
    }
  })

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    setFollowSystem(false)

    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persisting the preference is a nice-to-have, never a hard failure.
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  // Follow OS changes only while the user has no explicit preference.
  useEffect(() => {
    if (!followSystem || typeof window.matchMedia !== 'function') {
      return
    }

    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      setThemeState(event.matches ? 'dark' : 'light')
    }

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [followSystem])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme

    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    meta?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
