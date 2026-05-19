import { MetadataRoute } from 'next'
import { KANPUR_AREAS } from '@/data/areas'
import { SUBJECTS } from '@/data/subjects'
import { CLASS_LEVELS } from '@/data/classes'
import { SITE_CONFIG } from '@/config/site'
import fs from 'fs'
import path from 'path'

// Helper function to dynamically discover all static page routes in the app folder
function getStaticRoutes(dir: string, baseDir: string = dir): string[] {
  let routes: string[] = []
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      if (item.isDirectory()) {
        // Skip dynamic route folders, api, and NextJS route group folders
        if (
          item.name.startsWith('_') ||
          item.name.startsWith('(') ||
          item.name.includes('[') ||
          item.name === 'api'
        ) {
          continue
        }
        routes = routes.concat(getStaticRoutes(fullPath, baseDir))
      } else if (item.name === 'page.tsx') {
        const relativePath = path.relative(baseDir, dir).replace(/\\/g, '/')
        routes.push(relativePath === '' ? '' : `/${relativePath}`)
      }
    }
  } catch (error) {
    console.error('Error scanning static routes:', error)
  }
  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Dynamic Area Routes
  const areaRoutes = KANPUR_AREAS.map((area) => ({
    url: `${SITE_CONFIG.url}/areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 2. Dynamic Subject Routes
  const subjectRoutes = SUBJECTS.map((subject) => ({
    url: `${SITE_CONFIG.url}/tutors/${subject.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // 3. Dynamic Class Routes
  const classRoutes = CLASS_LEVELS.map((classLevel) => ({
    url: `${SITE_CONFIG.url}/classes/${classLevel.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // 4. Dynamic Blog Post Routes
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

  // 5. Automatically discover and build all Static Routes
  const appDir = path.join(process.cwd(), 'src/app')
  const staticPaths = getStaticRoutes(appDir)
  const staticRoutes = staticPaths.map((route) => {
    let priority = 0.8
    let changeFrequency: 'weekly' | 'monthly' = 'monthly'

    if (route === '') {
      priority = 1.0
      changeFrequency = 'weekly'
    } else if (route === '/blog') {
      priority = 0.8
      changeFrequency = 'weekly'
    } else if (
      route.includes('tuition-in-kanpur') || 
      route.includes('tutors-in-kanpur')
    ) {
      priority = 0.9
    } else if (route === '/register-tutor') {
      priority = 0.7
    }

    return {
      url: `${SITE_CONFIG.url}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }
  })

  return [
    ...staticRoutes,
    ...areaRoutes,
    ...subjectRoutes,
    ...classRoutes,
    ...blogRoutes,
  ]
}
