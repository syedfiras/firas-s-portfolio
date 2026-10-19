import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';

const SITE_URL = 'https://www.syedfiras.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projects: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects,
  ];
}
