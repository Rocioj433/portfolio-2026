import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { content } from './portfolio.ts'

const langs = ['es', 'en'] as const

function publicFile(file: string): string {
  return resolve(process.cwd(), 'public', file)
}

describe('portfolio content', () => {
  it('exposes the same structure in both languages', () => {
    const [es, en] = langs.map((lang) => content[lang])

    expect(en.nav).toHaveLength(es.nav.length)
    expect(en.projects.items).toHaveLength(es.projects.items.length)
    expect(en.skills.groups).toHaveLength(es.skills.groups.length)
    expect(en.education.items).toHaveLength(es.education.items.length)
    expect(en.experience.items).toHaveLength(es.experience.items.length)
  })

  it('keeps navigation anchors unique and pointing to real sections', () => {
    for (const lang of langs) {
      const hrefs = content[lang].nav.map((item) => item.href)
      expect(new Set(hrefs).size).toBe(hrefs.length)
      for (const href of hrefs) {
        expect(href.startsWith('#')).toBe(true)
      }
    }
  })

  it('fills every project with content and a resolvable destination', () => {
    for (const lang of langs) {
      for (const project of content[lang].projects.items) {
        expect(project.title.trim()).not.toBe('')
        expect(project.subtitle.trim()).not.toBe('')
        expect(project.bullets.length).toBeGreaterThan(0)
        expect(project.tags.length).toBeGreaterThan(0)
        expect(project.url ?? project.status).toBeTruthy()
        if (project.url) {
          expect(project.url).toMatch(/^https:\/\/github\.com\//)
        }
      }
    }
  })

  it('ships the CV files referenced by the UI', () => {
    for (const lang of langs) {
      const cvs = content[lang].contact.cvs
      expect(cvs.length).toBeGreaterThanOrEqual(2)
      for (const cv of cvs) {
        expect(existsSync(publicFile(cv.file))).toBe(true)
      }
    }
  })

  it('provides metadata for every language', () => {
    for (const lang of langs) {
      expect(content[lang].meta.title).toContain('Rocío Sánchez Suárez')
      expect(content[lang].meta.description.length).toBeGreaterThan(80)
    }
  })
})
