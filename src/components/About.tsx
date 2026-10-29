import { useLanguage } from '../i18n/useLanguage.ts'
import { revealIndex } from '../lib/useReveal.ts'

export default function About() {
  const { content } = useLanguage()

  return (
    <section className="section" id="sobre-mi" aria-labelledby="sobre-mi-title">
      <div className="container">
        <h2 className="section__title" id="sobre-mi-title" data-reveal>
          {content.about.title}
        </h2>
        <div className="about">
          <div className="about__text">
            {content.about.paragraphs.map((paragraph, index) => (
              <p
                className="about__paragraph"
                key={paragraph}
                data-reveal
                style={revealIndex(index + 1)}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="highlights" data-reveal style={revealIndex(3)}>
            {content.about.highlights.map((highlight) => (
              <li className="highlight" key={highlight.label}>
                <span className="highlight__value">{highlight.value}</span>
                <span className="highlight__label">{highlight.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
