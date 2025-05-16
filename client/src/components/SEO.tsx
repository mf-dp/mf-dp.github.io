import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
}

export function SEO({
  title,
  description,
  keywords = "data science, bibliometrics, scientometrics, research, academic portfolio",
  author = "Mahdieh Fakhar",
  ogImage = "/path/to/og-image.jpg",
  ogUrl = "https://mahdieh-fakhar.github.io/",
  ogType = "website",
  twitterCard = "summary_large_image"
}: SEOProps) {
  const { language, t } = useLanguage();
  
  // Use translations if no direct props are provided
  const pageTitle = title || t('meta.title');
  const pageDescription = description || t('meta.description');

  useEffect(() => {
    // Update meta tags
    document.title = pageTitle;
    
    // Update description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', pageDescription);
    
    // Update keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', keywords);
    
    // Update author meta tag
    let authorMeta = document.querySelector('meta[name="author"]');
    if (!authorMeta) {
      authorMeta = document.createElement('meta');
      authorMeta.setAttribute('name', 'author');
      document.head.appendChild(authorMeta);
    }
    authorMeta.setAttribute('content', author);
    
    // Update Open Graph meta tags
    const ogTags = {
      'og:title': pageTitle,
      'og:description': pageDescription,
      'og:image': ogImage,
      'og:url': ogUrl,
      'og:type': ogType,
      'twitter:card': twitterCard,
      'twitter:title': pageTitle,
      'twitter:description': pageDescription,
      'twitter:image': ogImage
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
    
    // Add language attribute to HTML tag
    document.documentElement.setAttribute('lang', language);
    
    // Add structured data for Google
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      'mainEntity': {
        '@type': 'Person',
        'name': author,
        'description': pageDescription,
        'url': ogUrl,
        'image': ogImage,
        'jobTitle': 'Data Scientist & Researcher',
        'worksFor': {
          '@type': 'Organization',
          'name': 'UNED'
        },
        'alumniOf': [
          {
            '@type': 'CollegeOrUniversity',
            'name': 'UNIR'
          },
          {
            '@type': 'CollegeOrUniversity',
            'name': 'UNED'
          }
        ]
      }
    };
    
    let scriptTag = document.querySelector('#structured-data') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
  }, [pageTitle, pageDescription, keywords, author, ogImage, ogUrl, ogType, twitterCard, language]);
  
  return null; // This component doesn't render anything
}

export default SEO;