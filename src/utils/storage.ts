/**
 * LocalStorage wrapper with type safety and fallback handling
 */

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Failed to read from localStorage with key: ${key}`, err);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch a custom event so other components or windows can react
    window.dispatchEvent(new CustomEvent('daymade_storage_update', { detail: { key } }));
  } catch (err) {
    console.error(`Failed to save to localStorage with key: ${key}`, err);
  }
}

export const STORAGE_KEYS = {
  MENU: 'daymade_menu_items',
  HERO: 'daymade_hero_content',
  VIDEOS: 'daymade_video_items',
  INVITATIONS: 'daymade_invitations',
  INVITATION_CONFIG: 'daymade_invitation_config',
  BENEFITS: 'daymade_benefits',
  PROCESS: 'daymade_process_steps',
  REVIEWS: 'daymade_reviews',
  LEADS: 'daymade_leads',
  THEME: 'daymade_theme',
  SEO: 'daymade_seo',
  SITE_COPY: 'daymade_site_copy',
  ADMIN_PIN: 'daymade_admin_pin',
};
