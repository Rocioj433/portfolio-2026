import type { PointerEvent } from 'react'
import type { Project } from '../data/portfolio.ts'
import { useLanguage } from '../i18n/useLanguage.ts'
import { revealIndex } from '../lib/useReveal.ts'

interface ProjectCardProps {
  project: Project
  /** The lead project gets the wide slot and a two-column body. */
  featured?: boolean
  /** Position in the reveal stagger; omitted when the card is not animated. */
  revealIndex?: number
}

export default function ProjectCard({
  project,
  featured = false,
  revealIndex: index,
}: ProjectCardProps) {
  const { content } = useLanguage()

  /** Drives the cursor-following spotlight in .card__glow (no re-render). */
  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <article
      className={featured ? 'card card--featured' : 'card'}
      onPointerMove={trackPointer}
      data-reveal
      style={revealIndex(index ?? 0)}
    >
      <span className="card__glow" aria-hidden="true" />
      <header className="card__header">
        <h3 className="card__title">{project.title}</h3>
        <p className="card__subtitle">{project.subtitle}</p>
      </header>
      <div className="card__body">
        <ul className="card__bullets">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="card__aside">
          <ul className="card__tags" aria-label={`${project.title}: ${project.tags.join(', ')}`}>
            {project.tags.map((tag) => (
              <li className="chip" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
          <div className="card__footer">
            {project.url ? (
              <a
                className="card__link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${content.ui.repoLink}: ${project.title} (${content.ui.opensNewTab})`}
              >
                {content.ui.repoLink}
                <span aria-hidden="true"> →</span>
              </a>
            ) : (
              <p className="card__status">{project.status}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
