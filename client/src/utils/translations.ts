import { translations } from "@/data/translations";

type Language = 'en' | 'es';

/**
 * Helper function to get a nested translation by path
 */
export function getTranslation(language: Language, path: string): string {
  try {
    const keys = path.split('.');
    let result = translations[language];
    
    for (const key of keys) {
      result = result[key];
    }
    
    return typeof result === 'string' ? result : path;
  } catch (error) {
    console.error(`Translation not found for path: ${path}`);
    return path;
  }
}

/**
 * Convert objects to properly formatted strings based on language settings
 */
export function formatDate(date: Date, language: Language): string {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Format numbers based on language settings
 */
export function formatNumber(num: number, language: Language): string {
  return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'es-ES').format(num);
}
