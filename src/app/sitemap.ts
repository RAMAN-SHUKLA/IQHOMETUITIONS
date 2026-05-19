import { MetadataRoute } from 'next'
import { KANPUR_AREAS } from '@/data/areas'
import { SUBJECTS } from '@/data/subjects'
import { CLASS_LEVELS } from '@/data/classes'
import { SITE_CONFIG } from '@/config/site'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const areaRoutes = KANPUR_AREAS.map((area) => ({
    url: `${SITE_CONFIG.url}/areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const subjectRoutes = SUBJECTS.map((subject) => ({
    url: `${SITE_CONFIG.url}/tutors/${subject.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const classRoutes = CLASS_LEVELS.map((classLevel) => ({
    url: `${SITE_CONFIG.url}/classes/${classLevel.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Load blog routes dynamically
  let blogRoutes: any[] = []
  try {
    const blogDir = path.join(process.cwd(), 'src/content/blog')
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir)
      blogRoutes = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
          const slug = file.replace('.mdx', '')
          return {
            url: `${SITE_CONFIG.url}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          }
        })
    }
  } catch (error) {
    console.error('Error adding blogs to sitemap:', error)
  }

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/find-tutor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/online-tuition-in-kanpur`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/private-tutors-in-kanpur`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/one-to-one-tuition-in-kanpur`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/register-tutor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/founder-desk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...areaRoutes,
    ...subjectRoutes,
    ...classRoutes,
    ...blogRoutes,
  ]
}
