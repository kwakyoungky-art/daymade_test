import React from 'react';
import { BenefitItem, ThemeConfig } from '../types';
import { Sparkles, Gift, CheckCircle2, Percent, Smartphone, MonitorPlay, ArrowRight } from 'lucide-react';

interface PartnershipBenefitsProps {
  benefits: BenefitItem[];
  theme: ThemeConfig;
  badge?: string;
  title?: string;
  description?: string;
  onApplyBenefit: (benefitTitle: string) => void;
}

export const PartnershipBenefits: React.FC<PartnershipBenefitsProps> = ({
  benefits,
  theme,
  badge = 'SIEMPRE TANGJEONG VIP PARTNERSHIP',
  title = '시엠프레 탕정점 단독 제휴 특전',
  description = '시엠프레 탕정점 계약 고객님께만 드리는 독점 혜택입니다. 할인부터 모바일 초대장, 식전 감사 영상까지 빈틈없이 챙겨드립니다.',
  onApplyBenefit,
}) => {
  const getIcon = (type: BenefitItem['icon']) => {
    switch (type) {
      case 'discount':
        return <Percent className="h-6 w-6 text-orange-400" />;
      case 'invitation':
        return <Smartphone className="h-6 w-6 text-amber-400" />;
      case 'screen':
        return <MonitorPlay className="h-6 w-6 text-orange-400" />;
      case 'gift':
        return <Gift className="h-6 w-6 text-amber-400" />;
      default:
        return <Sparkles className="h-6 w-6 text-orange-400" />;
    }
  };

  return (
    <section id="benefits" className="py-16 sm:py-24 border-b border-white/10 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative background glow */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full blur-[140px] opacity-15"
        style={{ backgroundColor: theme.accentColor }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-950/20 text-xs font-bold text-orange-400 mb-3">
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

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((item, idx) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#161616] to-[#101010] p-6 sm:p-8 transition-all duration-300 hover:border-orange-500/40 hover:shadow-xl"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    {getIcon(item.icon)}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white shadow-sm"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-orange-300 mb-3">
                  {item.summary}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Details Check List */}
                <div className="space-y-2 border-t border-white/10 pt-4">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle2 className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Apply Action */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <button
                  onClick={() => onApplyBenefit(item.title)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-all active:scale-98"
                >
                  <span>이 혜택으로 예약 문의하기</span>
                  <ArrowRight className="h-4 w-4 text-orange-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Assurance Box */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold">
              Q&A
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                시엠프레 탕정점 계약 여부는 어떻게 확인하나요?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                상담 신청 시 돌잔치 행사 일자와 계약자 성함을 기재해 주시면, 시엠프레 탕정점 예약 시스템과 실시간 연계되어 자동으로 제휴 할인이 즉시 승인됩니다.
              </p>
            </div>
          </div>
          <button
            onClick={() => onApplyBenefit('시엠프레 탕정점 연계 제휴')}
            className="shrink-0 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-md active:scale-95 whitespace-nowrap"
            style={{ backgroundColor: theme.accentColor }}
          >
            제휴 혜택 상담 바로가기
          </button>
        </div>
      </div>
    </section>
  );
};
