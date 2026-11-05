import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, X, AlertCircle } from 'lucide-react';
import { ThemeConfig } from '../../types';

interface AdminPinModalProps {
  isOpen: boolean;
  adminPin: string;
  theme: ThemeConfig;
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  adminPin,
  theme,
  onSuccess,
  onClose,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput.trim() === adminPin.trim()) {
      setErrorMsg('');
      setPinInput('');
      onSuccess();
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다. (초기 기본값: 0000)');
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (pinInput.length < 8) {
      const next = pinInput + digit;
      setPinInput(next);
      setErrorMsg('');
      if (next === adminPin) {
        setPinInput('');
        onSuccess();
      }
    }
  };

  const handleBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-[#161616] p-6 shadow-2xl animate-in zoom-in-95 duration-150 text-white text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
          aria-label="닫기"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Lock Icon */}
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
          style={{
            backgroundColor: theme.accentColor,
            boxShadow: `0 0 25px ${theme.accentColor}55`,
          }}
        >
          <Lock className="h-7 w-7" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          데이메이드 관리자 보안 인증
        </h3>
        <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
          관리자 CMS는 사이트 소유자만 접근할 수 있도록 보안 비밀번호로 보호됩니다.
        </p>

        {/* PIN Input & Submit */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              autoFocus
              maxLength={12}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setErrorMsg('');
              }}
              placeholder="관리자 PIN 입력 (기본: 0000)"
              className="w-full text-center tracking-[0.3em] font-mono text-lg rounded-xl bg-neutral-900 border border-white/20 px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Keypad */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '←'].map((btn) => (
              <button
                key={btn}
                type="button"
                onClick={() => {
                  if (btn === 'C') setPinInput('');
                  else if (btn === '←') handleBackspace();
                  else handleKeypadPress(btn);
                }}
                className="h-11 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/5 font-mono text-base font-semibold text-neutral-200 transition-colors active:scale-95"
              >
                {btn}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-transform active:scale-95"
            style={{ backgroundColor: theme.accentColor }}
          >
            관리자 대시보드 로그인
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
          <KeyRound className="h-3.5 w-3.5 text-orange-400" />
          <span>초기 비밀번호는 <strong className="text-white font-mono">0000</strong> 이며, 로그인 후 변경 가능합니다.</span>
        </div>
      </div>
    </div>
  );
};
