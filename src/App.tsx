/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  HeroContent,
  VideoItem,
  InvitationItem,
  InvitationSectionConfig,
  BenefitItem,
  ProcessStep,
  ReviewItem,
  BookingLead,
  ThemeConfig,
  SeoConfig,
  SiteCopyConfig,
} from './types';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_HERO_CONTENT,
  INITIAL_VIDEOS,
  INITIAL_INVITATIONS,
  INITIAL_INVITATION_CONFIG,
  INITIAL_BENEFITS,
  INITIAL_PROCESS_STEPS,
  INITIAL_REVIEWS,
  INITIAL_LEADS,
  INITIAL_THEME,
  INITIAL_SEO,
  INITIAL_SITE_COPY,
  DEFAULT_ADMIN_PIN,
} from './data/initialData';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/storage';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VideoGallery } from './components/VideoGallery';
import { VideoModal } from './components/VideoModal';
import { InvitationGallery } from './components/InvitationGallery';
import { InvitationModal } from './components/InvitationModal';
import { PartnershipBenefits } from './components/PartnershipBenefits';
import { ProcessGuide } from './components/ProcessGuide';
import { ReviewsSection } from './components/ReviewsSection';
import { LeadForm } from './components/LeadForm';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminPinModal } from './components/admin/AdminPinModal';
import { KakaoConsultModal } from './components/KakaoConsultModal';
import { MessageCircle, Settings, ArrowUp, Lock } from 'lucide-react';

export default function App() {
  // 1. Persistent State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.MENU, INITIAL_MENU_ITEMS)
  );

  const [heroContent, setHeroContent] = useState<HeroContent>(() =>
    loadFromStorage(STORAGE_KEYS.HERO, INITIAL_HERO_CONTENT)
  );

  const [videos, setVideos] = useState<VideoItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS)
  );

  // Invitations (NEW: 동영상 링크, 밑에 사진들, 상세 설명)
  const [invitations, setInvitations] = useState<InvitationItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.INVITATIONS, INITIAL_INVITATIONS)
  );

  const [invitationConfig, setInvitationConfig] = useState<InvitationSectionConfig>(() =>
    loadFromStorage(STORAGE_KEYS.INVITATION_CONFIG, INITIAL_INVITATION_CONFIG)
  );

  const [benefits, setBenefits] = useState<BenefitItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.BENEFITS, INITIAL_BENEFITS)
  );

  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(() =>
    loadFromStorage(STORAGE_KEYS.PROCESS, INITIAL_PROCESS_STEPS)
  );

  const [reviews, setReviews] = useState<ReviewItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS)
  );

  const [leads, setLeads] = useState<BookingLead[]>(() =>
    loadFromStorage(STORAGE_KEYS.LEADS, INITIAL_LEADS)
  );

  const [theme, setTheme] = useState<ThemeConfig>(() =>
    loadFromStorage(STORAGE_KEYS.THEME, INITIAL_THEME)
  );

  const [seo, setSeo] = useState<SeoConfig>(() =>
    loadFromStorage(STORAGE_KEYS.SEO, INITIAL_SEO)
  );

  // Full site copy config (NEW: 사이트의 모든 텍스트 편집)
  const [siteCopy, setSiteCopy] = useState<SiteCopyConfig>(() =>
    loadFromStorage(STORAGE_KEYS.SITE_COPY, INITIAL_SITE_COPY)
  );

  // Admin Security PIN (NEW: 보안 비밀번호 잠금)
  const [adminPin, setAdminPin] = useState<string>(() =>
    loadFromStorage(STORAGE_KEYS.ADMIN_PIN, DEFAULT_ADMIN_PIN)
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);

  // 2. UI Dialog / Modal States
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [activeModalInvitation, setActiveModalInvitation] = useState<InvitationItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isKakaoOpen, setIsKakaoOpen] = useState(false);
  const [selectedConceptForLead, setSelectedConceptForLead] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 3. Sync changes to LocalStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.MENU, menuItems);
  }, [menuItems]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.HERO, heroContent);
  }, [heroContent]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.VIDEOS, videos);
  }, [videos]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.INVITATIONS, invitations);
  }, [invitations]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.INVITATION_CONFIG, invitationConfig);
  }, [invitationConfig]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BENEFITS, benefits);
  }, [benefits]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROCESS, processSteps);
  }, [processSteps]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
  }, [reviews]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.LEADS, leads);
  }, [leads]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, theme);
    document.documentElement.style.setProperty('--accent-color', theme.accentColor);
    document.documentElement.style.setProperty('--accent-glow', `${theme.accentColor}50`);
    document.documentElement.style.setProperty('--bg-main', theme.bgColor);
  }, [theme]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SEO, seo);
    if (seo.pageTitle) {
      document.title = seo.pageTitle;
    }
  }, [seo]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SITE_COPY, siteCopy);
  }, [siteCopy]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ADMIN_PIN, adminPin);
  }, [adminPin]);

  // Scroll listener for back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admin Open Request: checks password authentication
  const handleRequestAdminOpen = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsPinModalOpen(true);
    }
  };

  const handleAdminPinSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsPinModalOpen(false);
    setIsAdminOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
    alert('관리자 모드에서 안전하게 로그아웃(잠금)되었습니다.');
  };

  // Video modal opener
  const handlePlayMainVideo = (videoId: string) => {
    const found = videos.find((v) => v.youtubeId === videoId);
    if (found) {
      setActiveModalVideo(found);
    } else {
      setActiveModalVideo({
        id: 'hero-main-theater',
        title: '시엠프레 탕정점 데이메이드 대표 시네마틱 무비',
        category: 'emotional',
        categoryLabel: '대표 시네마틱',
        description: heroContent.subtitle,
        youtubeId: videoId,
        runningTime: '04:12',
        tags: ['시엠프레 제휴', '돌잔치 성장동영상', '4K 마스터링'],
        featured: true,
      });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectConcept = (conceptName: string) => {
    setSelectedConceptForLead(conceptName);
    handleScrollToSection('contact');
  };

  const handleAddReview = (newReviewData: Omit<ReviewItem, 'id' | 'createdAt' | 'helpfulCount'>) => {
    const newRev: ReviewItem = {
      ...newReviewData,
      id: `review-${Date.now()}`,
      helpfulCount: 1,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setReviews([newRev, ...reviews]);
  };

  const handleUpvoteReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleSubmitLead = (newLeadData: Omit<BookingLead, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newLead: BookingLead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      status: '신규접수',
      createdAt: timeStr,
    };
    setLeads([newLead, ...leads]);
  };

  const handleResetDefaults = () => {
    if (confirm('모든 데이터(초대장, 영상, 문구, 메뉴, 테마)를 초기 데모 기본값으로 복원하시겠습니까?')) {
      setMenuItems(INITIAL_MENU_ITEMS);
      setHeroContent(INITIAL_HERO_CONTENT);
      setVideos(INITIAL_VIDEOS);
      setInvitations(INITIAL_INVITATIONS);
      setInvitationConfig(INITIAL_INVITATION_CONFIG);
      setBenefits(INITIAL_BENEFITS);
      setProcessSteps(INITIAL_PROCESS_STEPS);
      setReviews(INITIAL_REVIEWS);
      setLeads(INITIAL_LEADS);
      setTheme(INITIAL_THEME);
      setSeo(INITIAL_SEO);
      setSiteCopy(INITIAL_SITE_COPY);
      setAdminPin(DEFAULT_ADMIN_PIN);
      localStorage.clear();
      alert('초기 기본값으로 복원되었습니다.');
    }
  };

  // Font family class helper
  const getFontClass = () => {
    if (theme.fontFamily === 'serif') return 'font-serif-kr';
    if (theme.fontFamily === 'gothic') return 'font-display';
    return '';
  };

  return (
    <div
      className={`min-h-screen text-neutral-100 transition-colors ${getFontClass()}`}
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* 1. Header / Top Navigation Bar */}
      <Navbar
        menuItems={menuItems}
        theme={theme}
        brandName={siteCopy.brandName}
        brandPartnerSubtitle={siteCopy.brandPartnerSubtitle}
        onOpenAdmin={handleRequestAdminOpen}
        onOpenConsultation={() => handleScrollToSection('contact')}
      />

      <main>
        {/* 2. Hero Section */}
        <HeroSection
          content={heroContent}
          theme={theme}
          onPlayMainVideo={handlePlayMainVideo}
          onExploreSamples={() => handleScrollToSection('samples')}
          onClaimBenefit={() => {
            setSelectedConceptForLead('시엠프레 탕정점 단독 제휴 패키지 (40% OFF)');
            handleScrollToSection('contact');
          }}
        />

        {/* 3. Sample Videos Gallery (성장동영상) */}
        <VideoGallery
          videos={videos}
          theme={theme}
          badge={siteCopy.videoSectionBadge}
          title={siteCopy.videoSectionTitle}
          description={siteCopy.videoSectionDescription}
          onOpenVideoModal={(video) => setActiveModalVideo(video)}
          onSelectConceptForLead={handleSelectConcept}
        />

        {/* 4. Mobile Invitations Gallery (NEW: 돌잔치 모바일 초대장 샘플 - 동영상 링크 + 밑에 사진들 + 상세 설명) */}
        <InvitationGallery
          invitations={invitations}
          config={invitationConfig}
          theme={theme}
          onOpenInvitationModal={(invitation) => setActiveModalInvitation(invitation)}
          onSelectInvitationForLead={handleSelectConcept}
        />

        {/* 5. Siempre Tangjeong Partnership Benefits */}
        <PartnershipBenefits
          benefits={benefits}
          theme={theme}
          badge={siteCopy.benefitsSectionBadge}
          title={siteCopy.benefitsSectionTitle}
          description={siteCopy.benefitsSectionDescription}
          onApplyBenefit={(title) => {
            setSelectedConceptForLead(title);
            handleScrollToSection('contact');
          }}
        />

        {/* 6. Production Process Guide */}
        <ProcessGuide
          steps={processSteps}
          theme={theme}
          badge={siteCopy.processSectionBadge}
          title={siteCopy.processSectionTitle}
          description={siteCopy.processSectionDescription}
          studioTitle={siteCopy.processStudioTitle}
          studioDescription={siteCopy.processStudioDescription}
          onOpenConsultation={() => handleScrollToSection('contact')}
        />

        {/* 7. Real Customer Reviews */}
        <ReviewsSection
          reviews={reviews}
          theme={theme}
          onAddReview={handleAddReview}
          onUpvoteReview={handleUpvoteReview}
        />

        {/* 8. Fast Consultation & Booking Lead Form */}
        <LeadForm
          theme={theme}
          selectedConcept={selectedConceptForLead}
          onSubmitLead={handleSubmitLead}
          onOpenKakaoChat={() => setIsKakaoOpen(true)}
        />
      </main>

      {/* 9. Footer */}
      <Footer
        theme={theme}
        brandName={siteCopy.brandName}
        brandPartnerSubtitle={siteCopy.brandPartnerSubtitle}
        companyName={siteCopy.companyName}
        ceoName={siteCopy.ceoName}
        bizNumber={siteCopy.bizNumber}
        mailOrderNumber={siteCopy.mailOrderNumber}
        address={siteCopy.address}
        contactPhone={siteCopy.contactPhone}
        contactEmail={siteCopy.contactEmail}
        kakaoChannelId={siteCopy.kakaoChannelId}
        onOpenAdmin={handleRequestAdminOpen}
        onOpenKakao={() => setIsKakaoOpen(true)}
      />

      {/* Floating Action Quick Bar (Bottom Right) */}
      <aside aria-label="빠른 도구 및 상담 액션" className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="맨 위로 이동"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-white/20 text-neutral-300 hover:text-white shadow-lg transition-transform hover:scale-105"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}

        {/* Quick Admin Toggle Button (with lock state indicator) */}
        <button
          onClick={handleRequestAdminOpen}
          title="관리자 CMS 대시보드"
          aria-label="관리자 CMS 패널 열기"
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-white/20 text-xs font-semibold text-neutral-200 shadow-xl backdrop-blur-md transition-all hover:scale-105"
        >
          {isAdminAuthenticated ? (
            <Settings className="h-3.5 w-3.5 text-orange-400" />
          ) : (
            <Lock className="h-3.5 w-3.5 text-amber-400" />
          )}
          <span className="hidden sm:inline">
            {isAdminAuthenticated ? 'CMS 관리' : '관리자 로그인'}
          </span>
        </button>

        {/* Kakao Floating Chat Button */}
        <button
          onClick={() => setIsKakaoOpen(true)}
          aria-label="카카오톡 1:1 상담 열기"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#FEE500] hover:bg-[#edd400] text-[#191919] font-extrabold text-xs sm:text-sm shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="h-5 w-5 fill-current" />
          <span>카톡 1:1 상담</span>
        </button>
      </aside>

      {/* Video Lightbox Modal */}
      <VideoModal
        video={activeModalVideo}
        theme={theme}
        onClose={() => setActiveModalVideo(null)}
        onSelectConcept={handleSelectConcept}
      />

      {/* Invitation Lightbox Modal (동영상 + 사진 갤러리 + 상세 설명) */}
      <InvitationModal
        invitation={activeModalInvitation}
        theme={theme}
        onClose={() => setActiveModalInvitation(null)}
        onApply={handleSelectConcept}
      />

      {/* Admin Security PIN Authentication Modal */}
      <AdminPinModal
        isOpen={isPinModalOpen}
        adminPin={adminPin}
        theme={theme}
        onSuccess={handleAdminPinSuccess}
        onClose={() => setIsPinModalOpen(false)}
      />

      {/* Inline Admin CMS Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        setMenuItems={setMenuItems}
        heroContent={heroContent}
        setHeroContent={setHeroContent}
        videos={videos}
        setVideos={setVideos}
        invitations={invitations}
        setInvitations={setInvitations}
        invitationConfig={invitationConfig}
        setInvitationConfig={setInvitationConfig}
        benefits={benefits}
        setBenefits={setBenefits}
        processSteps={processSteps}
        setProcessSteps={setProcessSteps}
        reviews={reviews}
        setReviews={setReviews}
        leads={leads}
        setLeads={setLeads}
        theme={theme}
        setTheme={setTheme}
        seo={seo}
        setSeo={setSeo}
        siteCopy={siteCopy}
        setSiteCopy={setSiteCopy}
        adminPin={adminPin}
        setAdminPin={setAdminPin}
        onResetDefaults={handleResetDefaults}
        onLogout={handleAdminLogout}
      />

      {/* Kakao Talk Info Modal */}
      <KakaoConsultModal
        isOpen={isKakaoOpen}
        theme={theme}
        onClose={() => setIsKakaoOpen(false)}
      />
    </div>
  );
}
