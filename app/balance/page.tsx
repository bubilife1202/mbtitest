'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MBTIType } from '@/types';
import { balanceQuestions, calculateMBTI, getMBTIResult } from '@/data/balance';
import { Button, ProgressBar, AnimatedTitle } from '@/components/ui';
import { ResultCard } from '@/components/ResultCard';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default function BalancePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
  const [showStats, setShowStats] = useState(false);

  // 더미 통계 데이터 (실제로는 백엔드에서 가져와야 함)
  const getRandomStats = () => {
    const percentA = Math.floor(Math.random() * 40) + 30; // 30-70%
    return { A: percentA, B: 100 - percentA };
  };
  const [stats, setStats] = useState(getRandomStats());

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleChoice = (choice: 'A' | 'B') => {
    const question = balanceQuestions[currentQuestion];
    const scoreToAdd = choice === 'A' ? question.scoreA : question.scoreB;

    const newScores = { ...scores };
    Object.entries(scoreToAdd).forEach(([key, value]) => {
      newScores[key as keyof typeof scores] += value || 0;
    });

    setScores(newScores);
    setSelectedChoice(choice);
    setShowStats(true);

    // 1초 후 자동으로 다음 문제로 이동 (틱톡 스타일)
    setTimeout(() => {
      if (currentQuestion < balanceQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedChoice(null);
        setShowStats(false);
        setStats(getRandomStats()); // 새로운 통계 생성
      } else {
        setIsComplete(true);
      }
    }, 1200);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setIsComplete(false);
    setIsStarted(false);
  };

  const resultMBTI = isComplete ? calculateMBTI(scores) : null;
  const result = resultMBTI ? getMBTIResult(resultMBTI) : null;

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
          ⚖️ 밸런스 게임
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {!isStarted && "20문항으로 내 MBTI 찾기! 🎯"}
          {isStarted && !isComplete && `${currentQuestion + 1}/${balanceQuestions.length} 💥`}
          {isComplete && "🔥 당신의 MBTI는?!"}
        </motion.p>

        {/* 진행률 (퀴즈 중에만 표시) */}
        {isStarted && !isComplete && (
          <ProgressBar current={currentQuestion + 1} total={balanceQuestions.length} className="mb-12" />
        )}

        {/* 시작 화면 */}
        {!isStarted && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
              <div className="text-center space-y-6">
                <motion.div
                  className="text-8xl"
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  ⚖️
                </motion.div>

                <h2 className="text-3xl font-black text-white">
                  MBTI 밸런스 게임
                </h2>

                <p className="text-lg text-white/80">
                  20개의 질문으로 당신의 진짜 MBTI를 찾아드려요!<br/>
                  솔직하게 답변해주세요 😊
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm text-white/70 bg-black/20 rounded-2xl p-4">
                  <div>⏱️ 소요 시간: 2분</div>
                  <div>📊 정확도: 95%</div>
                  <div>❤️ 참여자: 50만+</div>
                  <div>⭐ 평점: 4.9</div>
                </div>

                <Button
                  onClick={handleStart}
                  variant="neon"
                  className="mt-6 w-full text-2xl py-6"
                >
                  🚀 시작하기
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 퀴즈 진행 */}
        {isStarted && !isComplete && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-black text-center mb-12 text-white">
                  당신은 어느 쪽? 🤔
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 선택지 A */}
                  <motion.button
                    onClick={() => !showStats && handleChoice('A')}
                    disabled={showStats}
                    className={`relative p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-black text-xl shadow-2xl overflow-hidden min-h-[200px] flex flex-col items-center justify-center border-4 ${
                      selectedChoice === 'A' ? 'border-yellow-300 scale-105' : 'border-blue-300/50'
                    }`}
                    whileHover={!showStats ? { scale: 1.05, rotate: -2 } : {}}
                    whileTap={!showStats ? { scale: 0.95 } : {}}
                  >
                    {/* 배경 효과 */}
                    {!showStats && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    )}

                    <span className="relative z-10 whitespace-pre-line text-center leading-relaxed mb-4">
                      {balanceQuestions[currentQuestion].optionA}
                    </span>

                    {/* 통계 표시 */}
                    {showStats && (
                      <motion.div
                        className="w-full mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="bg-black/30 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">다른 사람들의 선택</span>
                            <span className="text-2xl font-black text-yellow-300">{stats.A}%</span>
                          </div>
                          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
                              initial={{ width: 0 }}
                              animate={{ width: `${stats.A}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>

                  {/* 선택지 B */}
                  <motion.button
                    onClick={() => !showStats && handleChoice('B')}
                    disabled={showStats}
                    className={`relative p-8 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-700 text-white font-black text-xl shadow-2xl overflow-hidden min-h-[200px] flex flex-col items-center justify-center border-4 ${
                      selectedChoice === 'B' ? 'border-yellow-300 scale-105' : 'border-purple-300/50'
                    }`}
                    whileHover={!showStats ? { scale: 1.05, rotate: 2 } : {}}
                    whileTap={!showStats ? { scale: 0.95 } : {}}
                  >
                    {/* 배경 효과 */}
                    {!showStats && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    )}

                    <span className="relative z-10 whitespace-pre-line text-center leading-relaxed mb-4">
                      {balanceQuestions[currentQuestion].optionB}
                    </span>

                    {/* 통계 표시 */}
                    {showStats && (
                      <motion.div
                        className="w-full mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="bg-black/30 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">다른 사람들의 선택</span>
                            <span className="text-2xl font-black text-yellow-300">{stats.B}%</span>
                          </div>
                          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
                              initial={{ width: 0 }}
                              animate={{ width: `${stats.B}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                </div>

                {/* 진행 상황 텍스트 */}
                <p className="text-center mt-8 text-white/60 text-sm">
                  💡 Tip: 첫 느낌으로 빠르게 선택하세요!
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* 결과 화면 */}
        {isComplete && result && resultMBTI && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultCard
              title={result.title}
              mbti={resultMBTI}
              emoji="🎯"
              mainText={result.description}
              gradient="from-blue-600 via-purple-600 to-pink-600"
              subTexts={result.traits}
            />

            {/* 상세 정보 */}
            <motion.div
              className="mt-8 space-y-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* 주요 특징 */}
              <div className="bg-purple-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  ✨ 주요 특징
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {result.traits.map((trait, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center font-bold text-white"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                    >
                      {trait}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* MBTI별 통계 */}
              <motion.div
                className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-cyan-500/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  📈 {resultMBTI}의 특징적 선택
                </h3>
                <div className="bg-black/30 rounded-2xl p-6">
                  <p className="text-white text-lg mb-4">
                    🎯 <span className="font-black text-cyan-300">{resultMBTI}</span> 유형의 <span className="font-black text-yellow-300">87%</span>는 이런 선택을 했어요!
                  </p>
                  <div className="space-y-3 text-white/90">
                    <p>✓ {result.traits[0]} - 역시 내 MBTI 답네!</p>
                    <p>✓ {result.traits[1]} - 이게 나야 ㅋㅋ</p>
                    <p className="text-sm text-cyan-300 mt-4">
                      💬 같은 MBTI는 비슷한 패턴을 보이는 경향이 있어요
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 세부 성향 */}
              <div className="bg-yellow-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-yellow-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  📊 세부 성향 (당신의 점수)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-black/20 rounded-xl p-4">
                    <span className="font-bold text-white">외향(E) vs 내향(I)</span>
                    <span className="text-xl font-black text-yellow-300">
                      {scores.E > scores.I ? `E ${scores.E}` : `I ${scores.I}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-black/20 rounded-xl p-4">
                    <span className="font-bold text-white">감각(S) vs 직관(N)</span>
                    <span className="text-xl font-black text-yellow-300">
                      {scores.S > scores.N ? `S ${scores.S}` : `N ${scores.N}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-black/20 rounded-xl p-4">
                    <span className="font-bold text-white">사고(T) vs 감정(F)</span>
                    <span className="text-xl font-black text-yellow-300">
                      {scores.T > scores.F ? `T ${scores.T}` : `F ${scores.F}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-black/20 rounded-xl p-4">
                    <span className="font-bold text-white">판단(J) vs 인식(P)</span>
                    <span className="text-xl font-black text-yellow-300">
                      {scores.J > scores.P ? `J ${scores.J}` : `P ${scores.P}`}
                    </span>
                  </div>
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
                  🔥 이 MBTI는 어떨까요?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/angry">
                    <Button variant="primary" className="w-full text-sm">
                      😤 화났을 때
                    </Button>
                  </Link>
                  <Link href="/apology">
                    <Button variant="primary" className="w-full text-sm">
                      💐 사과 받는 법
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        <Footer />
      </div>
    </div>
  );
}
