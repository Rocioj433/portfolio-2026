import { useLanguage } from '../i18n/useLanguage.ts'
import { asset } from '../lib/assets.ts'
import { revealIndex } from '../lib/useReveal.ts'
import { name } from '../data/portfolio.ts'

export default function Footer() {
  const { content } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" id="contacto" aria-labelledby="contacto-title">
      <div className="container">
        <h2 className="section__title" id="contacto-title" data-reveal>
          {content.contact.title}
        </h2>
        <p className="site-footer__text" data-reveal style={revealIndex(1)}>
          {content.contact.text}
        </p>

        <div className="site-footer__lead" data-reveal style={revealIndex(2)}>
          <a className="button button--primary" href={`mailto:${content.contact.email}`}>
            {content.contact.cta}
          </a>
          <p className="site-footer__availability">{content.contact.availability}</p>
        </div>

        <div className="site-footer__grid" data-reveal style={revealIndex(3)}>
          <ul className="site-footer__links">
            <li>
              <a className="site-footer__link" href={`mailto:${content.contact.email}`}>
                {content.contact.email}
              </a>
            </li>
            {content.contact.socials.map((social) => (
              <li key={social.href}>
                <a
                  className="site-footer__link"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (${content.ui.opensNewTab})`}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="site-footer__cv">
            <p className="site-footer__cv-label">{content.contact.cvLabel}</p>
            <div className="site-footer__cv-actions">
              {content.contact.cvs.map((cv) => (
                <a
                  key={cv.file}
                  className="button button--ghost button--small"
                  href={asset(cv.file)}
                  download
                  hrefLang={cv.lang}
                >
                  {cv.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__colophon" data-reveal style={revealIndex(4)}>
          <p>
            © {year} {name}
          </p>
          <p>
            {content.ui.builtWith}. {content.ui.footerNote}
          </p>
        </div>
      </div>
    </footer>
  )
}
