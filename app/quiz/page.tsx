'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, calculateQuizResult, QuizResult } from '@/data/quiz';
import { Button, AnimatedTitle } from '@/components/ui';
import { ResultCard } from '@/components/ResultCard';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default function QuizPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [totalTime, setTotalTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [shake, setShake] = useState(false);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);

  // 타이머
  useEffect(() => {
    if (isStarted && !isComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setTotalTime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isComplete) {
      // 시간 초과 - 다음 문제로
      handleAnswer('A', true);
    }
  }, [isStarted, isComplete, timeLeft]);

  const handleStart = () => {
    setIsStarted(true);
    setTimeLeft(quizQuestions[0].timeLimit);
  };

  const handleAnswer = (answer: 'A' | 'B', timeout = false) => {
    const question = quizQuestions[currentQuestion];
    const isCorrect = !timeout && answer === question.correctAnswer;

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setShowFeedback('correct');
      // 폭발 효과
      triggerExplosion();
    } else {
      setShowFeedback('wrong');
      // 화면 흔들기
      triggerShake();
    }

    // 피드백 표시 후 다음 문제로
    setTimeout(() => {
      setShowFeedback(null);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setTimeLeft(quizQuestions[currentQuestion + 1].timeLimit);
      } else {
        // 퀴즈 완료
        const quizResult = calculateQuizResult(correctCount + (isCorrect ? 1 : 0), totalTime);
        setResult(quizResult);
        setIsComplete(true);
      }
    }, 1000);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const triggerExplosion = () => {
    // 폭발 효과는 CSS로 처리
  };

  const handleReset = () => {
    setIsStarted(false);
    setCurrentQuestion(0);
    setCorrectCount(0);
    setTimeLeft(10);
    setTotalTime(0);
    setIsComplete(false);
    setResult(null);
    setShowFeedback(null);
  };

  const timePercentage = (timeLeft / quizQuestions[currentQuestion]?.timeLimit) * 100;

  return (
    <div className={`min-h-screen py-12 px-4 ${shake ? 'animate-shake' : ''}`}>
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
          ⚡ 1분 MBTI 퀴즈
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {!isStarted && '60초 안에 내 MBTI 판별! 💨'}
          {isStarted && !isComplete && `${currentQuestion + 1}/${quizQuestions.length} 문제 💥`}
          {isComplete && '🔥 당신의 결과는?!'}
        </motion.p>

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
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  ⚡
                </motion.div>

                <h2 className="text-3xl font-black text-white">
                  1분 MBTI 눈치력 테스트
                </h2>

                <p className="text-lg text-white/80">
                  6개 질문에 빠르게 답하세요!<br />
                  시간이 촉박할수록 점수가 높아요! ⏱️
                </p>

                <div className="grid grid-cols-3 gap-4 text-sm text-white/70 bg-black/20 rounded-2xl p-4">
                  <div>⚡ 문제: 6개</div>
                  <div>⏱️ 시간: 60초</div>
                  <div>🏆 랭킹: 있음</div>
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
                {/* 타임어택 바 */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-bold">⏱️ 남은 시간</span>
                    <motion.span
                      className={`text-2xl font-black ${
                        timeLeft <= 3 ? 'text-red-500' : 'text-white'
                      }`}
                      animate={timeLeft <= 3 ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      {timeLeft}초
                    </motion.span>
                  </div>
                  <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden border-2 border-white/20">
                    <motion.div
                      className={`absolute top-0 left-0 h-full ${
                        timeLeft <= 3
                          ? 'bg-gradient-to-r from-red-600 to-red-500 animate-pulse'
                          : timeLeft <= 5
                          ? 'bg-gradient-to-r from-orange-600 to-orange-500'
                          : 'bg-gradient-to-r from-green-600 to-green-500'
                      }`}
                      initial={{ width: '100%' }}
                      animate={{ width: `${timePercentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* 질문 */}
                <h2 className="text-2xl font-black text-center mb-8 text-white">
                  {quizQuestions[currentQuestion].question}
                </h2>

                {/* 선택지 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* A */}
                  <motion.button
                    onClick={() => handleAnswer('A')}
                    disabled={showFeedback !== null}
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-black text-xl shadow-2xl overflow-hidden min-h-[150px] flex items-center justify-center border-4 border-blue-300/50"
                    whileHover={!showFeedback ? { scale: 1.05, rotate: -2 } : {}}
                    whileTap={!showFeedback ? { scale: 0.95 } : {}}
                  >
                    <span className="relative z-10">
                      {quizQuestions[currentQuestion].optionA}
                    </span>
                  </motion.button>

                  {/* B */}
                  <motion.button
                    onClick={() => handleAnswer('B')}
                    disabled={showFeedback !== null}
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-700 text-white font-black text-xl shadow-2xl overflow-hidden min-h-[150px] flex items-center justify-center border-4 border-purple-300/50"
                    whileHover={!showFeedback ? { scale: 1.05, rotate: 2 } : {}}
                    whileTap={!showFeedback ? { scale: 0.95 } : {}}
                  >
                    <span className="relative z-10">
                      {quizQuestions[currentQuestion].optionB}
                    </span>
                  </motion.button>
                </div>

                {/* 피드백 오버레이 */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      className="fixed inset-0 flex items-center justify-center z-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className={`text-9xl ${
                          showFeedback === 'correct' ? 'animate-bounce' : ''
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {showFeedback === 'correct' ? '✅' : '❌'}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* 결과 화면 */}
        {isComplete && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultCard
              title={result.rank}
              mbti={'INFP'} // 임시
              emoji="🏆"
              mainText={result.message}
              gradient="from-yellow-600 via-orange-600 to-red-600"
              subTexts={[
                `${result.score}/${quizQuestions.length} 정답`,
                `총 ${totalTime}초 소요`
              ]}
            />

            {/* 랭킹 시스템 */}
            <motion.div
              className="mt-8 max-w-3xl mx-auto space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* 칭호 */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-yellow-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  🎖️ 당신의 칭호
                </h3>
                <div className="text-center">
                  <p className="text-5xl font-black text-yellow-300 mb-2">
                    상위 {result.percentage}%
                  </p>
                  <p className="text-xl text-white">
                    {result.rank}
                  </p>
                </div>
              </div>

              {/* 점수 상세 */}
              <div className="bg-purple-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-500/50">
                <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
                  📊 상세 점수
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-black/20 rounded-xl p-4">
                    <span className="text-white font-bold">정답 개수</span>
                    <span className="text-2xl font-black text-green-300">
                      {result.score} / {quizQuestions.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 rounded-xl p-4">
                    <span className="text-white font-bold">총 소요 시간</span>
                    <span className="text-2xl font-black text-blue-300">
                      {totalTime}초
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 rounded-xl p-4">
                    <span className="text-white font-bold">정확도</span>
                    <span className="text-2xl font-black text-yellow-300">
                      {Math.round((result.score / quizQuestions.length) * 100)}%
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
                  🔄 다시 도전
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
                  <Link href="/balance">
                    <Button variant="primary" className="w-full text-sm">
                      ⚖️ 밸런스 게임
                    </Button>
                  </Link>
                  <Link href="/translator">
                    <Button variant="primary" className="w-full text-sm">
                      💬 속마음 번역
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>

      <Footer />
    </div>
  );
}
