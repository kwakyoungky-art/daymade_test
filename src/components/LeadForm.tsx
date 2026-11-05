import React, { useState } from 'react';
import { BookingLead, ThemeConfig } from '../types';
import { Sparkles, Calendar, User, Phone, CheckCircle2, MessageCircle, Send, ShieldAlert, Award } from 'lucide-react';

interface LeadFormProps {
  theme: ThemeConfig;
  selectedConcept: string;
  onSubmitLead: (lead: Omit<BookingLead, 'id' | 'createdAt' | 'status'>) => void;
  onOpenKakaoChat: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  theme,
  selectedConcept,
  onSubmitLead,
  onOpenKakaoChat,
}) => {
  const [formData, setFormData] = useState({
    babyName: '',
    babyGender: 'undecided' as 'boy' | 'girl' | 'undecided',
    eventDate: '',
    hallName: '시엠프레 탕정점 카라홀',
    parentName: '',
    parentPhone: '',
    preferredConcept: selectedConcept || '감동형 (처음 만난 그날부터)',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync if selectedConcept prop changes
  React.useEffect(() => {
    if (selectedConcept) {
      setFormData((prev) => ({ ...prev, preferredConcept: selectedConcept }));
    }
  }, [selectedConcept]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.babyName || !formData.parentPhone || !formData.eventDate) {
      alert('아기 이름, 돌잔치 행사 일자, 부모님 연락처를 입력해 주세요.');
      return;
    }

    // Phone format check
    if (!/^[0-9-]{10,14}$/.test(formData.parentPhone)) {
      alert('올바른 연락처 형식을 입력해 주세요 (예: 010-1234-5678).');
      return;
    }

    onSubmitLead(formData);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-white/10 bg-[#0d0d0d] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[160px] opacity-15"
        style={{ backgroundColor: theme.accentColor }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-950/20 text-xs font-bold text-orange-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>QUICK CONSULTATION & BOOKING</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            시엠프레 탕정점 제휴 제작 신청 & 실시간 상담
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            원하시는 일정과 아기 정보를 남겨주시면, 담당 전문 디렉터가 1시간 이내에
            제휴 특전 할인 안내 및 맞춤 콘셉트 상담을 도와드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Fast Benefit & Kakao Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-400" />
                <span>시엠프레 탕정 전용 혜택 체크</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                지금 신청서를 남겨주시면 아래 3가지 특전이 자동 예약 보장됩니다.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-base font-bold text-orange-400">01</span>
                  <div className="text-xs">
                    <span className="font-bold text-white block">10만원 즉시 할인</span>
                    <span className="text-neutral-400">정가 25만원 → 제휴가 15만원 적용</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-base font-bold text-orange-400">02</span>
                  <div className="text-xs">
                    <span className="font-bold text-white block">모바일 초대장 무상 제작</span>
                    <span className="text-neutral-400">카톡 공유용 프리미엄 웹 초대장 증정</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-base font-bold text-orange-400">03</span>
                  <div className="text-xs">
                    <span className="font-bold text-white block">식전 웰컴 영상 & 릴스 증정</span>
                    <span className="text-neutral-400">돌잔치 시작 전 상영 인트로 무비</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kakao 1:1 Instant Consultation Card */}
            <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-950/20 to-neutral-900 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEE500] text-[#191919]">
                  <MessageCircle className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">카카오톡 1:1 빠른 실시간 상담</h4>
                  <span className="text-xs text-yellow-400">답변 대기시간 약 5분 내외</span>
                </div>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                폼 작성이 번거로우시거나 급한 일정이신 경우 카카오톡 채널로 바로 1:1 문의를 남겨주세요.
              </p>
              <button
                onClick={onOpenKakaoChat}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-[#191919] font-bold text-xs sm:text-sm transition-transform active:scale-98 shadow-md"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>카카오톡 1:1 상담 바로가기</span>
              </button>
            </div>
          </div>

          {/* Right Column: Lead Submission Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 sm:p-8 shadow-xl">
              {isSubmitted ? (
                <div className="py-12 text-center animate-in fade-in duration-300">
                  <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white mb-4 shadow-xl"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    제휴 제작 신청이 정상 접수되었습니다!
                  </h3>
                  <p className="mt-3 text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    입력해 주신 연락처(<span className="font-mono text-orange-400 font-bold">{formData.parentPhone}</span>)로
                    데이메이드 전담 디렉터가 1시간 내(영업시간 기준)로 카카오톡 또는 유선 안내를 드립니다.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl border border-white/15 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white"
                    >
                      추가 신청 작성하기
                    </button>
                    <button
                      onClick={onOpenKakaoChat}
                      className="px-5 py-2.5 rounded-xl bg-[#FEE500] text-[#191919] text-xs sm:text-sm font-bold shadow-md"
                    >
                      카카오톡으로 먼저 말걸기
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Baby Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        아기 이름 (태명) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.babyName}
                        onChange={(e) => setFormData({ ...formData, babyName: e.target.value })}
                        placeholder="예: 김도윤 (또는 튼튼이)"
                        className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    {/* Baby Gender */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        아기 성별
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['boy', 'girl', 'undecided'] as const).map((gender) => (
                          <button
                            key={gender}
                            type="button"
                            onClick={() => setFormData({ ...formData, babyGender: gender })}
                            className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                              formData.babyGender === gender
                                ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {gender === 'boy' ? '왕자님 👑' : gender === 'girl' ? '공주님 🎀' : '미정/쌍둥이'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Date */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        돌잔치 행사 일시 *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    {/* Hall Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        시엠프레 탕정점 연회홀
                      </label>
                      <select
                        value={formData.hallName}
                        onChange={(e) => setFormData({ ...formData, hallName: e.target.value })}
                        className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                      >
                        <option value="시엠프레 탕정점 카라홀">시엠프레 탕정점 - 카라홀</option>
                        <option value="시엠프레 탕정점 아모르홀">시엠프레 탕정점 - 아모르홀</option>
                        <option value="시엠프레 탕정점 예약 예정">시엠프레 탕정점 - 예약 상담 중</option>
                        <option value="타 행사장/자택 돌잔치">타 행사장 / 홈스냅 돌잔치</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Parent Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        보호자 성함
                      </label>
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="예: 김민수 / 이지연"
                        className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    {/* Contact Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        휴대폰 번호 *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        placeholder="010-1234-5678"
                        className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Concept Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      희망 제작 컨셉
                    </label>
                    <select
                      value={formData.preferredConcept}
                      onChange={(e) => setFormData({ ...formData, preferredConcept: e.target.value })}
                      className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="감동형 (처음 만난 그날부터)">감동형 (처음 만난 그날부터 - 눈물/부모내레이션)</option>
                      <option value="위트/유쾌형 (천방지축 우리 대장님)">위트/유쾌형 (천방지축 우리 대장님 - 웃음/분위기UP)</option>
                      <option value="뮤지컬형 (우주에서 가장 빛나는 별)">뮤지컬형 (우주에서 가장 빛나는 별 - 화려한 연출)</option>
                      <option value="세로형 숏폼 (찰나의 순간들)">세로형 숏폼 (인스타 릴스 & 모바일 최적화)</option>
                      <option value="상담 후 결정">아직 고민 중 (디렉터 상담 후 추천 희망)</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      추가 요청사항 (선택)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="원하시는 삽입곡, 아기 특별한 에피소드, 또는 양가 부모님 감사 인사 추가 여부 등을 자유롭게 적어주세요."
                      className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Privacy clause */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="privacy"
                      defaultChecked
                      required
                      className="h-4 w-4 rounded border-white/20 bg-neutral-900 text-orange-500 focus:ring-0"
                    />
                    <label htmlFor="privacy" className="text-[11px] text-neutral-400">
                      [필수] 돌잔치 성장동영상 상담 및 시엠프레 제휴 할인 혜택 조회를 위한 개인정보 수집에 동의합니다.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm sm:text-base font-bold text-white shadow-xl transition-all duration-200 active:scale-98 cursor-pointer"
                    style={{
                      backgroundColor: theme.accentColor,
                      boxShadow: `0 0 25px ${theme.accentColor}50`,
                    }}
                  >
                    <Send className="h-4 w-4" />
                    <span>시엠프레 제휴 할인 적용 신청하기</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
