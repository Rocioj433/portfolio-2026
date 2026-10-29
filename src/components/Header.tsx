import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.ts'
import ThemeToggle from './ThemeToggle.tsx'

export default function Header() {
  const { content, lang, setLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="nav container">
        <a className="nav__brand" href="#inicio" aria-label={`RS, ${content.ui.homeLabel}`}>
          RS
        </a>

        <div className="nav__controls">
          <div className="lang-switch" role="group" aria-label={content.ui.languageLabel}>
            <button
              type="button"
              className="lang-switch__option"
              aria-pressed={lang === 'es'}
              onClick={() => setLang('es')}
            >
              ES
            </button>
            <button
              type="button"
              className="lang-switch__option"
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          <ThemeToggle />

          <button
            type="button"
            className="nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? content.ui.menuClose : content.ui.menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav__toggle-bar" aria-hidden="true" />
            <span className="nav__toggle-bar" aria-hidden="true" />
            <span className="nav__toggle-bar" aria-hidden="true" />
          </button>
        </div>

        <nav
          id="primary-navigation"
          className="nav__panel"
          data-open={menuOpen}
          aria-label={content.ui.navLabel}
        >
          <ul className="nav__list">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a className="nav__link" href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
