import React, { useState } from 'react';
import {
  MenuItem,
  VideoItem,
  InvitationItem,
  InvitationSectionConfig,
  BenefitItem,
  ProcessStep,
  ReviewItem,
  BookingLead,
  ThemeConfig,
  SeoConfig,
  HeroContent,
  SiteCopyConfig,
} from '../../types';
import { extractYouTubeId, getYouTubeThumbnail } from '../../utils/youtube';
import {
  X,
  Settings,
  Layers,
  Film,
  FileText,
  Palette,
  Search,
  Users,
  RotateCcw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  Download,
  Sparkles,
  Mail,
  Lock,
  KeyRound,
  ShieldCheck,
  Smartphone,
  Image as ImageIcon,
  LogOut,
  Info,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  // State props
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  heroContent: HeroContent;
  setHeroContent: React.Dispatch<React.SetStateAction<HeroContent>>;
  videos: VideoItem[];
  setVideos: React.Dispatch<React.SetStateAction<VideoItem[]>>;
  invitations: InvitationItem[];
  setInvitations: React.Dispatch<React.SetStateAction<InvitationItem[]>>;
  invitationConfig: InvitationSectionConfig;
  setInvitationConfig: React.Dispatch<React.SetStateAction<InvitationSectionConfig>>;
  benefits: BenefitItem[];
  setBenefits: React.Dispatch<React.SetStateAction<BenefitItem[]>>;
  processSteps: ProcessStep[];
  setProcessSteps: React.Dispatch<React.SetStateAction<ProcessStep[]>>;
  reviews: ReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
  leads: BookingLead[];
  setLeads: React.Dispatch<React.SetStateAction<BookingLead[]>>;
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
  seo: SeoConfig;
  setSeo: React.Dispatch<React.SetStateAction<SeoConfig>>;
  siteCopy: SiteCopyConfig;
  setSiteCopy: React.Dispatch<React.SetStateAction<SiteCopyConfig>>;
  adminPin: string;
  setAdminPin: React.Dispatch<React.SetStateAction<string>>;
  onResetDefaults: () => void;
  onLogout: () => void;
}

type TabType =
  | 'videos'
  | 'invitations'
  | 'siteCopy'
  | 'menu'
  | 'benefits'
  | 'theme'
  | 'seo'
  | 'leads'
  | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  menuItems,
  setMenuItems,
  heroContent,
  setHeroContent,
  videos,
  setVideos,
  invitations,
  setInvitations,
  invitationConfig,
  setInvitationConfig,
  benefits,
  setBenefits,
  processSteps,
  setProcessSteps,
  reviews,
  setReviews,
  leads,
  setLeads,
  theme,
  setTheme,
  seo,
  setSeo,
  siteCopy,
  setSiteCopy,
  adminPin,
  setAdminPin,
  onResetDefaults,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('invitations');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // New Menu Item state
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newMenuHref, setNewMenuHref] = useState('');

  // Video Form state
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoForm, setVideoForm] = useState<{
    title: string;
    category: 'emotional' | 'witty' | 'musical' | 'shorts';
    categoryLabel: string;
    description: string;
    youtubeUrl: string;
    runningTime: string;
    tagsInput: string;
    featured: boolean;
  }>({
    title: '',
    category: 'emotional',
    categoryLabel: '감동형',
    description: '',
    youtubeUrl: '',
    runningTime: '04:00',
    tagsInput: '감동, 시네마틱, 돌잔치',
    featured: false,
  });

  // Invitation Form state (NEW: 동영상 링크, 밑에 사진들, 설명 더 넣기)
  const [editingInviId, setEditingInviId] = useState<string | null>(null);
  const [inviForm, setInviForm] = useState<{
    title: string;
    themeTag: string;
    subtitle: string;
    description: string;
    youtubeUrl: string;
    previewImage: string;
    galleryPhotosInput: string;
    featuresInput: string;
    isPopular: boolean;
  }>({
    title: '',
    themeTag: '영상 탑재형',
    subtitle: '',
    description: '',
    youtubeUrl: '',
    previewImage: '/src/assets/images/invitation_mobile_mockup_1793859837856.jpg',
    galleryPhotosInput:
      '/src/assets/images/invitation_mobile_mockup_1793859837856.jpg\n/src/assets/images/invitation_cards_flatlay_1793859838727.jpg\n/src/assets/images/hero_cinematic_baby_1793831675838.jpg',
    featuresInput:
      '상단 세로형 하이라이트 영상 재생, 고화질 아기 성장 갤러리, 카카오톡 링크 공유 맞춤 썸네일, 시엠프레 탕정점 지도 연동, 하객 축하 방명록',
    isPopular: false,
  });

  // PIN Change Form State
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const triggerToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  if (!isOpen) return null;

  // 1. Menu Management Handlers
  const handleMoveMenu = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= menuItems.length) return;

    const newItems = [...menuItems];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updated = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setMenuItems(updated);
    triggerToast('메뉴 순서가 변경되었습니다.');
  };

  const handleToggleMenuVisibility = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isVisible: !item.isVisible } : item))
    );
    triggerToast('메뉴 표시 상태가 업데이트되었습니다.');
  };

  const handleUpdateMenuLabel = (id: string, newLabel: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, label: newLabel } : item))
    );
  };

  const handleAddMenuItem = () => {
    if (!newMenuLabel.trim()) return;
    const newItem: MenuItem = {
      id: `custom-menu-${Date.now()}`,
      label: newMenuLabel.trim(),
      href: newMenuHref.trim() || `#custom-${Date.now()}`,
      isVisible: true,
      order: menuItems.length + 1,
    };
    setMenuItems([...menuItems, newItem]);
    setNewMenuLabel('');
    setNewMenuHref('');
    triggerToast('새 메뉴가 추가되었습니다.');
  };

  const handleDeleteMenuItem = (id: string) => {
    if (menuItems.length <= 1) {
      alert('최소 1개 이상의 메뉴가 유지되어야 합니다.');
      return;
    }
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    triggerToast('메뉴가 삭제되었습니다.');
  };

  // 2. Video CRUD Handlers
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedId = extractYouTubeId(videoForm.youtubeUrl);
    if (!parsedId) {
      alert('유효한 유튜브 영상 링크 또는 Video ID를 입력해 주세요.');
      return;
    }

    const tags = videoForm.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const categoryLabels: Record<string, string> = {
      emotional: '감동형',
      witty: '위트/유쾌형',
      musical: '뮤지컬형',
      shorts: '세로형 숏폼',
    };

    if (editingVideoId) {
      setVideos((prev) =>
        prev.map((v) =>
          v.id === editingVideoId
            ? {
                ...v,
                title: videoForm.title,
                category: videoForm.category,
                categoryLabel: categoryLabels[videoForm.category],
                description: videoForm.description,
                youtubeId: parsedId,
                runningTime: videoForm.runningTime,
                tags,
                featured: videoForm.featured,
              }
            : v
        )
      );
      triggerToast('성장동영상이 성공적으로 수정되었습니다.');
      setEditingVideoId(null);
    } else {
      const newVideo: VideoItem = {
        id: `video-${Date.now()}`,
        title: videoForm.title,
        category: videoForm.category,
        categoryLabel: categoryLabels[videoForm.category],
        description: videoForm.description,
        youtubeId: parsedId,
        runningTime: videoForm.runningTime,
        tags,
        featured: videoForm.featured,
        viewCount: '1회',
        rating: 5.0,
      };
      setVideos([newVideo, ...videos]);
      triggerToast('새 샘플 영상이 등록되었습니다.');
    }

    setVideoForm({
      title: '',
      category: 'emotional',
      categoryLabel: '감동형',
      description: '',
      youtubeUrl: '',
      runningTime: '04:00',
      tagsInput: '감동, 시네마틱, 돌잔치',
      featured: false,
    });
  };

  const handleEditVideo = (video: VideoItem) => {
    setEditingVideoId(video.id);
    setVideoForm({
      title: video.title,
      category: video.category,
      categoryLabel: video.categoryLabel,
      description: video.description,
      youtubeUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
      runningTime: video.runningTime,
      tagsInput: video.tags.join(', '),
      featured: video.featured,
    });
    document.getElementById('video-editor-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('이 샘플 영상을 목록에서 삭제하시겠습니까?')) {
      setVideos((prev) => prev.filter((v) => v.id !== id));
      triggerToast('영상이 삭제되었습니다.');
    }
  };

  // 3. Invitation CRUD Handlers (NEW: 동영상 링크, 밑에 사진들 및 상세 설명)
  const handleSaveInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviForm.title.trim()) {
      alert('초대장 제목을 입력해 주세요.');
      return;
    }

    // Parse gallery photos from newline or comma
    const photos = inviForm.galleryPhotosInput
      .split(/[\n,]+/)
      .map((p) => p.trim())
      .filter(Boolean);

    // Parse features from comma or newline
    const features = inviForm.featuresInput
      .split(/[\n,]+/)
      .map((f) => f.trim())
      .filter(Boolean);

    const parsedVideoId = inviForm.youtubeUrl.trim()
      ? extractYouTubeId(inviForm.youtubeUrl)
      : '';

    const preview =
      inviForm.previewImage.trim() ||
      (parsedVideoId ? getYouTubeThumbnail(parsedVideoId, 'hq') : '') ||
      photos[0] ||
      '/src/assets/images/invitation_mobile_mockup_1793859837856.jpg';

    if (editingInviId) {
      setInvitations((prev) =>
        prev.map((item) =>
          item.id === editingInviId
            ? {
                ...item,
                title: inviForm.title,
                themeTag: inviForm.themeTag,
                subtitle: inviForm.subtitle,
                description: inviForm.description,
                youtubeUrlOrId: parsedVideoId || undefined,
                previewImage: preview,
                galleryPhotos: photos,
                features: features.length > 0 ? features : ['카카오톡 공유 최적화', '참석 여부 집계'],
                isPopular: inviForm.isPopular,
              }
            : item
        )
      );
      triggerToast('초대장 샘플이 성공적으로 수정되었습니다.');
      setEditingInviId(null);
    } else {
      const newInvi: InvitationItem = {
        id: `invi-${Date.now()}`,
        title: inviForm.title,
        themeTag: inviForm.themeTag,
        subtitle: inviForm.subtitle || '소중한 첫돌 기념 모바일 초대장',
        description: inviForm.description,
        youtubeUrlOrId: parsedVideoId || undefined,
        previewImage: preview,
        galleryPhotos: photos,
        features: features.length > 0 ? features : ['카카오톡 공유 최적화', '참석 여부 집계'],
        isPopular: inviForm.isPopular,
      };
      setInvitations([newInvi, ...invitations]);
      triggerToast('새로운 모바일 초대장 샘플이 등록되었습니다.');
    }

    // Reset Form
    setInviForm({
      title: '',
      themeTag: '영상 탑재형',
      subtitle: '',
      description: '',
      youtubeUrl: '',
      previewImage: '/src/assets/images/invitation_mobile_mockup_1793859837856.jpg',
      galleryPhotosInput: '',
      featuresInput: '',
      isPopular: false,
    });
  };

  const handleEditInvitation = (item: InvitationItem) => {
    setEditingInviId(item.id);
    setInviForm({
      title: item.title,
      themeTag: item.themeTag,
      subtitle: item.subtitle,
      description: item.description,
      youtubeUrl: item.youtubeUrlOrId || '',
      previewImage: item.previewImage,
      galleryPhotosInput: (item.galleryPhotos || []).join('\n'),
      featuresInput: (item.features || []).join(', '),
      isPopular: Boolean(item.isPopular),
    });
    document.getElementById('invitation-editor-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteInvitation = (id: string) => {
    if (confirm('이 모바일 초대장 샘플을 삭제하시겠습니까?')) {
      setInvitations((prev) => prev.filter((i) => i.id !== id));
      triggerToast('초대장 샘플이 삭제되었습니다.');
    }
  };

  // 4. PIN Change Handler
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim() || newPin.length < 4) {
      alert('비밀번호는 최소 4자리 이상이어야 합니다.');
      return;
    }
    if (newPin !== confirmPin) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    setAdminPin(newPin.trim());
    setNewPin('');
    setConfirmPin('');
    triggerToast('관리자 비밀번호가 성공적으로 변경되었습니다!');
  };

  // Leads export
  const handleExportLeadsCsv = () => {
    if (leads.length === 0) {
      alert('내보낼 상담 데이터가 없습니다.');
      return;
    }
    const headers = ['접수일시', '상태', '아기이름', '성별', '행사일시', '홀이름', '보호자', '연락처', '희망컨셉', '요청사항'];
    const rows = leads.map((l) => [
      l.createdAt,
      l.status,
      l.babyName,
      l.babyGender,
      l.eventDate,
      l.hallName,
      l.parentName,
      l.parentPhone,
      `"${l.preferredConcept.replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `데이메이드_상담신청목록_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative flex flex-col w-full max-w-5xl h-[94vh] rounded-2xl border border-white/20 bg-[#121212] shadow-2xl overflow-hidden text-neutral-100">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg shadow-sm"
              style={{ backgroundColor: theme.accentColor }}
            >
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  데이메이드 통합 관리자 (CMS)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  비밀번호 보안 인증됨
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                초대장 샘플(동영상+사진), 성장동영상, 사이트 모든 텍스트, 메뉴, 테마를 실시간 관리합니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {saveSuccessMsg && (
              <span className="hidden sm:flex items-center gap-1 text-xs text-green-400 font-medium animate-in fade-in">
                <Check className="h-3.5 w-3.5" /> {saveSuccessMsg}
              </span>
            )}
            <button
              onClick={onLogout}
              title="관리자 로그아웃 (비밀번호 잠금)"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">잠금/로그아웃</span>
            </button>
            <button
              onClick={onResetDefaults}
              title="초기 기본 데이터로 복원"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>초기화</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              aria-label="관리자 닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-white/10 bg-[#0e0e0e] px-4 py-2 gap-1.5 shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('invitations')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'invitations'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5 text-orange-400" />
            <span>모바일 초대장 관리 ({invitations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'videos'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Film className="h-3.5 w-3.5 text-orange-400" />
            <span>성장동영상 관리 ({videos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('siteCopy')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'siteCopy'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-orange-400" />
            <span>전체 텍스트 & 문구 수정</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'menu'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-orange-400" />
            <span>메뉴 순서 & 관리</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'benefits'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            <span>제휴 혜택 관리 ({benefits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'theme'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-orange-400" />
            <span>테마 & 컬러 스타일러</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'seo'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="h-3.5 w-3.5 text-orange-400" />
            <span>SEO & 소셜 프리뷰</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'leads'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="h-3.5 w-3.5 text-orange-400" />
            <span>상담 신청 목록 ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'security'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Lock className="h-3.5 w-3.5 text-orange-400" />
            <span>보안 & 비밀번호 관리</span>
          </button>
        </div>

        {/* Tab Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: INVITATION SAMPLES CRUD (User's special request!) */}
          {activeTab === 'invitations' && (
            <div className="space-y-6">
              {/* Section Header Text Quick Edit */}
              <div className="rounded-xl border border-white/10 bg-neutral-900/40 p-4 space-y-3">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                  초대장 섹션 상단 타이틀 & 안내 문구
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">상단 뱃지 문구</label>
                    <input
                      type="text"
                      value={invitationConfig.badge}
                      onChange={(e) =>
                        setInvitationConfig({ ...invitationConfig, badge: e.target.value })
                      }
                      className="w-full rounded bg-black border border-white/15 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">섹션 메인 타이틀</label>
                    <input
                      type="text"
                      value={invitationConfig.title}
                      onChange={(e) =>
                        setInvitationConfig({ ...invitationConfig, title: e.target.value })
                      }
                      className="w-full rounded bg-black border border-white/15 px-3 py-1.5 text-xs font-bold text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">섹션 설명 문구</label>
                  <input
                    type="text"
                    value={invitationConfig.description}
                    onChange={(e) =>
                      setInvitationConfig({ ...invitationConfig, description: e.target.value })
                    }
                    className="w-full rounded bg-black border border-white/15 px-3 py-1.5 text-xs text-neutral-300"
                  />
                </div>
              </div>

              {/* Add / Edit Invitation Form */}
              <div
                id="invitation-editor-form"
                className="rounded-xl border border-white/15 bg-neutral-900/80 p-5 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-orange-400" />
                    <span>
                      {editingInviId
                        ? '모바일 초대장 정보 수정'
                        : '새 모바일 초대장 샘플 등록 (동영상 링크 + 밑에 사진들)'}
                    </span>
                  </h3>
                  {editingInviId && (
                    <button
                      onClick={() => {
                        setEditingInviId(null);
                        setInviForm({
                          title: '',
                          themeTag: '영상 탑재형',
                          subtitle: '',
                          description: '',
                          youtubeUrl: '',
                          previewImage: '/src/assets/images/invitation_mobile_mockup_1793859837856.jpg',
                          galleryPhotosInput: '',
                          featuresInput: '',
                          isPopular: false,
                        });
                      }}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      수정 취소
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveInvitation} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Title */}
                    <div className="md:col-span-8">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        초대장 명칭 *
                      </label>
                      <input
                        type="text"
                        required
                        value={inviForm.title}
                        onChange={(e) => setInviForm({ ...inviForm, title: e.target.value })}
                        placeholder="예: 시네마 릴스 모션 초대장 (Cinema Motion)"
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    {/* Theme Tag */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        테마 카테고리
                      </label>
                      <select
                        value={inviForm.themeTag}
                        onChange={(e) => setInviForm({ ...inviForm, themeTag: e.target.value })}
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="영상 탑재형">영상 탑재형</option>
                        <option value="모던 감성">모던 감성</option>
                        <option value="전통 한복">전통 한복</option>
                        <option value="플라워 가든">플라워 가든</option>
                        <option value="미니멀 화이트">미니멀 화이트</option>
                      </select>
                    </div>
                  </div>

                  {/* Video URL (동영상 링크) */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center justify-between">
                      <span>초대장 동영상 링크 (선택 사항: 유튜브 일반 영상 또는 숏폼 링크)</span>
                      <span className="text-[11px] text-orange-400 font-normal">
                        동영상이 없으면 사진 갤러리 모드로 표시됩니다.
                      </span>
                    </label>
                    <input
                      type="text"
                      value={inviForm.youtubeUrl}
                      onChange={(e) => setInviForm({ ...inviForm, youtubeUrl: e.target.value })}
                      placeholder="예: https://www.youtube.com/watch?v=2Vv-BfVoq4g 또는 유튜브 Video ID"
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Subtitle */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        한 줄 요약 (서브타이틀)
                      </label>
                      <input
                        type="text"
                        value={inviForm.subtitle}
                        onChange={(e) => setInviForm({ ...inviForm, subtitle: e.target.value })}
                        placeholder="예: 초대장 첫 화면에서 세로형 하이라이트 영상이 자동 재생되는 에디션"
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    {/* Preview Image URL */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        대표 커버 이미지 URL / 경로
                      </label>
                      <input
                        type="text"
                        value={inviForm.previewImage}
                        onChange={(e) => setInviForm({ ...inviForm, previewImage: e.target.value })}
                        placeholder="/src/assets/images/invitation_mobile_mockup_1793859837856.jpg"
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Gallery Photos (밑에 들어가는 사진들) */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="h-3.5 w-3.5 text-orange-400" />
                        <span>초대장 하단 수록 사진들 (줄바꿈 또는 쉼표로 여러 장 입력) *</span>
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        사진 URL을 한 줄에 하나씩 적어주시면 하단 갤러리에 추가됩니다
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      value={inviForm.galleryPhotosInput}
                      onChange={(e) =>
                        setInviForm({ ...inviForm, galleryPhotosInput: e.target.value })
                      }
                      placeholder="/src/assets/images/invitation_mobile_mockup_1793859837856.jpg&#10;/src/assets/images/invitation_cards_flatlay_1793859838727.jpg&#10;/src/assets/images/hero_cinematic_baby_1793831675838.jpg"
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      상세 설명 & 연출 특징 (입력 시 더 넣고 싶은 설명 문구)
                    </label>
                    <textarea
                      rows={3}
                      value={inviForm.description}
                      onChange={(e) => setInviForm({ ...inviForm, description: e.target.value })}
                      placeholder="초대장을 열었을 때의 첫인상, 음향 효과, 시엠프레 탕정점 연회장 안내 기능 등을 자세히 적어주세요."
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  {/* Features list */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      포함된 모바일 기능 (쉼표로 구분)
                    </label>
                    <input
                      type="text"
                      value={inviForm.featuresInput}
                      onChange={(e) => setInviForm({ ...inviForm, featuresInput: e.target.value })}
                      placeholder="상단 세로형 영상 재생, 고화질 사진 갤러리, 카카오톡 썸네일, 참석여부 RSVP 집계"
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Actions & Popular checkbox */}
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={inviForm.isPopular}
                        onChange={(e) => setInviForm({ ...inviForm, isPopular: e.target.checked })}
                        className="h-4 w-4 rounded bg-neutral-900 border-white/20 text-orange-500"
                      />
                      <span>인기 BEST 뱃지 부착</span>
                    </label>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg text-xs font-bold text-white shadow-md transition-all active:scale-95"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {editingInviId ? '초대장 수정 저장' : '새 모바일 초대장 등록'}
                    </button>
                  </div>
                </form>
              </div>

              {/* List of current invitations */}
              <div>
                <h4 className="text-xs font-bold text-neutral-300 mb-2">
                  등록된 모바일 초대장 목록 ({invitations.length}개)
                </h4>
                <div className="space-y-2">
                  {invitations.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-neutral-900 border border-white/10 gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={inv.previewImage}
                          alt=""
                          className="h-14 w-20 object-cover rounded-md border border-white/10 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-orange-300">
                              {inv.themeTag}
                            </span>
                            <h5 className="text-sm font-semibold text-white">{inv.title}</h5>
                            {inv.youtubeUrlOrId && (
                              <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.2 rounded font-mono">
                                동영상
                              </span>
                            )}
                            {inv.isPopular && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                                BEST
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                            {inv.subtitle} · 사진 {inv.galleryPhotos?.length || 0}장
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleEditInvitation(inv)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-200 border border-white/10"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteInvitation(inv.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                          title="삭제"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: YOUTUBE VIDEOS CRUD */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div
                id="video-editor-form"
                className="rounded-xl border border-white/15 bg-neutral-900/80 p-5 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Film className="h-4 w-4 text-orange-400" />
                    <span>{editingVideoId ? '샘플 영상 정보 수정' : '새 유튜브 샘플 영상 등록'}</span>
                  </h3>
                  {editingVideoId && (
                    <button
                      onClick={() => {
                        setEditingVideoId(null);
                        setVideoForm({
                          title: '',
                          category: 'emotional',
                          categoryLabel: '감동형',
                          description: '',
                          youtubeUrl: '',
                          runningTime: '04:00',
                          tagsInput: '감동, 시네마틱',
                          featured: false,
                        });
                      }}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      수정 취소
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveVideo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        유튜브 링크 또는 Video ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={videoForm.youtubeUrl}
                        onChange={(e) =>
                          setVideoForm({ ...videoForm, youtubeUrl: e.target.value })
                        }
                        placeholder="예: https://www.youtube.com/watch?v=ScMzIvxBSi4 또는 ScMzIvxBSi4"
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        영상 카테고리
                      </label>
                      <select
                        value={videoForm.category}
                        onChange={(e) =>
                          setVideoForm({ ...videoForm, category: e.target.value as any })
                        }
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="emotional">감동형</option>
                        <option value="witty">위트/유쾌형</option>
                        <option value="musical">뮤지컬형</option>
                        <option value="shorts">세로형 숏폼</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        영상 제목 *
                      </label>
                      <input
                        type="text"
                        required
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                        placeholder="예: 우리 집 보물 1호의 첫 생일 영화"
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        러닝타임
                      </label>
                      <input
                        type="text"
                        value={videoForm.runningTime}
                        onChange={(e) =>
                          setVideoForm({ ...videoForm, runningTime: e.target.value })
                        }
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs sm:text-sm text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      상세 설명
                    </label>
                    <textarea
                      rows={2}
                      value={videoForm.description}
                      onChange={(e) =>
                        setVideoForm({ ...videoForm, description: e.target.value })
                      }
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs text-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-8">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        태그 (쉼표로 구분)
                      </label>
                      <input
                        type="text"
                        value={videoForm.tagsInput}
                        onChange={(e) =>
                          setVideoForm({ ...videoForm, tagsInput: e.target.value })
                        }
                        className="w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="md:col-span-4 flex items-center justify-between pt-4">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={videoForm.featured}
                          onChange={(e) =>
                            setVideoForm({ ...videoForm, featured: e.target.checked })
                          }
                          className="h-4 w-4 rounded bg-neutral-900 border-white/20 text-orange-500"
                        />
                        <span>대표 BEST</span>
                      </label>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-lg text-xs font-bold text-white shadow-md active:scale-95"
                        style={{ backgroundColor: theme.accentColor }}
                      >
                        {editingVideoId ? '수정 완료' : '영상 등록'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Video List */}
              <div className="space-y-2">
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-neutral-900 border border-white/10 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={vid.bgThumbnail || getYouTubeThumbnail(vid.youtubeId, 'hq')}
                        alt=""
                        className="h-12 w-20 object-cover rounded-md border border-white/10 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-orange-300">
                            {vid.categoryLabel}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{vid.title}</h4>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">
                          ID: {vid.youtubeId} · {vid.runningTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleEditVideo(vid)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-200 border border-white/10"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(vid.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMPLETE SITE TEXT CMS (User requested: "각 메뉴들의 텍스트들도 수정 할수 있으면 좋겠는데") */}
          {activeTab === 'siteCopy' && (
            <div className="space-y-6">
              {/* 1. Header & Hero Texts */}
              <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                  <FileText className="h-4 w-4 text-orange-400" />
                  <span>1. 헤더 로고 & 히어로 메인 문구</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      GNB 브랜드 로고명
                    </label>
                    <input
                      type="text"
                      value={siteCopy.brandName}
                      onChange={(e) => setSiteCopy({ ...siteCopy, brandName: e.target.value })}
                      className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      GNB 제휴사 서브타이틀
                    </label>
                    <input
                      type="text"
                      value={siteCopy.brandPartnerSubtitle}
                      onChange={(e) =>
                        setSiteCopy({ ...siteCopy, brandPartnerSubtitle: e.target.value })
                      }
                      className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    히어로 최상단 뱃지
                  </label>
                  <input
                    type="text"
                    value={heroContent.badge}
                    onChange={(e) => setHeroContent({ ...heroContent, badge: e.target.value })}
                    className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      메인 헤드라인 1
                    </label>
                    <input
                      type="text"
                      value={heroContent.titlePart1}
                      onChange={(e) =>
                        setHeroContent({ ...heroContent, titlePart1: e.target.value })
                      }
                      className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      포인트 강조 단어
                    </label>
                    <input
                      type="text"
                      value={heroContent.titleHighlight}
                      onChange={(e) =>
                        setHeroContent({ ...heroContent, titleHighlight: e.target.value })
                      }
                      className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-orange-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      메인 헤드라인 2
                    </label>
                    <input
                      type="text"
                      value={heroContent.titlePart2}
                      onChange={(e) =>
                        setHeroContent({ ...heroContent, titlePart2: e.target.value })
                      }
                      className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    히어로 서브 설명 문구
                  </label>
                  <textarea
                    rows={2}
                    value={heroContent.subtitle}
                    onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                    className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    시엠프레 제휴 특별 배너 문구
                  </label>
                  <input
                    type="text"
                    value={heroContent.partnershipBanner}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, partnershipBanner: e.target.value })
                    }
                    className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* 2. Process Guide Steps Editing */}
              <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                  <FileText className="h-4 w-4 text-orange-400" />
                  <span>2. 제작 프로세스 4단계 텍스트 수정</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {processSteps.map((step, sIdx) => (
                    <div
                      key={step.step}
                      className="p-3.5 rounded-lg bg-black border border-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-orange-400">{step.step}</span>
                        <input
                          type="text"
                          value={step.duration}
                          onChange={(e) => {
                            const updated = [...processSteps];
                            updated[sIdx].duration = e.target.value;
                            setProcessSteps(updated);
                          }}
                          placeholder="일정 (예: D-30)"
                          className="w-24 text-right rounded bg-neutral-900 border border-white/10 px-2 py-0.5 text-[11px] text-neutral-300 font-mono"
                        />
                      </div>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...processSteps];
                          updated[sIdx].title = e.target.value;
                          setProcessSteps(updated);
                        }}
                        className="w-full rounded bg-neutral-900 border border-white/10 px-2.5 py-1 text-xs font-bold text-white"
                      />
                      <input
                        type="text"
                        value={step.subtitle}
                        onChange={(e) => {
                          const updated = [...processSteps];
                          updated[sIdx].subtitle = e.target.value;
                          setProcessSteps(updated);
                        }}
                        className="w-full rounded bg-neutral-900 border border-white/10 px-2.5 py-1 text-xs text-orange-300"
                      />
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => {
                          const updated = [...processSteps];
                          updated[sIdx].description = e.target.value;
                          setProcessSteps(updated);
                        }}
                        className="w-full rounded bg-neutral-900 border border-white/10 px-2.5 py-1 text-xs text-neutral-300 resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Footer Business Info */}
              <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                  <FileText className="h-4 w-4 text-orange-400" />
                  <span>3. 하단 푸터 사업자 정보 & 고객센터</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">상호명</label>
                    <input
                      type="text"
                      value={siteCopy.companyName}
                      onChange={(e) => setSiteCopy({ ...siteCopy, companyName: e.target.value })}
                      className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">대표자명</label>
                    <input
                      type="text"
                      value={siteCopy.ceoName}
                      onChange={(e) => setSiteCopy({ ...siteCopy, ceoName: e.target.value })}
                      className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">사업자등록번호</label>
                    <input
                      type="text"
                      value={siteCopy.bizNumber}
                      onChange={(e) => setSiteCopy({ ...siteCopy, bizNumber: e.target.value })}
                      className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">고객센터 전화번호</label>
                    <input
                      type="text"
                      value={siteCopy.contactPhone}
                      onChange={(e) => setSiteCopy({ ...siteCopy, contactPhone: e.target.value })}
                      className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">이메일</label>
                    <input
                      type="text"
                      value={siteCopy.contactEmail}
                      onChange={(e) => setSiteCopy({ ...siteCopy, contactEmail: e.target.value })}
                      className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">카카오 채널 ID</label>
                    <input
                      type="text"
                      value={siteCopy.kakaoChannelId}
                      onChange={(e) =>
                        setSiteCopy({ ...siteCopy, kakaoChannelId: e.target.value })
                      }
                      className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">사업장 주소</label>
                  <input
                    type="text"
                    value={siteCopy.address}
                    onChange={(e) => setSiteCopy({ ...siteCopy, address: e.target.value })}
                    className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MENU */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4">
                <h3 className="text-sm font-bold text-white mb-1">상단 메뉴 순서 및 이름 관리</h3>
                <p className="text-xs text-neutral-400 mb-4">
                  메뉴 이름을 더블클릭/수정하거나 위/아래 버튼으로 순서를 변경할 수 있습니다.
                </p>

                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-black border border-white/10 gap-3"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs font-mono text-neutral-500 w-5">
                          #{item.order}
                        </span>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleUpdateMenuLabel(item.id, e.target.value)}
                          className="rounded bg-neutral-900 border border-white/15 px-2.5 py-1 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-orange-500 max-w-[160px]"
                        />
                        <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
                          링크: {item.href}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleMenuVisibility(item.id)}
                          className={`px-2.5 py-1 rounded text-xs font-medium border ${
                            item.isVisible
                              ? 'bg-green-500/10 text-green-400 border-green-500/20'
                              : 'bg-neutral-800 text-neutral-500 border-white/5'
                          }`}
                        >
                          {item.isVisible ? '표시' : '숨김'}
                        </button>
                        <button
                          disabled={index === 0}
                          onClick={() => handleMoveMenu(index, 'up')}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          disabled={index === menuItems.length - 1}
                          onClick={() => handleMoveMenu(index, 'down')}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMenuItem(item.id)}
                          className="p-1 rounded text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  <input
                    type="text"
                    value={newMenuLabel}
                    onChange={(e) => setNewMenuLabel(e.target.value)}
                    placeholder="새 메뉴 이름"
                    className="rounded-lg bg-neutral-900 border border-white/15 px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={newMenuHref}
                    onChange={(e) => setNewMenuHref(e.target.value)}
                    placeholder="링크 앵커 (예: #invitations)"
                    className="rounded-lg bg-neutral-900 border border-white/15 px-3 py-1.5 text-xs text-white"
                  />
                  <button
                    onClick={handleAddMenuItem}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold text-white active:scale-95"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>메뉴 추가</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BENEFITS */}
          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">시엠프레 탕정점 제휴 혜택 문구 수정</h3>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((b, idx) => (
                  <div
                    key={b.id}
                    className="rounded-xl border border-white/10 bg-neutral-900 p-4 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-8">
                        <label className="block text-[11px] text-neutral-400 mb-1">
                          혜택 명칭
                        </label>
                        <input
                          type="text"
                          value={b.title}
                          onChange={(e) => {
                            const updated = [...benefits];
                            updated[idx].title = e.target.value;
                            setBenefits(updated);
                          }}
                          className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs font-bold text-white"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-[11px] text-neutral-400 mb-1">
                          할인 배지
                        </label>
                        <input
                          type="text"
                          value={b.badge}
                          onChange={(e) => {
                            const updated = [...benefits];
                            updated[idx].badge = e.target.value;
                            setBenefits(updated);
                          }}
                          className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-orange-400 font-semibold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        혜택 요약
                      </label>
                      <input
                        type="text"
                        value={b.summary}
                        onChange={(e) => {
                          const updated = [...benefits];
                          updated[idx].summary = e.target.value;
                          setBenefits(updated);
                        }}
                        className="w-full rounded bg-black border border-white/15 px-2.5 py-1.5 text-xs text-neutral-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: THEME */}
          {activeTab === 'theme' && (
            <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 space-y-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Palette className="h-4 w-4 text-orange-400" />
                <span>테마 & 브랜드 포인트 컬러 설정</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  포인트 컬러 (현재: {theme.accentColor})
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { name: '데이메이드 오렌지', color: '#FF6B00' },
                    { name: '골든 앰버', color: '#F59E0B' },
                    { name: '로얄 코랄', color: '#FF5252' },
                    { name: '시네마 골드', color: '#EAB308' },
                  ].map((item) => (
                    <button
                      key={item.color}
                      type="button"
                      onClick={() => setTheme({ ...theme, accentColor: item.color })}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        theme.accentColor === item.color
                          ? 'border-white text-white'
                          : 'border-white/10 text-neutral-400'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </button>
                  ))}
                  <input
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                    className="h-8 w-8 cursor-pointer rounded border border-white/20 bg-transparent p-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  배경 톤
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Pure Black', bg: '#0a0a0a', desc: '영화관 시네마틱' },
                    { name: 'Obsidian', bg: '#121212', desc: '소프트 차콜' },
                    { name: 'Midnight', bg: '#0b1120', desc: '딥 미드나이트' },
                  ].map((tone) => (
                    <button
                      key={tone.bg}
                      type="button"
                      onClick={() => setTheme({ ...theme, bgColor: tone.bg })}
                      className={`p-3 rounded-xl border text-left ${
                        theme.bgColor === tone.bg ? 'border-orange-500 bg-white/5' : 'border-white/10'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{tone.name}</span>
                      <span className="text-[11px] text-neutral-400 mt-0.5 block">{tone.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SEO */}
          {activeTab === 'seo' && (
            <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="h-4 w-4 text-orange-400" />
                <span>검색 엔진 & 카카오톡 공유 메타태그</span>
              </h3>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  페이지 타이틀
                </label>
                <input
                  type="text"
                  value={seo.pageTitle}
                  onChange={(e) => setSeo({ ...seo, pageTitle: e.target.value })}
                  className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  메타 설명
                </label>
                <textarea
                  rows={2}
                  value={seo.metaDescription}
                  onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                  className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  카카오톡 공유 카드용 타이틀
                </label>
                <input
                  type="text"
                  value={seo.kakaoTitle}
                  onChange={(e) => setSeo({ ...seo, kakaoTitle: e.target.value })}
                  className="w-full rounded bg-black border border-white/15 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 8: LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">상담 신청 목록 ({leads.length}건)</h3>
                  <p className="text-xs text-neutral-400">방문자가 남긴 돌잔치 제작 상담 리드</p>
                </div>
                <button
                  onClick={handleExportLeadsCsv}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-xs font-semibold text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>CSV 다운로드</span>
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="py-10 text-center text-xs text-neutral-500">
                  접수된 상담 내역이 없습니다.
                </div>
              ) : (
                <div className="space-y-2">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-neutral-900 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-orange-400">
                            {lead.babyName} ({lead.babyGender === 'boy' ? '남' : lead.babyGender === 'girl' ? '여' : '미정'})
                          </span>
                          <span className="text-xs text-neutral-400">· {lead.eventDate}</span>
                          <span className="text-xs text-neutral-300">· {lead.hallName}</span>
                        </div>
                        <p className="text-xs text-neutral-300 font-mono mt-1">
                          연락처: {lead.parentPhone} ({lead.parentName || '보호자'})
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          희망: {lead.preferredConcept}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            setLeads((prev) =>
                              prev.map((l) =>
                                l.id === lead.id
                                  ? { ...l, status: e.target.value as any }
                                  : l
                              )
                            )
                          }
                          className="rounded px-2 py-1 text-xs font-bold bg-black border border-white/15 text-white"
                        >
                          <option value="신규접수">신규접수</option>
                          <option value="상담완료">상담완료</option>
                          <option value="제작중">제작중</option>
                          <option value="완료">완료</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: SECURITY & PIN MANAGEMENT (Answers the user's question directly!) */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Question & Answer reassurance box */}
              <div className="rounded-xl border border-orange-500/30 bg-orange-950/20 p-5 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
                  <Info className="h-4 w-4" />
                  <span>"CMS는 나만 들어가서 수정할 수 있는 건가요?" 에 대한 안내</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                  <strong>네, 맞습니다!</strong> 본 웹사이트의 관리자(CMS) 모드는{' '}
                  <span className="text-orange-400 font-bold">보안 비밀번호(PIN)</span>로 철저히
                  잠겨 있습니다.
                </p>
                <ul className="text-xs text-neutral-300 space-y-1 pt-1 list-disc list-inside">
                  <li>일반 방문자는 올바른 비밀번호를 입력하지 않으면 CMS를 열 수 없습니다.</li>
                  <li>
                    현재 설정된 기본 비밀번호는 <code className="text-orange-400 font-bold font-mono">0000</code> 이며,
                    아래 폼에서 원하시는 자신만의 비밀번호로 바로 변경하실 수 있습니다.
                  </li>
                  <li>
                    수정하신 모든 내용(초대장, 영상, 텍스트)은 브라우저 저장소(localStorage)에 안전하게
                    보관되어 새로고침 후에도 그대로 유지됩니다.
                  </li>
                </ul>
              </div>

              {/* PIN Change Form */}
              <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5 space-y-4 max-w-lg">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-orange-400" />
                  <span>관리자 비밀번호 변경하기</span>
                </h3>

                <form onSubmit={handleChangePin} className="space-y-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      새로운 관리자 비밀번호 (4~12자리) *
                    </label>
                    <input
                      type="password"
                      required
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="새 비밀번호 입력"
                      className="w-full rounded bg-black border border-white/15 px-3 py-2 text-sm text-white font-mono focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      비밀번호 확인 *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      placeholder="새 비밀번호 다시 한 번 입력"
                      className="w-full rounded bg-black border border-white/15 px-3 py-2 text-sm text-white font-mono focus:border-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg text-xs font-bold text-white shadow-md active:scale-95"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    비밀번호 변경 및 저장
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-neutral-900 shrink-0">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>수정 사항은 브라우저 저장소에 실시간으로 안전하게 자동 저장됩니다.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-bold text-white shadow-md transition-all active:scale-95"
            style={{ backgroundColor: theme.accentColor }}
          >
            변경사항 적용 후 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
