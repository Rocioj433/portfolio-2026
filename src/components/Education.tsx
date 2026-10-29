import { useLanguage } from '../i18n/useLanguage.ts'
import { revealIndex } from '../lib/useReveal.ts'

export default function Education() {
  const { content } = useLanguage()

  return (
    <section className="section section--band" id="formacion" aria-labelledby="formacion-title">
      <div className="container">
        <h2 className="section__title" id="formacion-title" data-reveal>
          {content.education.title}
        </h2>
        <p className="section__intro" data-reveal style={revealIndex(1)}>
          {content.education.intro}
        </p>
        <div className="education">
          <ul className="education__list" data-reveal style={revealIndex(2)}>
            {content.education.items.map((item) => (
              <li className="education__item" key={item.title}>
                <h3 className="education__title">{item.title}</h3>
                <p className="education__meta">
                  <span className="education__org">{item.org}</span>
                  <span className="education__period">{item.period}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="education__certs" data-reveal style={revealIndex(3)}>
            <h3 className="education__certs-label">{content.education.certificationsLabel}</h3>
            <ul className="education__certs-list">
              {content.education.certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
