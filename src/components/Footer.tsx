import React from 'react';
import { Film, Instagram, Youtube, MessageCircle, Heart, Shield, Award } from 'lucide-react';
import { ThemeConfig } from '../types';

interface FooterProps {
  theme: ThemeConfig;
  brandName?: string;
  brandPartnerSubtitle?: string;
  companyName?: string;
  ceoName?: string;
  bizNumber?: string;
  mailOrderNumber?: string;
  address?: string;
  contactPhone?: string;
  contactEmail?: string;
  kakaoChannelId?: string;
  onOpenAdmin: () => void;
  onOpenKakao: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme,
  brandName = 'DAYMADE',
  brandPartnerSubtitle = '× SIEMPRE 탕정점',
  companyName = '데이메이드 미디어 프로덕션 (DAYMADE)',
  ceoName = '박성민',
  bizNumber = '312-88-02491',
  mailOrderNumber = '제 2026-충남아산-0418호',
  address = '충청남도 아산시 탕정면 매곡리 1290-4 시엠프레 제휴 파트너스 오피스',
  contactPhone = '010-8921-9943',
  contactEmail = 'contact@daymade-studio.kr',
  kakaoChannelId = '@daymade_movie',
  onOpenAdmin,
  onOpenKakao,
}) => {
  return (
    <footer className="border-t border-white/10 bg-[#070707] text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg shadow-sm"
                style={{ backgroundColor: theme.accentColor }}
              >
                <Film className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-wider">
                {brandName}
              </span>
              <span className="text-xs text-neutral-400">{brandPartnerSubtitle}</span>
            </div>

            <p className="text-neutral-400 leading-relaxed text-pretty pr-4">
              데이메이드는 시엠프레 탕정점의 공식 제휴 성장동영상 프로덕션입니다.
              단순한 사진 슬라이드가 아닌, 우리 아이의 첫 번째 인생 영화를 만든다는 사명감으로
              감동과 품격이 넘치는 하이엔드 영상을 완성합니다.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-orange-500/50 transition-colors"
                title="인스타그램"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-orange-500/50 transition-colors"
                title="유튜브 채널"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <button
                onClick={onOpenKakao}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FEE500]/15 border border-[#FEE500]/30 text-yellow-300 hover:text-white transition-colors"
                title="카카오톡 채널"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-semibold text-sm">바로가기</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  브랜드 소개 & 디렉팅 철학
                </a>
              </li>
              <li>
                <a href="#samples" className="hover:text-white transition-colors">
                  성장동영상 샘플 갤러리
                </a>
              </li>
              <li>
                <a href="#invitations" className="hover:text-white transition-colors">
                  돌잔치 모바일 초대장 샘플
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-white transition-colors">
                  시엠프레 탕정점 단독 제휴 혜택
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  4단계 제작 가이드
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  실제 돌잔치 고객 감동 후기
                </a>
              </li>
            </ul>
          </div>

          {/* Business & Partnership Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-semibold text-sm">제휴처 및 고객 지원 센터</h4>
            <div className="space-y-1.5 text-neutral-400">
              <p>
                <strong className="text-neutral-300">공식 제휴:</strong> 시엠프레 탕정점 (카라홀 / 아모르홀 공식 상영)
              </p>
              <p>
                <strong className="text-neutral-300">상담 시간:</strong> 연중무휴 AM 09:00 ~ PM 23:00
              </p>
              <p>
                <strong className="text-neutral-300">카카오톡 문의:</strong> {kakaoChannelId}
              </p>
              <p>
                <strong className="text-neutral-300">이메일:</strong> {contactEmail}
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 underline font-medium"
                >
                  <Shield className="h-3 w-3" />
                  <span>관리자(CMS) 대시보드 바로가기</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Registration Details Bar */}
        <div className="border-t border-white/5 pt-8 text-neutral-500 space-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
            <span>상호: {companyName}</span>
            <span>대표자: {ceoName}</span>
            <span>사업자등록번호: {bizNumber}</span>
            <span>통신판매업신고: {mailOrderNumber}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
            <span>소재지: {address}</span>
            <span>개인정보보호책임자: {ceoName}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/5 gap-2 text-[11px]">
            <p>© 2026 {brandName} STUDIO. All Rights Reserved. Partnered with SIEMPRE Tangjeong.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-red-500 fill-current inline" /> for your baby's brightest milestone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
