import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageProvider.tsx'
import { ThemeProvider } from './i18n/ThemeProvider.tsx'

function renderApp() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>,
  )
}

describe('<App />', () => {
  it('renders the hero in Spanish by default', () => {
    renderApp()

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Rocío Sánchez Suárez')
    expect(screen.getByText(/Desarrolladora Full Stack/)).toBeTruthy()
    expect(document.documentElement.lang).toBe('es')
  })

  it('lists every section in the main navigation', () => {
    renderApp()

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' })
    const links = within(nav).getAllByRole('link')

    expect(links).toHaveLength(6)
    expect(links.map((link) => link.getAttribute('href'))).toContain('#experiencia')
  })

  it('switches the whole page to English and back', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: 'EN' }))

    expect(screen.getByText(/Full Stack Developer/)).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'ES' }))

    expect(screen.getByText(/Desarrolladora Full Stack/)).toBeTruthy()
    expect(document.documentElement.lang).toBe('es')
  })

  it('points the hero CV button at the CV matching the language', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(screen.getByRole('link', { name: /Descargar CV/ }).getAttribute('href')).toBe(
      '/CV_RocioSanchez.pdf',
    )

    await user.click(screen.getByRole('button', { name: 'EN' }))

    expect(screen.getByRole('link', { name: /Download CV/ }).getAttribute('href')).toBe(
      '/CV_RocioSanchez_EN.pdf',
    )
  })

  it('always offers both CVs in the contact section', () => {
    renderApp()

    const footer = screen.getByRole('contentinfo')

    expect(within(footer).getByRole('link', { name: 'CV Español' }).getAttribute('href')).toBe(
      '/CV_RocioSanchez.pdf',
    )
    expect(within(footer).getByRole('link', { name: 'CV English' }).getAttribute('href')).toBe(
      '/CV_RocioSanchez_EN.pdf',
    )
  })

  it('starts in light mode and toggles to dark, remembering the choice', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(document.documentElement.dataset.theme).toBe('light')

    await user.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }))

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('portfolio:theme')).toBe('dark')
    expect(screen.getByRole('button', { name: 'Cambiar a tema claro' })).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'Cambiar a tema claro' }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem('portfolio:theme')).toBe('light')
  })
})
