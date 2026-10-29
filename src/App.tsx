import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Experience from './components/Experience.tsx'
import Projects from './components/Projects.tsx'
import Skills from './components/Skills.tsx'
import Education from './components/Education.tsx'
import Footer from './components/Footer.tsx'
import { useLanguage } from './i18n/useLanguage.ts'
import { useReveal } from './lib/useReveal.ts'

export default function App() {
  const { content } = useLanguage()

  // Re-scans after a language change, because the lists re-key their children.
  useReveal(content)

  return (
    <>
      <a className="skip-link" href="#contenido">
        {content.ui.skipLink}
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  )
}
