import React, { useState } from 'react';
import { HeroContent, ThemeConfig } from '../types';
import { Play, Sparkles, Award, ShieldCheck, Film, Volume2, VolumeX, Maximize2, ArrowRight } from 'lucide-react';
import { getYouTubeThumbnail } from '../utils/youtube';

interface HeroSectionProps {
  content: HeroContent;
  theme: ThemeConfig;
  onPlayMainVideo: (videoId: string) => void;
  onExploreSamples: () => void;
  onClaimBenefit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  theme,
  onPlayMainVideo,
  onExploreSamples,
  onClaimBenefit,
}) => {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const heroThumbnail = getYouTubeThumbnail(content.mainVideoId, 'maxres');

  return (
    <section id="about" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/10">
      {/* Background ambient glow circles */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full blur-[140px] opacity-20"
        style={{ backgroundColor: theme.accentColor }}
      />
      <div className="pointer-events-none absolute top-1/2 right-[-100px] h-96 w-96 rounded-full blur-[120px] bg-amber-600/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Trust Marker */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6">
            <Sparkles className="h-4 w-4" style={{ color: theme.accentColor }} />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-200">
              {content.badge}
            </span>
            <span className="text-xs text-neutral-500">|</span>
            <span className="text-xs font-medium text-orange-300">DAYMADE STUDIO</span>
          </div>

          {/* Marquee Headline */}
          <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] sm:leading-[1.18] text-balance">
            {content.titlePart1}{' '}
            <span
              className="relative inline-block px-1"
              style={{
                color: theme.accentColor,
                textShadow: `0 0 35px ${theme.accentColor}66`,
              }}
            >
              {content.titleHighlight}
            </span>
            {content.titlePart2}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-300 font-normal leading-relaxed text-pretty">
            {content.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onPlayMainVideo(content.mainVideoId)}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white shadow-xl transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: theme.accentColor,
                boxShadow: `0 0 30px ${theme.accentColor}55`,
              }}
            >
              <Play className="h-5 w-5 fill-current" />
              <span>대표 성장동영상 시청하기</span>
            </button>

            <button
              onClick={onExploreSamples}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-medium text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              <span>테마별 샘플 갤러리</span>
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Cinematic Main Video Theater Container */}
        <div className="relative mx-auto mt-6 max-w-5xl">
          <div
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-2xl transition-all duration-300 hover:border-orange-500/40"
            style={{
              boxShadow: `0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px -15px ${theme.accentColor}25`,
            }}
          >
            {/* Top Cine Letterbox Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-neutral-950/80 px-4 py-2.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Film className="h-3.5 w-3.5 text-orange-400" />
                <span className="font-semibold text-neutral-200">DAYMADE CINEMA 4K</span>
                <span>·</span>
                <span className="text-neutral-400">시엠프레 탕정점 연회장 공식 상영본</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-orange-500/20 px-2 py-0.5 text-[11px] font-bold text-orange-300">
                  DOLBY AUDIO
                </span>
                <span className="text-xs text-neutral-400 font-mono">16:9 UHD</span>
              </div>
            </div>

            {/* Video Stage */}
            <div className="relative aspect-video w-full bg-black">
              {!isPlayingInline ? (
                <div className="relative h-full w-full">
                  {/* Thumbnail with fallbacks */}
                  <img
                    src="/src/assets/images/hero_cinematic_baby_1793831675838.jpg"
                    alt="데이메이드 대표 성장동영상 썸네일"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                  {/* Center Play Beacon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <button
                      onClick={() => setIsPlayingInline(true)}
                      aria-label="영상 재생하기"
                      className="group/btn flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
                      style={{
                        backgroundColor: `${theme.accentColor}dd`,
                        boxShadow: `0 0 40px ${theme.accentColor}88`,
                      }}
                    >
                      <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-white translate-x-0.5" />
                    </button>
                    <p className="mt-4 text-sm sm:text-base font-semibold text-white tracking-wide">
                      클릭하여 대표 성장동영상 예시 바로보기
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      (실제 제작된 1:1 감동형 무비 하이라이트)
                    </p>
                  </div>

                  {/* Corner Quick Actions */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button
                      onClick={() => onPlayMainVideo(content.mainVideoId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs text-neutral-200 hover:text-white transition-colors"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>대형 모달로 보기</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${content.mainVideoId}?autoplay=1&rel=0&playsinline=1`}
                    title="DAYMADE 대표 성장동영상"
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Partnership Special Banner */}
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-950/40 via-neutral-900 to-orange-950/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white font-bold text-lg"
                style={{ backgroundColor: theme.accentColor }}
              >
                ★
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    SPECIAL BENEFIT
                  </span>
                  <span className="text-xs text-neutral-400">·</span>
                  <span className="text-xs text-neutral-300 font-medium">시엠프레 탕정점 연계 프로모션</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
                  {content.partnershipBanner}
                </p>
              </div>
            </div>

            <button
              onClick={onClaimBenefit}
              className="shrink-0 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-semibold text-white transition-all whitespace-nowrap text-center"
            >
              혜택 적용 신청하기 →
            </button>
          </div>
        </div>

        {/* Adjacent Quantitative Proof Strip */}
        <div className="mx-auto mt-10 max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-8">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-extrabold font-mono tracking-tight text-white tabular-nums">
              {content.stats.stat1Number}
            </div>
            <div className="text-xs text-neutral-300 font-medium leading-tight">
              {content.stats.stat1Label}
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div
              className="text-3xl font-extrabold font-mono tracking-tight tabular-nums"
              style={{ color: theme.accentColor }}
            >
              {content.stats.stat2Number}
            </div>
            <div className="text-xs text-neutral-300 font-medium leading-tight">
              {content.stats.stat2Label}
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-extrabold font-mono tracking-tight text-white tabular-nums">
              {content.stats.stat3Number}
            </div>
            <div className="text-xs text-neutral-300 font-medium leading-tight">
              {content.stats.stat3Label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
