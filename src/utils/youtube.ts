/**
 * YouTube utility functions for parsing links, extracting IDs and generating thumbnails
 */

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  
  const trimmed = urlOrId.trim();

  // If already an 11 character alphanumeric ID (e.g., 'kJQP7kiw5Fk')
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle youtu.be shortlinks
  const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return youtuBeMatch[1];
  }

  // Handle youtube.com/watch?v=...
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // Handle youtube.com/embed/...
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  // Handle youtube.com/shorts/...
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  // Handle youtube.com/live/...
  const liveMatch = trimmed.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/);
  if (liveMatch && liveMatch[1]) {
    return liveMatch[1];
  }

  return trimmed;
}

export function getYouTubeThumbnail(videoId: string, quality: 'maxres' | 'hq' | 'mq' = 'maxres'): string {
  const id = extractYouTubeId(videoId);
  if (!id) return '';
  if (quality === 'maxres') {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
  if (quality === 'hq') {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string, autoplay = true): string {
  const id = extractYouTubeId(videoId);
  if (!id) return '';
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
