import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { content as allContent, defaultLang } from '../data/portfolio.ts'
import type { Lang } from '../data/portfolio.ts'
import { LanguageContext } from './language-context.ts'

const STORAGE_KEY = 'portfolio:lang'

function isLang(value: string | null): value is Lang {
  return value === 'es' || value === 'en'
}

/**
 * Resolution order: ?lang= → localStorage → default (Spanish).
 * The user's explicit choice always wins over browser language detection.
 */
function readInitialLang(): Lang {
  if (typeof window === 'undefined') {
    return defaultLang
  }

  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromUrl)) {
    return fromUrl
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) {
      return stored
    }
  } catch {
    // Private mode / storage disabled — fall through to the default.
  }

  return defaultLang
}

function syncDocument(lang: Lang) {
  const current = allContent[lang]

  document.documentElement.lang = lang
  document.title = current.meta.title

  const setMeta = (selector: string, attribute: string, value: string) => {
    const element = document.head.querySelector<HTMLMetaElement>(selector)
    element?.setAttribute(attribute, value)
  }

  setMeta('meta[name="description"]', 'content', current.meta.description)
  setMeta('meta[property="og:title"]', 'content', current.meta.title)
  setMeta('meta[property="og:description"]', 'content', current.meta.description)
  setMeta('meta[property="og:locale"]', 'content', lang === 'es' ? 'es_AR' : 'en_US')
  setMeta('meta[name="twitter:title"]', 'content', current.meta.title)
  setMeta('meta[name="twitter:description"]', 'content', current.meta.description)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)

    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persisting the preference is a nice-to-have, never a hard failure.
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'es' ? 'en' : 'es')
  }, [lang, setLang])

  useEffect(() => {
    syncDocument(lang)
  }, [lang])

  const value = useMemo(
    () => ({ lang, content: allContent[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
