'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MBTIType } from '@/types';
import { MBTIButton, Button, AnimatedTitle } from '@/components/ui';
import { ResultCard } from '@/components/ResultCard';

export default function CompatibilityPage() {
  const [myMBTI, setMyMBTI] = useState<MBTIType | null>(null);
  const [partnerMBTI, setPartnerMBTI] = useState<MBTIType | null>(null);
  const [step, setStep] = useState(1);

  const mbtiTypes: MBTIType[] = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

  const getCompatibility = (mbti1: MBTIType, mbti2: MBTIType) => {
    // 간단한 궁합 로직
    const score = Math.floor(Math.random() * 30) + 70; // 70-100

    let keyword = '';
    let emoji = '';
    if (score >= 95) {
      keyword = '천생연분 (소울메이트)';
      emoji = '💖';
    } else if (score >= 85) {
      keyword = '로미오와 줄리엣 (열정)';
      emoji = '❤️‍🔥';
    } else if (score >= 75) {
      keyword = '톰과 제리 (애증)';
      emoji = '😼';
    } else {
      keyword = '평범한 인연';
      emoji = '🤝';
    }

    return { score, keyword, emoji };
  };

  const getFightReason = () => {
    const reasons = [
      '연락 빈도 문제 vs 개인 시간 존중',
      '계획 선호 vs 즉흥 선호',
      '감정 표현 방식 차이',
      '사생활 간섭 vs 무관심',
      '금전 사용 가치관 차이'
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  const handleMyMBTI = (mbti: MBTIType) => {
    setMyMBTI(mbti);
    setStep(2);
  };

  const handlePartnerMBTI = (mbti: MBTIType) => {
    setPartnerMBTI(mbti);
    setStep(3);
  };

  const handleReset = () => {
    setMyMBTI(null);
    setPartnerMBTI(null);
    setStep(1);
  };

  const compatibility = myMBTI && partnerMBTI ? getCompatibility(myMBTI, partnerMBTI) : null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <motion.div
            className="inline-flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <span className="text-2xl">←</span>
            <span className="font-bold">홈으로</span>
          </motion.div>
        </Link>

        <AnimatedTitle className="mb-2">
          💕 MBTI 궁합 테스트
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {step === 1 && '우리 둘이 잘 맞을까? 💘'}
          {step === 2 && '상대방의 MBTI를 선택하세요 🎯'}
          {step === 3 && '🔥 궁합 결과!'}
        </motion.p>

        {/* Step 1: 내 MBTI */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                나의 MBTI는?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mbtiTypes.map((mbti) => (
                  <MBTIButton
                    key={mbti}
                    mbti={mbti}
                    onClick={() => handleMyMBTI(mbti)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: 상대방 MBTI */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                상대방의 MBTI는?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {mbtiTypes.map((mbti) => (
                  <MBTIButton
                    key={mbti}
                    mbti={mbti}
                    onClick={() => handlePartnerMBTI(mbti)}
                  />
                ))}
              </div>
              <div className="text-center">
                <Button
                  variant="secondary"
                  onClick={() => setStep(1)}
                  className="mt-4"
                >
                  ← 이전
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: 결과 */}
        {step === 3 && compatibility && myMBTI && partnerMBTI && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultCard
              title={`${myMBTI} ❤️ ${partnerMBTI}`}
              mbti={myMBTI}
              emoji={compatibility.emoji}
              mainText={compatibility.keyword}
              gradient="from-pink-600 via-red-600 to-purple-600"
              subTexts={[
                `궁합 점수: ${compatibility.score}점`,
                '서로를 이해하는 관계'
              ]}
            />

            {/* 상세 분석 */}
            <motion.div
              className="mt-8 space-y-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* 관계성 키워드 */}
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-500/50">
                <h3 className="text-2xl font-black mb-4 text-white text-center">
                  {compatibility.emoji} {compatibility.keyword}
                </h3>
                <div className="text-center">
                  <div className="text-6xl font-black text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-2">
                    {compatibility.score}점
                  </div>
                  <p className="text-white/80">
                    {compatibility.score >= 90 && '완벽한 조합이에요! 서로를 너무 잘 이해해요!'}
                    {compatibility.score >= 80 && compatibility.score < 90 && '정말 좋은 궁합이에요! 함께 성장할 수 있어요!'}
                    {compatibility.score < 80 && '노력하면 좋은 관계를 만들 수 있어요!'}
                  </p>
                </div>
              </div>

              {/* 싸움 시뮬레이션 */}
              <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  💥 이 커플의 주된 싸움 원인
                </h3>
                <div className="bg-black/40 rounded-2xl p-6">
                  <p className="text-white text-xl font-bold leading-relaxed">
                    "{getFightReason()}"
                  </p>
                  <p className="text-white/70 mt-4">
                    이 부분만 주의하면 금방 해결돼요!
                  </p>
                </div>
              </div>

              {/* 관계 조언 */}
              <div className="bg-green-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-green-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  💡 관계를 더 좋게 만드는 법
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>서로의 차이를 인정하고 존중하기</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>솔직한 대화로 오해 풀기</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>함께 성장하는 관계 만들기</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleReset} variant="neon" className="flex-1">
                  🔄 다시 테스트
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    🏠 홈으로
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
