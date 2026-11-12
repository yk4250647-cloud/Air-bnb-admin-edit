import { properties } from '../data/properties';

export default function sitemap() {
  const base = 'https://www.modernhospitality.in';
  const pages = ['', '/properties', '/about', '/contact', '/location', '/faq'];
  return [
    ...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...properties.map((p) => ({ url: `${base}/properties/${p.slug}`, lastModified: new Date() })),
  ];
}
