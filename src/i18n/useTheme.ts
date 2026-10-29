import { useContext } from 'react'
import { ThemeContext } from './theme-context.ts'
import type { ThemeContextValue } from './theme-context.ts'

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)

  if (!value) {
    throw new Error('useTheme must be used inside <ThemeProvider>')
  }

  return value
}
