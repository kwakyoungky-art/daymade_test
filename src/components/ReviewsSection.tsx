import React, { useState } from 'react';
import { ReviewItem, ThemeConfig } from '../types';
import { Star, ThumbsUp, MessageSquare, Plus, Sparkles, X, Check } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  theme: ThemeConfig;
  onAddReview: (review: Omit<ReviewItem, 'id' | 'createdAt' | 'helpfulCount'>) => void;
  onUpvoteReview: (id: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  theme,
  onAddReview,
  onUpvoteReview,
}) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [form, setForm] = useState({
    babyName: '',
    parentName: '',
    eventDate: '',
    hall: '시엠프레 탕정점 카라홀',
    concept: '감동형 (처음 만난 그날부터)',
    rating: 5,
    title: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.babyName || !form.title || !form.content) {
      alert('아기 이름, 제목, 후기 내용을 모두 입력해 주세요.');
      return;
    }
    onAddReview(form);
    setIsWriteModalOpen(false);
    setForm({
      babyName: '',
      parentName: '',
      eventDate: '',
      hall: '시엠프레 탕정점 카라홀',
      concept: '감동형 (처음 만난 그날부터)',
      rating: 5,
      title: '',
      content: '',
    });
    alert('감동 후기가 성공적으로 등록되었습니다. 감사합니다!');
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 border-b border-white/10 bg-[#0a0a0a] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-orange-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>REAL TESTIMONIALS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              시엠프레 부모님들의 생생한 감동 후기
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
              시엠프레 탕정점에서 돌잔치를 치르신 부모님들께서 직접 남겨주신 솔직한 리뷰입니다.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 shrink-0"
            style={{
              backgroundColor: theme.accentColor,
              boxShadow: `0 0 20px ${theme.accentColor}40`,
            }}
          >
            <Plus className="h-4 w-4" />
            <span>나의 감동 후기 작성하기</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#131313] p-6 sm:p-7 transition-all duration-300 hover:border-orange-500/30 hover:bg-[#161616]"
            >
              <div>
                {/* Top Metas */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rev.rating ? 'fill-current' : 'text-neutral-600'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs font-bold text-white font-mono">
                      {rev.rating}.0
                    </span>
                  </div>

                  <span className="text-xs text-neutral-500 font-mono">
                    {rev.eventDate} 돌잔치
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {rev.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line mb-5">
                  {rev.content}
                </p>
              </div>

              {/* Bottom Attribution & Useful Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-200">
                    {rev.babyName} 주인공 · {rev.parentName}
                  </span>
                  <span className="text-[11px] text-orange-400 mt-0.5">
                    {rev.hall} ({rev.concept})
                  </span>
                </div>

                <button
                  onClick={() => onUpvoteReview(rev.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5 text-orange-400" />
                  <span className="font-mono">{rev.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Summary Strip */}
        <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-neutral-900/60 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold font-mono text-white">5.0 / 5.0</div>
            <div className="text-xs text-neutral-400 mt-1">시엠프레 탕정점 누적 고객 평점</div>
          </div>
          <div className="hidden sm:block h-10 w-px bg-white/10" />
          <div>
            <div
              className="text-3xl font-extrabold font-mono"
              style={{ color: theme.accentColor }}
            >
              100%
            </div>
            <div className="text-xs text-neutral-400 mt-1">지인 및 둘째 성장동영상 재의뢰 의사</div>
          </div>
          <div className="hidden sm:block h-10 w-px bg-white/10" />
          <div>
            <div className="text-3xl font-extrabold font-mono text-white">0건</div>
            <div className="text-xs text-neutral-400 mt-1">돌잔치 당일 영상 송출 사고율 (무결점)</div>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/20 bg-[#161616] p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-400" />
                <span>데이메이드 감동 후기 작성</span>
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    아기 이름 *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.babyName}
                    onChange={(e) => setForm({ ...form, babyName: e.target.value })}
                    placeholder="예: 지호"
                    className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    작성자 (보호자) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    placeholder="예: 이민영 어머님"
                    className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    돌잔치 홀 선택
                  </label>
                  <select
                    value={form.hall}
                    onChange={(e) => setForm({ ...form, hall: e.target.value })}
                    className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="시엠프레 탕정점 카라홀">시엠프레 탕정점 카라홀</option>
                    <option value="시엠프레 탕정점 아모르홀">시엠프레 탕정점 아모르홀</option>
                    <option value="시엠프레 탕정점">시엠프레 탕정점 기타홀</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    만족도 평점
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value={5}>★★★★★ 5.0 (매우 만족)</option>
                    <option value={4}>★★★★☆ 4.0 (만족)</option>
                    <option value={3}>★★★☆☆ 3.0 (보통)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  제작한 영상 컨셉
                </label>
                <input
                  type="text"
                  value={form.concept}
                  onChange={(e) => setForm({ ...form, concept: e.target.value })}
                  placeholder="예: 감동형 / 위트형 / 뮤지컬형"
                  className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  후기 제목 *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="예: 시엠프레 탕정점 스크린으로 보니 감동이 2배였어요!"
                  className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  생생한 후기 내용 *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="영상 퀄리티, 하객들의 반응, 1:1 피드백 과정 등 소중한 경험을 들려주세요."
                  className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-xs font-medium text-neutral-300 hover:bg-white/5"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-all shadow-md active:scale-95"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  후기 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
