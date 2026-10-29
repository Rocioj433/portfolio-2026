import { createContext } from 'react'
import type { Lang, Portfolio } from '../data/portfolio.ts'

export interface LanguageContextValue {
  lang: Lang
  content: Portfolio
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
