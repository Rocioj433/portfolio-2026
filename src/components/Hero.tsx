import { useLanguage } from '../i18n/useLanguage.ts'
import { asset } from '../lib/assets.ts'
import { name } from '../data/portfolio.ts'

/** Split once so only the surnames get the shimmer treatment. */
const [firstName, ...surnames] = name.split(' ')

export default function Hero() {
  const { content, lang } = useLanguage()
  const cv = content.contact.cvs.find((item) => item.lang === lang) ?? content.contact.cvs[0]

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="container">
        <p className="hero__greeting">{content.hero.greeting}</p>
        <h1 className="hero__title" id="hero-title">
          {firstName} <span className="hero__surname">{surnames.join(' ')}</span>
        </h1>
        <p className="hero__headline">{content.hero.headline}</p>
        <ul className="hero__stack">
          {content.hero.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <p className="hero__location">
          <span className="hero__dot" aria-hidden="true" />
          <span>{content.hero.location}</span>
          <span className="hero__availability">{content.hero.availability}</span>
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#proyectos">
            {content.hero.ctaProjects}
          </a>
          <a className="button button--ghost" href={asset(cv.file)} download>
            {content.hero.ctaCv}
            <span className="button__hint" aria-hidden="true">
              {cv.lang === 'en' ? 'EN' : 'ES'}
            </span>
          </a>
          <a className="button button--link" href="#contacto">
            {content.hero.ctaContact}
          </a>
        </div>
      </div>
    </section>
  )
}
