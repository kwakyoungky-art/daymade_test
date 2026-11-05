import React, { useEffect } from 'react';
import { VideoItem, ThemeConfig } from '../types';
import { X, Play, Clock, Tag, Star, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { getYouTubeEmbedUrl } from '../utils/youtube';

interface VideoModalProps {
  video: VideoItem | null;
  theme: ThemeConfig;
  onClose: () => void;
  onSelectConcept: (conceptTitle: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  theme,
  onClose,
  onSelectConcept,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.youtubeId, true);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('영상 링크가 클립보드에 복사되었습니다.');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#121212] shadow-2xl animate-in zoom-in-95 duration-200"
        style={{
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 50px -10px ${theme.accentColor}30`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-neutral-900/90">
          <div className="flex items-center gap-2.5">
            <span
              className="px-2.5 py-0.5 rounded text-xs font-semibold text-white tracking-wide"
              style={{ backgroundColor: theme.accentColor }}
            >
              {video.categoryLabel}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {video.title}
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

        {/* Video Player (16:9) */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={video.title}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Metadata & Consultation Trigger */}
        <div className="p-5 sm:p-6 bg-neutral-900/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-2">
                <span className="flex items-center gap-1 font-medium text-neutral-300">
                  <Clock className="h-3.5 w-3.5" /> {video.runningTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Star className="h-3.5 w-3.5 fill-current" /> {video.rating ?? 5.0} 평점
                </span>
                {video.viewCount && (
                  <>
                    <span>·</span>
                    <span>조회수 {video.viewCount}</span>
                  </>
                )}
                <span>·</span>
                <span className="text-orange-400 font-medium">시엠프레 탕정점 연회장 맞춤 규격</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
                {video.description}
              </p>
            </div>

            <button
              onClick={() => {
                onSelectConcept(`${video.categoryLabel} - ${video.title}`);
                onClose();
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all shrink-0 active:scale-95 shadow-lg"
              style={{
                backgroundColor: theme.accentColor,
                boxShadow: `0 0 20px ${theme.accentColor}50`,
              }}
            >
              <span>이 컨셉으로 신청하기</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500 flex items-center gap-1">
              <Tag className="h-3 w-3" /> 추천 키워드:
            </span>
            {video.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
