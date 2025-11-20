'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MBTIType } from '@/types';
import { getAngryData } from '@/data/angry';
import { MBTIButton, Button, ProgressBar, AnimatedTitle, RelationshipCard, SurvivalMeter, CriticalWarning, CopyButton } from '@/components/ui';
import { ResultCard } from '@/components/ResultCard';
import AdBanner from '@/components/AdBanner';

export default function AngryPage() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);

  const mbtiTypes: MBTIType[] = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

  const handleGenderSelect = (g: 'male' | 'female') => {
    setGender(g);
    setStep(2);
  };

  const handleMBTISelect = (mbti: MBTIType) => {
    setSelectedMBTI(mbti);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setGender(null);
    setSelectedMBTI(null);
  };

  const data = selectedMBTI && gender ? getAngryData(selectedMBTI) : null;
  const result = data && gender ? data[gender] : null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 */}
        <Link href="/">
          <motion.div
            className="inline-flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <span className="text-2xl">←</span>
            <span className="font-bold">홈으로</span>
          </motion.div>
        </Link>

        {/* 타이틀 */}
        <AnimatedTitle className="mb-2">
          😤 킹받았을 때
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {step === 1 && "완전 킹받은 상대 달래는 법 💥"}
          {step === 2 && "상대방의 MBTI를 선택해주세요 🎯"}
          {step === 3 && "🔥 지금 바로 확인하세요!"}
        </motion.p>

        {/* 진행률 */}
        <ProgressBar current={step} total={3} className="mb-12" />

        {/* Step 1: 성별 선택 */}
        {step === 1 && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                킹받은 사람은 누구인가요? 🤔
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <RelationshipCard
                  icon="👨"
                  text="남자"
                  onClick={() => handleGenderSelect('male')}
                />
                <RelationshipCard
                  icon="👩"
                  text="여자"
                  onClick={() => handleGenderSelect('female')}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: MBTI 선택 */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                {gender === 'male' ? '👨 남자' : '👩 여자'}의 MBTI는?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {mbtiTypes.map((mbti) => (
                  <MBTIButton
                    key={mbti}
                    mbti={mbti}
                    onClick={() => handleMBTISelect(mbti)}
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

        {/* Step 3: 결과 - ResultCard 사용 */}
        {step === 3 && result && selectedMBTI && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 🚨 생존 확률 미터기 (최상단) */}
            <SurvivalMeter percentage={5} className="mb-8" />

            <ResultCard
              title={`${selectedMBTI} ${gender === 'male' ? '남자' : '여자'}가 킹받았을 때`}
              mbti={selectedMBTI}
              emoji="😤"
              mainText="완전 화났을 때의 대처법"
              gradient="from-red-600 via-orange-600 to-yellow-600"
            >
              {/* 화난 신호 */}
              <div className="w-full space-y-4 mt-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <h3 className="text-lg font-black mb-3 flex items-center gap-2">
                    🚨 킹받은 신호
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {result.signal.slice(0, 3).map((sig, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>{sig}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                    💡 왜 화났을까?
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {result.why.substring(0, 100)}...
                  </p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                    ✅ 해결 방법
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {result.solution.substring(0, 100)}...
                  </p>
                </div>
              </div>
            </ResultCard>

            {/* 상세 정보 (ResultCard 외부) */}
            <motion.div
              className="mt-8 space-y-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* 전체 화난 신호 */}
              <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  🚨 화난 신호 (Full Ver.)
                </h3>
                <ul className="space-y-3">
                  {result.signal.map((sig, idx) => (
                    <motion.li
                      key={idx}
                      className="text-white text-lg flex items-start gap-3 bg-black/20 rounded-xl p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                    >
                      <span className="text-yellow-300 font-bold">•</span>
                      <span>{sig}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* 왜 화났을까 */}
              <div className="bg-yellow-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-yellow-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  💡 왜 이렇게 킹받았을까?
                </h3>
                <p className="text-white text-lg leading-relaxed whitespace-pre-line">
                  {result.why}
                </p>
              </div>

              {/* 💀 금지어 경고 (절대 하지 말 것) */}
              <CriticalWarning
                title="💀 절대 금지! (이거 하면 끝장남 ㅋㅋ)"
                warnings={[result.avoid]}
              />

              {/* 해결 방법 */}
              <div className="bg-green-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-green-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  ✅ 달래는 법 (이거 하면 100% 풀림!)
                </h3>
                <p className="text-white text-lg leading-relaxed whitespace-pre-line mb-6">
                  {result.solution}
                </p>

                {/* 📋 복붙용 대본 버튼 */}
                <CopyButton
                  text={result.solution}
                  label="📋 달래는 대본 복사하기"
                />
              </div>

              {/* 광고 */}
              <AdBanner />

              {/* 버튼들 */}
              <div className="flex gap-4">
                <Button
                  onClick={handleReset}
                  variant="neon"
                  className="flex-1"
                >
                  🔄 다시 하기
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    🏠 홈으로
                  </Button>
                </Link>
              </div>

              {/* 다른 테스트 추천 */}
              <motion.div
                className="bg-purple-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-500/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <h3 className="text-xl font-black mb-4 text-white text-center">
                  🔥 이것도 해보세요!
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/apology">
                    <Button variant="primary" className="w-full text-sm">
                      💐 사과 받는 법
                    </Button>
                  </Link>
                  <Link href="/compatibility">
                    <Button variant="primary" className="w-full text-sm">
                      💕 궁합 테스트
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
