import { useLanguage } from '../i18n/useLanguage.ts'
import { revealIndex } from '../lib/useReveal.ts'
import ProjectCard from './ProjectCard.tsx'

export default function Projects() {
  const { content } = useLanguage()

  return (
    <section className="section" id="proyectos" aria-labelledby="proyectos-title">
      <div className="container">
        <h2 className="section__title" id="proyectos-title" data-reveal>
          {content.projects.title}
        </h2>
        <p className="section__intro" data-reveal style={revealIndex(1)}>
          {content.projects.intro}
        </p>
        <div className="projects__grid">
          {content.projects.items.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={index === 0}
              revealIndex={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
