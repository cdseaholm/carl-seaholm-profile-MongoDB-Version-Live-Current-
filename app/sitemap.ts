import { getBaseUrl } from "@/utils/helpers/helpers";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: `daily`
    },
    {
      url: `${getBaseUrl()}/blog`,
      lastModified: new Date().toISOString(),
      priority: 0.7,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/dashboard`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: `daily`
    },
    {
      url: `${getBaseUrl()}/login`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/logout`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/profile`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/profile`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/projects`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/recipes`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/signup`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/projects`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/about/development`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/about/overview`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/about/personal`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/about/professional`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
    {
      url: `${getBaseUrl()}/contact`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: `weekly`
    },
  ]
}