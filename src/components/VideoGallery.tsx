import React, { useState } from 'react';
import { VideoItem, VideoCategory, ThemeConfig } from '../types';
import { Play, Clock, Sparkles, Filter, Star, Eye } from 'lucide-react';
import { getYouTubeThumbnail } from '../utils/youtube';

interface VideoGalleryProps {
  videos: VideoItem[];
  theme: ThemeConfig;
  badge?: string;
  title?: string;
  description?: string;
  onOpenVideoModal: (video: VideoItem) => void;
  onSelectConceptForLead: (concept: string) => void;
}

const CATEGORIES: { id: VideoCategory; label: string; countSuffix?: string }[] = [
  { id: 'all', label: '전체 보기' },
  { id: 'emotional', label: '감동형' },
  { id: 'witty', label: '위트/유쾌형' },
  { id: 'musical', label: '뮤지컬형' },
  { id: 'shorts', label: '세로형 숏폼' },
];

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  theme,
  badge = 'PORTFOLIO & SAMPLES',
  title = '데이메이드 대표 샘플 영상',
  description = '모든 영상은 고객님의 아기 사진과 스토리에 맞춰 1:1 맞춤 커스텀 제작됩니다. 시엠프레 탕정점 연회장 대형 빔프로젝터에 최적화된 4K 고화질 영상을 미리 감상해보세요.',
  onOpenVideoModal,
  onSelectConceptForLead,
}) => {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');

  const filteredVideos =
    activeCategory === 'all'
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <section id="samples" className="py-16 sm:py-24 border-b border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-orange-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-400">
            {description}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-neutral-900 border border-white/10 max-w-xl">
            {CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab.id;
              const count =
                tab.id === 'all'
                  ? videos.length
                  : videos.filter((v) => v.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: theme.accentColor,
                          boxShadow: `0 0 15px ${theme.accentColor}50`,
                        }
                      : {}
                  }
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => {
            const thumbnail =
              video.bgThumbnail || getYouTubeThumbnail(video.youtubeId, 'hq');

            return (
              <div
                key={video.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-2xl"
                style={{
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.6)',
                }}
              >
                {/* Thumbnail Container (16:9 for normal, 9:16 aspect preview indication for shorts) */}
                <div
                  className={`relative overflow-hidden bg-black cursor-pointer ${
                    video.category === 'shorts' ? 'aspect-[16/10]' : 'aspect-video'
                  }`}
                  onClick={() => onOpenVideoModal(video)}
                >
                  <img
                    src={thumbnail}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all duration-300 group-hover:scale-110 shadow-lg"
                      style={{
                        backgroundColor: `${theme.accentColor}cc`,
                        boxShadow: `0 0 25px ${theme.accentColor}70`,
                      }}
                    >
                      <Play className="h-6 w-6 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className="px-2.5 py-1 rounded text-xs font-bold text-white shadow-md backdrop-blur-md"
                      style={{ backgroundColor: `${theme.accentColor}ee` }}
                    >
                      {video.categoryLabel}
                    </span>
                    {video.featured && (
                      <span className="px-2 py-1 rounded bg-amber-500/80 text-white text-[10px] font-bold tracking-wide backdrop-blur-md">
                        BEST
                      </span>
                    )}
                  </div>

                  {/* Running time badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-black/75 backdrop-blur-md text-[11px] font-mono text-neutral-200 border border-white/10">
                    <Clock className="h-3 w-3 text-orange-400" />
                    <span>{video.runningTime}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <Star className="h-3 w-3 fill-current" /> {video.rating ?? 5.0}
                    </span>
                    {video.viewCount && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {video.viewCount}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => onOpenVideoModal(video)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-orange-300 transition-colors cursor-pointer line-clamp-1"
                  >
                    {video.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>

                  {/* Tag list */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {video.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenVideoModal(video)}
                      className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Play className="h-3 w-3 fill-current text-orange-400" />
                      <span>영상 감상하기</span>
                    </button>

                    <button
                      onClick={() => onSelectConceptForLead(`${video.categoryLabel} - ${video.title}`)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                      style={{
                        backgroundColor: theme.accentColor,
                      }}
                    >
                      상담 예약
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
