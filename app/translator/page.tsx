'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MBTIType, Phrase } from '@/types';
import { getTranslation, availablePhrases } from '@/data/translator';
import { MBTIButton, Button, AnimatedTitle, RelationshipCard } from '@/components/ui';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default function TranslatorPage() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);

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

  const handlePhraseSelect = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    setIsLoading(true);

    // 2초 로딩 애니메이션
    setTimeout(() => {
      if (selectedMBTI && gender) {
        const result = getTranslation(phrase, selectedMBTI, gender);
        setTranslation(result);
        setIsLoading(false);
        setStep(4);
      }
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setGender(null);
    setSelectedMBTI(null);
    setSelectedPhrase(null);
    setTranslation(null);
    setIsLoading(false);
  };

  const getLoadingMessage = (): string[] => {
    if (!selectedMBTI) return [];
    const type = selectedMBTI[2]; // T or F
    if (type === 'T') {
      return ['T의 뇌파 분석 중...', '논리회로 가동 중...', '냉철한 사고 해독 중...'];
    } else {
      return ['F의 감정회로 해독 중...', '속마음 번역 중...', '감정 패턴 분석 중...'];
    }
  };

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
          💬 속마음 번역기
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {step === 1 && '"괜찮아"의 진짜 의미는? 🤯'}
          {step === 2 && '상대방의 MBTI를 선택해주세요 🎯'}
          {step === 3 && '번역할 말을 선택하세요 💬'}
          {step === 4 && '🔥 충격의 진실!'}
        </motion.p>

        {/* Step 1: 성별 선택 */}
        {step === 1 && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                번역할 사람은? 🤔
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

        {/* Step 3: 문구 선택 (카톡 UI 스타일) */}
        {step === 3 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                번역할 말을 선택하세요 💬
              </h2>

              {/* 카톡 대화방 스타일 */}
              <div className="space-y-4 max-w-md mx-auto">
                {availablePhrases.slice(0, 2).map((phrase, idx) => (
                  <motion.button
                    key={phrase}
                    onClick={() => handlePhraseSelect(phrase)}
                    className="w-full text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-end">
                      <div className="bg-yellow-400 rounded-2xl rounded-tr-sm px-6 py-4 max-w-[80%]">
                        <p className="text-gray-800 font-bold text-lg">
                          {phrase}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="secondary"
                  onClick={() => setStep(2)}
                >
                  ← 이전
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 로딩 화면 */}
        {isLoading && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
              <div className="text-center space-y-6">
                {/* 빙글빙글 로딩 아이콘 */}
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  🧠
                </motion.div>

                {/* 로딩 메시지 */}
                <AnimatePresence mode="wait">
                  {getLoadingMessage().map((msg, idx) => (
                    <motion.p
                      key={idx}
                      className="text-2xl font-black text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: idx * 0.6 }}
                    >
                      {msg}
                    </motion.p>
                  ))}
                </AnimatePresence>

                {/* 로딩 바 */}
                <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* 로딩 중 광고 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AdBanner />
            </motion.div>
          </motion.div>
        )}

        {/* Step 4: 결과 (카톡 UI 스타일) */}
        {step === 4 && translation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 카톡 대화방 */}
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-3xl p-8 border-4 border-yellow-400 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-center mb-8 text-gray-800">
                💬 카톡 대화방
              </h2>

              {/* 원본 메시지 (사용자가 보낸 것처럼) */}
              <motion.div
                className="flex justify-end mb-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="bg-yellow-400 rounded-2xl rounded-tr-sm px-6 py-4 max-w-[70%]">
                  <p className="text-gray-800 font-bold text-xl">
                    {selectedPhrase}
                  </p>
                </div>
              </motion.div>

              {/* 번역된 진짜 의미 (상대방이 보낸 것처럼) */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white rounded-2xl rounded-tl-sm px-6 py-4 max-w-[70%] border-2 border-gray-200">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-2xl">💀</span>
                    <p className="text-xs text-gray-500 font-bold">진짜 속마음</p>
                  </div>
                  <p className="text-gray-800 font-bold text-lg leading-relaxed">
                    {translation}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 팩폭 경고 */}
            <motion.div
              className="mt-8 max-w-2xl mx-auto bg-red-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">⚠️</span>
                <h3 className="text-xl font-black text-red-200">
                  팩폭 주의!
                </h3>
              </div>
              <p className="text-white leading-relaxed">
                이건 {selectedMBTI} {gender === 'male' ? '남자' : '여자'}의 전형적인 패턴이에요!<br />
                겉과 속이 완전 다르죠? ㅋㅋㅋ
              </p>
            </motion.div>

            {/* 광고 */}
            <div className="mt-8">
              <AdBanner />
            </div>

            {/* 버튼들 */}
            <div className="flex gap-4 mt-8 max-w-2xl mx-auto">
              <Button
                onClick={handleReset}
                variant="neon"
                className="flex-1"
              >
                🔄 다시 번역하기
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="secondary" className="w-full">
                  🏠 홈으로
                </Button>
              </Link>
            </div>

            {/* 다른 테스트 추천 */}
            <motion.div
              className="mt-8 max-w-2xl mx-auto bg-purple-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-500/50"
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
                <Link href="/quiz">
                  <Button variant="primary" className="w-full text-sm">
                    ⚡ 1분 퀴즈
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        <Footer />
      </div>
    </div>
  );
}
