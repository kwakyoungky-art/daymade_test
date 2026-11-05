import React from 'react';
import { X, MessageCircle, Phone, Clock, ExternalLink, QrCode } from 'lucide-react';
import { ThemeConfig } from '../types';

interface KakaoConsultModalProps {
  isOpen: boolean;
  theme: ThemeConfig;
  onClose: () => void;
}

export const KakaoConsultModal: React.FC<KakaoConsultModalProps> = ({
  isOpen,
  theme,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/20 bg-[#161616] p-6 shadow-2xl animate-in zoom-in-95 duration-150 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEE500] text-[#191919]">
              <MessageCircle className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">데이메이드 카카오톡 1:1 상담</h3>
              <p className="text-[11px] text-neutral-400">시엠프레 탕정점 전담 디렉터 직통 채널</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#FEE500]/10 border border-[#FEE500]/25 p-4 text-center">
            <p className="text-xs text-[#FEE500] font-semibold mb-1">
              카카오톡 채널 ID: <span className="font-mono underline">@daymade_movie</span>
            </p>
            <p className="text-xs text-neutral-300">
              "시엠프레 탕정점 제휴 문의"라고 말씀해 주시면 전담 디렉터가 즉시 10만원 할인 코드를 발급해 드립니다.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-3 bg-neutral-900 rounded-xl border border-white/5">
            <div className="p-3 bg-white rounded-xl shadow-inner mb-2">
              {/* QR Mockup visual for easy mobile camera scan */}
              <div className="h-32 w-32 bg-neutral-900 flex flex-col items-center justify-center text-white p-2 text-center rounded">
                <QrCode className="h-16 w-16 text-neutral-300 mb-1" />
                <span className="text-[10px] font-mono text-neutral-400">스마트폰 카메라로 스캔</span>
              </div>
            </div>
            <span className="text-xs text-neutral-400">스마트폰으로 카메라를 비추면 바로 카톡 연결</span>
          </div>

          <div className="space-y-2 text-xs text-neutral-400 bg-white/[0.02] p-3 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="h-3.5 w-3.5 text-orange-400" />
              <span>실시간 상담 시간: 09:00 ~ 23:00 (연중무휴 365일 지원)</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Phone className="h-3.5 w-3.5 text-orange-400" />
              <span>고객센터 유선 문의: 010-8921-9943</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://pf.kakao.com"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FEE500] hover:bg-[#edd400] text-[#191919] font-bold text-sm transition-transform active:scale-98 shadow-md"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>카카오톡 채널 채팅 바로 시작하기</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-400 hover:text-white"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
