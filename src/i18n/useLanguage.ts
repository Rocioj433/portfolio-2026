import { useContext } from 'react'
import { LanguageContext } from './language-context.ts'
import type { LanguageContextValue } from './language-context.ts'

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)

  if (!value) {
    throw new Error('useLanguage must be used inside <LanguageProvider>')
  }

  return value
}
