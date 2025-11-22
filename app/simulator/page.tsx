'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MBTIType } from '@/types';
import { getScenarios, getEnding, SimulatorEnding } from '@/data/simulator';
import { MBTIButton, Button, AnimatedTitle } from '@/components/ui';
import { ResultCard } from '@/components/ResultCard';
import AdBanner from '@/components/AdBanner';

type EmotionLevel = 'happy' | 'neutral' | 'angry' | 'furious';

export default function SimulatorPage() {
  const [step, setStep] = useState(1);
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [emotionScore, setEmotionScore] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [lastResponse, setLastResponse] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [ending, setEnding] = useState<SimulatorEnding | null>(null);
  const [collectedBadges, setCollectedBadges] = useState<string[]>([]);

  const mbtiTypes: MBTIType[] = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

  const handleMBTISelect = (mbti: MBTIType) => {
    setSelectedMBTI(mbti);
    setStep(2);
  };

  const getEmotion = (): EmotionLevel => {
    if (emotionScore >= 2) return 'happy';
    if (emotionScore >= 0) return 'neutral';
    if (emotionScore >= -2) return 'angry';
    return 'furious';
  };

  const getEmotionEmoji = (): string => {
    const emotion = getEmotion();
    if (emotion === 'happy') return '😊';
    if (emotion === 'neutral') return '😐';
    if (emotion === 'angry') return '😤';
    return '🤬';
  };

  const getEmotionText = (): string => {
    const emotion = getEmotion();
    if (emotion === 'happy') return '기분 좋은 상태! 👍';
    if (emotion === 'neutral') return '조금 불편한 상태... 😕';
    if (emotion === 'angry') return '화난 상태! 조심하세요 🔥';
    return '완전 폭발 직전!! 💢';
  };

  const handleChoice = (isOptionA: boolean) => {
    if (!selectedMBTI) return;

    const scenarios = getScenarios(selectedMBTI);
    const scenario = scenarios[currentScenario];
    const choice = isOptionA ? scenario.optionA : scenario.optionB;

    setLastResponse(choice.response);
    setShowResponse(true);

    const newScore = emotionScore + choice.emotionChange;
    setEmotionScore(newScore);

    setTimeout(() => {
      setShowResponse(false);

      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
      } else {
        const finalEnding = getEnding(newScore);
        setEnding(finalEnding);

        if (finalEnding.badge && !collectedBadges.includes(finalEnding.badge)) {
          setCollectedBadges(prev => [...prev, finalEnding.badge!]);
        }

        setIsComplete(true);
      }
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMBTI(null);
    setCurrentScenario(0);
    setEmotionScore(0);
    setShowResponse(false);
    setLastResponse('');
    setIsComplete(false);
    setEnding(null);
  };

  const scenarios = selectedMBTI ? getScenarios(selectedMBTI) : [];

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
          🎮 갈등 시뮬레이터
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {step === 1 && '실전 대처법 연습하기! 🔥'}
          {step === 2 && !isComplete && `시나리오 ${currentScenario + 1}/${scenarios.length} 💥`}
          {isComplete && '결과 확인!'}
        </motion.p>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                상대방의 MBTI는?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mbtiTypes.map((mbti) => (
                  <MBTIButton
                    key={mbti}
                    mbti={mbti}
                    onClick={() => handleMBTISelect(mbti)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && !isComplete && selectedMBTI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-500/50 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    상대방의 감정 상태
                  </h3>
                  <p className="text-white/80 text-sm">
                    {getEmotionText()}
                  </p>
                </div>
                <motion.div
                  className="text-8xl"
                  key={getEmotion()}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                >
                  {getEmotionEmoji()}
                </motion.div>
              </div>

              <div className="mt-4">
                <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute top-0 left-0 h-full ${
                      emotionScore >= 2 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      emotionScore >= 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      emotionScore >= -2 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      'bg-gradient-to-r from-red-600 to-red-800'
                    }`}
                    initial={{ width: '50%' }}
                    animate={{ width: `${50 + (emotionScore * 8.33)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentScenario}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="bg-black/40 rounded-2xl p-6 mb-6">
                    <h3 className="text-sm font-bold text-purple-300 mb-2">상황</h3>
                    <p className="text-white text-xl leading-relaxed">
                      {scenarios[currentScenario].situation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      onClick={() => handleChoice(true)}
                      disabled={showResponse}
                      className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-lg shadow-xl overflow-hidden min-h-[120px] flex items-center justify-center border-4 border-blue-300/50"
                      whileHover={!showResponse ? { scale: 1.05 } : {}}
                      whileTap={!showResponse ? { scale: 0.95 } : {}}
                    >
                      <span className="relative z-10 text-center">
                        {scenarios[currentScenario].optionA.text}
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={() => handleChoice(false)}
                      disabled={showResponse}
                      className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold text-lg shadow-xl overflow-hidden min-h-[120px] flex items-center justify-center border-4 border-purple-300/50"
                      whileHover={!showResponse ? { scale: 1.05 } : {}}
                      whileTap={!showResponse ? { scale: 0.95 } : {}}
                    >
                      <span className="relative z-10 text-center">
                        {scenarios[currentScenario].optionB.text}
                      </span>
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {showResponse && (
                      <motion.div
                        className="mt-6 bg-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <p className="text-white text-xl font-bold text-center">
                          💬 "{lastResponse}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>

            {collectedBadges.length > 0 && (
              <motion.div
                className="mt-6 bg-red-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="text-xl font-black text-white mb-4 text-center">
                  💀 수집한 배드 엔딩
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {collectedBadges.map((badge, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-black/40 rounded-xl px-4 py-2 text-white font-bold border-2 border-red-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {badge}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {isComplete && ending && selectedMBTI && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultCard
              title={ending.title}
              mbti={selectedMBTI}
              emoji={ending.type === 'good' ? '💕' : ending.type === 'neutral' ? '😐' : '💔'}
              mainText={ending.message}
              gradient={
                ending.type === 'good' ? 'from-green-600 via-emerald-600 to-teal-600' :
                ending.type === 'neutral' ? 'from-yellow-600 via-orange-600 to-amber-600' :
                'from-red-600 via-rose-600 to-pink-600'
              }
            />

            <motion.div
              className="mt-8 space-y-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className={`backdrop-blur-md rounded-3xl p-6 border-2 ${
                ending.type === 'good' ? 'bg-green-500/20 border-green-500/50' :
                ending.type === 'neutral' ? 'bg-yellow-500/20 border-yellow-500/50' :
                'bg-red-500/20 border-red-500/50'
              }`}>
                <h3 className="text-2xl font-black mb-4 text-white text-center">
                  최종 관계 점수
                </h3>
                <div className="text-center">
                  <div className="text-6xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                    {emotionScore > 0 ? '+' : ''}{emotionScore}점
                  </div>
                </div>
              </div>

              {ending.badge && (
                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500">
                  <h3 className="text-2xl font-black mb-4 text-white text-center">
                    획득한 배드 엔딩
                  </h3>
                  <div className="flex justify-center">
                    <motion.div
                      className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl px-8 py-4 text-white font-black text-2xl border-4 border-red-400"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', bounce: 0.6 }}
                    >
                      {ending.badge}
                    </motion.div>
                  </div>
                </div>
              )}

              <AdBanner />

              <div className="flex gap-4">
                <Button onClick={handleReset} variant="neon" className="flex-1">
                  🔄 다시 시작
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
