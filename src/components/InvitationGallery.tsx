import React, { useState } from 'react';
import { InvitationItem, InvitationSectionConfig, ThemeConfig } from '../types';
import { Sparkles, Play, Image as ImageIcon, Check, ArrowRight, Smartphone, Eye, Heart } from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';

interface InvitationGalleryProps {
  invitations: InvitationItem[];
  config: InvitationSectionConfig;
  theme: ThemeConfig;
  onOpenInvitationModal: (invitation: InvitationItem) => void;
  onSelectInvitationForLead: (invitationTitle: string) => void;
}

export const InvitationGallery: React.FC<InvitationGalleryProps> = ({
  invitations,
  config,
  theme,
  onOpenInvitationModal,
  onSelectInvitationForLead,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('전체');

  // Extract unique theme tags
  const tags = ['전체', ...Array.from(new Set(invitations.map((i) => i.themeTag)))];

  const filteredItems =
    selectedTag === '전체'
      ? invitations
      : invitations.filter((i) => i.themeTag === selectedTag);

  return (
    <section id="invitations" className="py-16 sm:py-24 border-b border-white/10 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full blur-[140px] opacity-15"
        style={{ backgroundColor: theme.accentColor }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-950/20 text-xs font-bold text-orange-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{config.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {config.title}
          </h2>

          <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed text-pretty">
            {config.description}
          </p>

          {/* Theme Tag Filters */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-neutral-900 border border-white/10 max-w-xl">
            {tags.map((tag) => {
              const isActive = selectedTag === tag;
              const count =
                tag === '전체'
                  ? invitations.length
                  : invitations.filter((i) => i.themeTag === tag).length;

              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
                  <span>{tag}</span>
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

        {/* Invitation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => {
            const hasVideo = Boolean(
              item.youtubeUrlOrId && extractYouTubeId(item.youtubeUrlOrId)
            );
            const videoThumb = hasVideo
              ? getYouTubeThumbnail(item.youtubeUrlOrId!, 'hq')
              : null;
            const displayPreview = item.previewImage || videoThumb || '/src/assets/images/hero_cinematic_baby_1793831675838.jpg';

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#131313] transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  {/* Top Preview Banner (Aspect 16:9) with interactive video or photo overlay */}
                  <div
                    className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer"
                    onClick={() => onOpenInvitationModal(item)}
                  >
                    <img
                      src={displayPreview}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Tag & Popular Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded text-xs font-bold text-white shadow-md backdrop-blur-md"
                        style={{ backgroundColor: `${theme.accentColor}ee` }}
                      >
                        {item.themeTag}
                      </span>
                      {item.isPopular && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/90 text-white text-[10px] font-bold tracking-wide">
                          인기 BEST
                        </span>
                      )}
                    </div>

                    {/* Has Video Badge */}
                    {hasVideo && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-medium text-orange-300 border border-orange-500/30">
                        <Play className="h-3 w-3 fill-current" />
                        <span>동영상 탑재형</span>
                      </div>
                    )}

                    {/* Center Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                      <div
                        className="flex h-13 w-13 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-transform group-hover:scale-110 shadow-lg"
                        style={{
                          backgroundColor: `${theme.accentColor}cc`,
                        }}
                      >
                        {hasVideo ? (
                          <Play className="h-6 w-6 fill-white translate-x-0.5" />
                        ) : (
                          <Eye className="h-6 w-6 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Bottom strip in banner */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                      <span className="font-semibold text-white truncate drop-shadow">
                        {item.subtitle}
                      </span>
                      <span className="text-[11px] text-neutral-400 shrink-0">
                        클릭하여 상세 미리보기
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        onClick={() => onOpenInvitationModal(item)}
                        className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-300 transition-colors cursor-pointer"
                      >
                        {item.title}
                      </h3>
                      <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded shrink-0">
                        시엠프레 무료
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Photo Gallery Strip Underneath (밑에 사진을 넣고 볼 수 있는 갤러리) */}
                    {item.galleryPhotos && item.galleryPhotos.length > 0 && (
                      <div className="mb-5 p-3 rounded-xl bg-black/40 border border-white/5">
                        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                          <span className="flex items-center gap-1 font-semibold text-neutral-300">
                            <ImageIcon className="h-3.5 w-3.5 text-orange-400" />
                            <span>초대장 구성 사진 갤러리</span>
                          </span>
                          <span className="text-[11px] text-neutral-500 font-mono">
                            {item.galleryPhotos.length}장 수록
                          </span>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {item.galleryPhotos.map((photo, pIdx) => (
                            <div
                              key={pIdx}
                              onClick={() => onOpenInvitationModal(item)}
                              className="relative h-14 w-20 shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-orange-500/60 cursor-pointer transition-all"
                            >
                              <img
                                src={photo}
                                alt={`초대장 사진 ${pIdx + 1}`}
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features checklist */}
                    <div className="space-y-1.5 border-t border-white/10 pt-4">
                      {item.features.slice(0, 3).map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2 text-xs text-neutral-300"
                        >
                          <Check className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenInvitationModal(item)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                  >
                    <Smartphone className="h-3.5 w-3.5 text-orange-400" />
                    <span>실시간 미리보기</span>
                  </button>

                  <button
                    onClick={() => onSelectInvitationForLead(`모바일 초대장: ${item.title}`)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <span>이 디자인 선택</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
