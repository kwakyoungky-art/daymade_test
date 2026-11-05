import React, { useState, useEffect } from 'react';
import { InvitationItem, ThemeConfig } from '../types';
import { X, Play, Sparkles, Check, ArrowRight, Share2, Image as ImageIcon, Film } from 'lucide-react';
import { getYouTubeEmbedUrl, extractYouTubeId } from '../utils/youtube';

interface InvitationModalProps {
  invitation: InvitationItem | null;
  theme: ThemeConfig;
  onClose: () => void;
  onApply: (invitationTitle: string) => void;
}

export const InvitationModal: React.FC<InvitationModalProps> = ({
  invitation,
  theme,
  onClose,
  onApply,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    setActivePhotoIdx(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (invitation) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [invitation, onClose]);

  if (!invitation) return null;

  const hasVideo = Boolean(invitation.youtubeUrlOrId && extractYouTubeId(invitation.youtubeUrlOrId));
  const embedUrl = hasVideo ? getYouTubeEmbedUrl(invitation.youtubeUrlOrId!, true) : '';

  const allPhotos = invitation.galleryPhotos && invitation.galleryPhotos.length > 0
    ? invitation.galleryPhotos
    : [invitation.previewImage];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('초대장 링크가 복사되었습니다.');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/20 bg-[#121212] shadow-2xl animate-in zoom-in-95 duration-200"
        style={{
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 50px -10px ${theme.accentColor}30`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              className="px-2.5 py-0.5 rounded text-xs font-semibold text-white tracking-wide"
              style={{ backgroundColor: theme.accentColor }}
            >
              {invitation.themeTag}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {invitation.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="링크 공유하기"
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* 1. Video Player Area (If video is present) */}
          {hasVideo && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 mb-2">
                <Film className="h-4 w-4" />
                <span>초대장 탑재 하이라이트 영상 시청</span>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/10 shadow-lg">
                <iframe
                  src={embedUrl}
                  title={`${invitation.title} 영상`}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* 2. Photo Gallery & Smartphone Mockup Section (밑에 들어가는 사진들 및 디자인) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-200">
                <ImageIcon className="h-4 w-4 text-orange-400" />
                <span>초대장 디자인 & 갤러리 사진 미리보기 ({allPhotos.length}장)</span>
              </div>
              <span className="text-xs text-neutral-400">
                사진을 클릭하면 확대해서 볼 수 있습니다
              </span>
            </div>

            {/* Featured Active Photo Display */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center">
              <img
                src={allPhotos[activePhotoIdx]}
                alt={`${invitation.title} 갤러리 ${activePhotoIdx + 1}`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain sm:object-cover"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-xs text-neutral-200 font-mono">
                {activePhotoIdx + 1} / {allPhotos.length}
              </div>
            </div>

            {/* Thumbnail Strip for photos */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
              {allPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative h-16 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    activePhotoIdx === idx
                      ? 'border-orange-500 scale-102 shadow-md'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo}
                    alt=""
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 3. Description & Features */}
          <div className="rounded-xl bg-neutral-900/70 border border-white/10 p-5 space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                {invitation.subtitle}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {invitation.description}
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <span className="text-xs font-bold text-orange-400 block mb-2">
                포함된 프리미엄 모바일 기능
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {invitation.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <Check className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 bg-neutral-900/90 shrink-0 gap-3">
          <div className="text-xs text-neutral-400 hidden sm:block">
            <span>시엠프레 탕정점 계약 고객님께는</span>{' '}
            <strong className="text-orange-400">100% 무상 제공</strong>됩니다.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-300 hover:text-white"
            >
              닫기
            </button>

            <button
              onClick={() => {
                onApply(`모바일 초대장: ${invitation.title}`);
                onClose();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
              style={{
                backgroundColor: theme.accentColor,
                boxShadow: `0 0 20px ${theme.accentColor}50`,
              }}
            >
              <span>이 디자인으로 무료 신청하기</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
