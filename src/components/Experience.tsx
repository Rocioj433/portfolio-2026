import { useLanguage } from '../i18n/useLanguage.ts'
import { revealIndex } from '../lib/useReveal.ts'

export default function Experience() {
  const { content } = useLanguage()

  return (
    <section className="section" id="experiencia" aria-labelledby="experiencia-title">
      <div className="container">
        <h2 className="section__title" id="experiencia-title" data-reveal>
          {content.experience.title}
        </h2>
        <ol className="timeline">
          {content.experience.items.map((item, index) => (
            <li
              className="timeline__item"
              key={`${item.org}-${item.role}`}
              data-reveal
              style={revealIndex(index)}
            >
              <div className="timeline__header">
                <h3 className="timeline__role">{item.role}</h3>
                <p className="timeline__org">{item.org}</p>
                <p className="timeline__meta">
                  <span className="timeline__period">{item.period}</span>
                  <span className="timeline__place">{item.place}</span>
                  <span className="timeline__mode">{item.mode}</span>
                </p>
              </div>
              <ul className="timeline__bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
