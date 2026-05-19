// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url }) {
  const siteName = 'HIMMAH NW Komisariat STMIK';
  const defaultTitle = 'HIMMAH NW Komisariat STMIK';
  const defaultDescription = 'Website resmi HIMMAH NW Komisariat STMIK. Wadah pergerakan, pengabdian, dan prestasi mahasiswa Nahdlatul Wathan.';
  const defaultImage = '/img/logo.png';

  const seo = {
    title: title ? `${title} - ${siteName}` : defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: url || (typeof window !== 'undefined' ? window.location.href : ''),
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
}