export interface MenuItem {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
  order: number;
}

export type VideoCategory = 'all' | 'emotional' | 'witty' | 'musical' | 'shorts';

export interface VideoItem {
  id: string;
  title: string;
  category: 'emotional' | 'witty' | 'musical' | 'shorts';
  categoryLabel: string;
  description: string;
  youtubeId: string;
  runningTime: string;
  tags: string[];
  featured: boolean;
  bgThumbnail?: string;
  viewCount?: string;
  rating?: number;
}

export interface InvitationItem {
  id: string;
  title: string;
  themeTag: string;
  subtitle: string;
  description: string;
  youtubeUrlOrId?: string;
  previewImage: string;
  galleryPhotos: string[];
  features: string[];
  isPopular?: boolean;
}

export interface InvitationSectionConfig {
  badge: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  badge: string;
  summary: string;
  description: string;
  details: string[];
  icon: 'discount' | 'invitation' | 'screen' | 'gift';
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  tips: string[];
  duration: string;
}

export interface ReviewItem {
  id: string;
  babyName: string;
  parentName: string;
  eventDate: string;
  hall: string;
  concept: string;
  rating: number;
  title: string;
  content: string;
  helpfulCount: number;
  createdAt: string;
}

export interface BookingLead {
  id: string;
  babyName: string;
  babyGender: 'boy' | 'girl' | 'undecided';
  eventDate: string;
  hallName: string;
  parentName: string;
  parentPhone: string;
  preferredConcept: string;
  notes: string;
  createdAt: string;
  status: '신규접수' | '상담완료' | '제작중' | '완료';
}

export interface ThemeConfig {
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
  fontFamily: 'pretendard' | 'serif' | 'gothic';
  glowIntensity: 'subtle' | 'vibrant' | 'minimal';
}

export interface SeoConfig {
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  ogImageUrl: string;
  ogSiteName: string;
  kakaoTitle: string;
  kakaoDescription: string;
}

export interface HeroContent {
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  titlePart2: string;
  subtitle: string;
  mainVideoId: string;
  partnershipBanner: string;
  stats: {
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
}

export interface SiteCopyConfig {
  brandName: string;
  brandPartnerSubtitle: string;
  videoSectionBadge: string;
  videoSectionTitle: string;
  videoSectionDescription: string;
  benefitsSectionBadge: string;
  benefitsSectionTitle: string;
  benefitsSectionDescription: string;
  processSectionBadge: string;
  processSectionTitle: string;
  processSectionDescription: string;
  processStudioTitle: string;
  processStudioDescription: string;
  reviewsSectionBadge: string;
  reviewsSectionTitle: string;
  reviewsSectionDescription: string;
  contactSectionBadge: string;
  contactSectionTitle: string;
  contactSectionDescription: string;
  companyName: string;
  ceoName: string;
  bizNumber: string;
  mailOrderNumber: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  kakaoChannelId: string;
}

