import { useLanguage } from '../i18n/useLanguage.ts'
import { revealIndex } from '../lib/useReveal.ts'

export default function Skills() {
  const { content } = useLanguage()

  return (
    <section className="section" id="habilidades" aria-labelledby="habilidades-title">
      <div className="container">
        <h2 className="section__title" id="habilidades-title" data-reveal>
          {content.skills.title}
        </h2>
        <div className="skills">
          {content.skills.groups.map((group, index) => (
            <div className="skills__row" key={group.label} data-reveal style={revealIndex(index)}>
              <h3 className="skills__label">{group.label}</h3>
              <ul className="skills__chips">
                {group.skills.map((skill) => (
                  <li className="chip" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
