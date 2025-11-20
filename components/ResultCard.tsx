'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import Confetti from 'react-confetti';
import toast, { Toaster } from 'react-hot-toast';
import { ShareButton } from './ui';

interface ResultCardProps {
  title: string;
  mbti?: string;
  emoji: string;
  mainText: string;
  subTexts?: string[];
  gradient?: string;
  children?: ReactNode;
}

export function ResultCard({
  title,
  mbti,
  emoji,
  mainText,
  subTexts = [],
  gradient = 'from-purple-600 via-pink-600 to-red-600',
  children
}: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // 이미지로 저장하기
  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);
    toast.loading('이미지 생성 중...', { id: 'download' });

    try {
      // 약간의 딜레이를 줘서 렌더링 완료 대기
      await new Promise(resolve => setTimeout(resolve, 300));

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // 고해상도
        backgroundColor: '#1f2937', // 배경색
      });

      // 다운로드
      const link = document.createElement('a');
      link.download = `mbti-${mbti || 'result'}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      toast.success('이미지 저장 완료! 📸', { id: 'download' });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('이미지 생성 실패:', error);
      toast.error('이미지 생성에 실패했어요 😢', { id: 'download' });
    } finally {
      setIsDownloading(false);
    }
  };

  // 카카오톡 공유하기
  const handleKakaoShare = () => {
    toast.success('카카오톡 공유 기능은 준비 중이에요! 💬\n지금은 이미지 저장 후 직접 공유해주세요 😊');
  };

  // 링크 복사하기
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('링크 복사 완료! 🔗\n친구들에게 공유해보세요!');
  };

  return (
    <>
      <Toaster position="top-center" />

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* 결과 카드 (인스타 스토리 사이즈: 1080x1920, 비율 9:16) */}
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      >
        {/* 카드 - 스크린샷 찍을 영역 */}
        <div
          ref={cardRef}
          className="relative w-full max-w-[400px] aspect-[9/16] overflow-hidden rounded-3xl shadow-2xl"
          style={{
            background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
          }}
        >
          {/* 그라데이션 배경 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-95`} />

          {/* 패턴 오버레이 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            }} />
          </div>

          {/* 컨텐츠 */}
          <div className="relative z-10 h-full flex flex-col p-8 text-white">
            {/* 상단: 로고/브랜딩 */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-sm font-bold opacity-80">
                MBTI 관계 도우미
              </div>
              {mbti && (
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-black">
                  {mbti}
                </div>
              )}
            </div>

            {/* 중앙: 메인 컨텐츠 */}
            <div className="flex-1 flex flex-col justify-center items-center text-center gap-6">
              {/* 이모지 */}
              <motion.div
                className="text-8xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {emoji}
              </motion.div>

              {/* 타이틀 */}
              <h2 className="text-3xl font-black leading-tight">
                {title}
              </h2>

              {/* 메인 텍스트 */}
              <p className="text-2xl font-bold px-4 leading-relaxed">
                {mainText}
              </p>

              {/* 서브 텍스트들 */}
              {subTexts.length > 0 && (
                <div className="space-y-3 mt-4">
                  {subTexts.map((text, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 text-lg font-semibold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 추가 컨텐츠 */}
              {children}
            </div>

            {/* 하단: QR코드 or URL */}
            <div className="text-center text-sm opacity-70 mt-8">
              <p>mbtiexplain.nomadlab.kr</p>
              <p className="mt-1 font-bold">지금 바로 테스트해보세요! 🔥</p>
            </div>
          </div>
        </div>

        {/* 공유 버튼들 */}
        <motion.div
          className="w-full max-w-[400px] space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* 이미지 저장 */}
          <ShareButton
            onClick={handleDownload}
            icon="📸"
            label={isDownloading ? "생성 중..." : "이미지로 저장"}
            gradient="from-purple-500 to-pink-500"
          />

          {/* 버튼 그룹 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 링크 복사 */}
            <ShareButton
              onClick={handleCopyLink}
              icon="🔗"
              label="링크 복사"
              gradient="from-blue-500 to-cyan-500"
            />

            {/* 카카오톡 공유 */}
            <ShareButton
              onClick={handleKakaoShare}
              icon="💬"
              label="카톡 공유"
              gradient="from-yellow-500 to-orange-500"
            />
          </div>
        </motion.div>

        {/* 안내 문구 */}
        <motion.p
          className="text-sm text-gray-400 text-center max-w-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          💡 팁: 이미지를 인스타 스토리나 카톡 프로필에 올려보세요!<br/>
          친구들의 반응이 폭발할 거예요 🔥
        </motion.p>
      </motion.div>
    </>
  );
}
