import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  /** Theme actually applied to the document right now. */
  theme: Theme
  /** Flips to the opposite of the current theme and persists the choice. */
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
