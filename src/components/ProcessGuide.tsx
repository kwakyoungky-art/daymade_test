import React from 'react';
import { ProcessStep, ThemeConfig } from '../types';
import { Sparkles, Calendar, Check, UploadCloud, Film, Award, HelpCircle } from 'lucide-react';

interface ProcessGuideProps {
  steps: ProcessStep[];
  theme: ThemeConfig;
  badge?: string;
  title?: string;
  description?: string;
  studioTitle?: string;
  studioDescription?: string;
  onOpenConsultation: () => void;
}

export const ProcessGuide: React.FC<ProcessGuideProps> = ({
  steps,
  theme,
  badge = 'HOW IT WORKS',
  title = '체계적인 4단계 제작 프로세스',
  description = '바쁜 육아 속에서도 스마트폰 하나로 간편하게 준비하실 수 있도록 데이메이드의 전담 디렉터가 처음부터 끝까지 1:1로 함께합니다.',
  studioTitle = '단순 템플릿 복사가 아닌, 우리 가족만의 시네마틱 마스터피스',
  studioDescription = '저화질 스마트폰 동영상도 인공지능 슈퍼 레졸루션과 전문 컬러 그레이딩을 거쳐 시엠프레 탕정점 연회장 대형 4K 빔프로젝터에 걸맞은 영화 같은 색감으로 재탄생합니다.',
  onOpenConsultation,
}) => {
  return (
    <section id="process" className="py-16 sm:py-24 border-b border-white/10 bg-[#0c0c0c] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
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
        </div>

        {/* 4-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#141414] p-6 transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1"
            >
              <div>
                {/* Step Pill & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs font-extrabold tracking-wider px-2.5 py-1 rounded-md text-white"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    {step.step}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-orange-300 font-mono font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <h4 className="text-xs font-medium text-orange-400 mb-3">
                  {step.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                  {step.description}
                </p>
              </div>

              {/* Tips Section */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  DIRECTOR TIP:
                </span>
                <ul className="space-y-1.5">
                  {step.tips.map((tip, tIdx) => (
                    <li
                      key={tIdx}
                      className="text-xs text-neutral-300 flex items-start gap-1.5 leading-snug"
                    >
                      <Check className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Production Studio Visual Callout */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                <Film className="h-4 w-4" />
                <span>1:1 PROFESSIONAL COLOR GRADING</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                단순 템플릿 복사가 아닌, 우리 가족만의 시네마틱 마스터피스
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                저화질 스마트폰 동영상도 인공지능 슈퍼 레졸루션과 전문 컬러 그레이딩을 거쳐
                시엠프레 탕정점 연회장 대형 4K 빔프로젝터에 걸맞은 영화 같은 색감으로 재탄생합니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onOpenConsultation}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform active:scale-95"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  제작 일정 상담받기
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden bg-black">
              <img
                src="/src/assets/images/video_studio_suite_1793831676680.jpg"
                alt="데이메이드 영상 프로덕션 스튜디오"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-900/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
