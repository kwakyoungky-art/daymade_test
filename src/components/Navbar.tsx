import React, { useState } from 'react';
import { MenuItem, ThemeConfig } from '../types';
import { Film, Settings, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  menuItems: MenuItem[];
  theme: ThemeConfig;
  brandName?: string;
  brandPartnerSubtitle?: string;
  onOpenAdmin: () => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  menuItems,
  theme,
  brandName = 'DAYMADE',
  brandPartnerSubtitle = '× SIEMPRE 탕정점',
  onOpenAdmin,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter and sort visible menu items
  const sortedItems = [...menuItems]
    .filter((item) => item.isVisible)
    .sort((a, b) => a.order - b.order);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark in display face */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6B00] to-orange-700 shadow-md transition-transform group-hover:scale-105"
            style={{
              backgroundColor: theme.accentColor,
              boxShadow: `0 0 15px ${theme.accentColor}55`,
            }}
          >
            <Film className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-wider text-base sm:text-lg leading-none">
              {brandName}
            </span>
            <span className="text-[10px] tracking-widest text-neutral-400 font-medium">
              {brandPartnerSubtitle}
            </span>
          </div>
        </a>

        {/* Zone 2: 4–6 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {sortedItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className="hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0 group text-neutral-300"
            >
              {item.label}
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transition-transform group-hover:scale-x-100"
                style={{ backgroundColor: theme.accentColor }}
              />
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions - Primary CTA and Admin trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin CMS Trigger */}
          <button
            onClick={onOpenAdmin}
            aria-label="관리자 CMS 패널 열기"
            title="관리자 설정 & 실시간 CMS"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all whitespace-nowrap shrink-0"
          >
            <Settings className="h-3.5 w-3.5 text-orange-400" />
            <span className="hidden sm:inline">관리자 모드</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-lg transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0"
            style={{
              backgroundColor: theme.accentColor,
              boxShadow: `0 0 20px ${theme.accentColor}40`,
            }}
          >
            <span>제작 신청하기</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="모바일 메뉴 열기"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0f0f0f] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-semibold text-neutral-400 tracking-wider">
              빠른 메뉴 이동
            </span>
            <span className="text-xs text-orange-400 font-medium">시엠프레 탕정점 공식 제휴</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {sortedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center justify-between p-2.5 rounded-lg text-left text-sm font-medium text-neutral-200 hover:bg-white/5 hover:text-white border border-white/5"
              >
                <span>{item.label}</span>
                <span className="text-xs text-neutral-500">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white rounded-lg transition-colors"
              style={{ backgroundColor: theme.accentColor }}
            >
              시엠프레 혜택받고 제작 신청하기
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 text-center text-xs font-medium text-neutral-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
            >
              관리자 모드 (CMS 편집) 열기
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
