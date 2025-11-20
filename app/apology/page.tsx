'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MBTIType } from '@/types';
import { getApologyData } from '@/data/apology';
import { MBTIButton, Button, ProgressBar, AnimatedTitle, RelationshipCard } from '@/components/ui';
import { ResultCard } from '@/components/ResultCard';
import AdBanner from '@/components/AdBanner';

export default function ApologyPage() {
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

  const data = selectedMBTI && gender ? getApologyData(selectedMBTI) : null;
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
          💐 진심 전달 사과법
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {step === 1 && "MBTI별 진짜 먹히는 사과 방법 🙏"}
          {step === 2 && "상대방의 MBTI를 선택해주세요 🎯"}
          {step === 3 && "🔥 이 사과법이면 100% 용서받음!"}
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
                사과받을 사람은? 🤔
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
            <ResultCard
              title={`${selectedMBTI} ${gender === 'male' ? '남자' : '여자'} 사과받는 법`}
              mbti={selectedMBTI}
              emoji="💐"
              mainText="이 방법으로 사과하면 100% 용서!"
              gradient="from-purple-600 via-pink-600 to-rose-600"
              subTexts={[
                "진심이 전달되는 방법",
                "MBTI 맞춤형 사과"
              ]}
            >
              {/* 간단 요약 */}
              <div className="w-full space-y-3 mt-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-sm leading-relaxed">
                    "{result.example.substring(0, 80)}..."
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
              {/* 화났을 때 신호 */}
              <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  🚨 화났을 때 신호 (이렇게 하면 빡침)
                </h3>
                <p className="text-white text-lg leading-relaxed whitespace-pre-line">
                  {result.signal}
                </p>
              </div>

              {/* 원하는 사과 방식 */}
              <div className="bg-green-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-green-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  💚 이 사과가 진심으로 들림!
                </h3>
                <p className="text-white text-lg leading-relaxed whitespace-pre-line">
                  {result.want}
                </p>
              </div>

              {/* 피해야 할 행동 */}
              <div className="bg-orange-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-orange-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  ⚠️ 이거 하면 더 화남 ㅋㅋ (절대 금지!)
                </h3>
                <p className="text-white text-lg leading-relaxed whitespace-pre-line">
                  {result.avoid}
                </p>
              </div>

              {/* 사과 예시 */}
              <div className="bg-purple-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  💬 사과 예시 (이대로 따라해봐!)
                </h3>
                <div className="bg-black/30 rounded-2xl p-6">
                  <p className="text-white text-lg leading-relaxed whitespace-pre-line italic">
                    {result.example}
                  </p>
                </div>
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
                  <Link href="/angry">
                    <Button variant="primary" className="w-full text-sm">
                      😤 화났을 때
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
