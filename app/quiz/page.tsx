'use client';

import { useState, useEffect } from 'react';
import { quizQuestions } from '@/data/quiz';
import { Button, Card } from '@/components/ui';
import Link from 'next/link';
import { MBTIType } from '@/types';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<MBTIType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate MBTI type from scores
  const calculateMBTI = (): MBTIType => {
    const ei = scores.E >= scores.I ? 'E' : 'I';
    const sn = scores.S >= scores.N ? 'S' : 'N';
    const tf = scores.T >= scores.F ? 'T' : 'F';
    const jp = scores.J >= scores.P ? 'J' : 'P';
    return `${ei}${sn}${tf}${jp}` as MBTIType;
  };

  // Handle answer selection
  const handleAnswer = (answerScores: Partial<Record<string, number>>) => {
    setIsAnimating(true);

    // Update scores
    const newScores = { ...scores };
    Object.entries(answerScores).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + (value || 0);
    });
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      } else {
        // Quiz completed
        const result = calculateMBTI();
        setMbtiResult(result);
        setShowResult(true);
        setIsAnimating(false);
      }
    }, 400);
  };

  // Save MBTI to localStorage
  const saveMBTI = () => {
    if (mbtiResult) {
      localStorage.setItem('userMBTI', mbtiResult);
      alert(`${mbtiResult} 유형이 저장되었습니다! 다른 기능에서도 사용할 수 있어요.`);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    });
    setShowResult(false);
    setMbtiResult(null);
  };

  // Get MBTI description
  const getMBTIDescription = (mbti: MBTIType): string => {
    const descriptions: Record<MBTIType, string> = {
      'ISTJ': '청렴결백한 논리주의자',
      'ISFJ': '용감한 수호자',
      'INFJ': '선의의 옹호자',
      'INTJ': '용의주도한 전략가',
      'ISTP': '만능 재주꾼',
      'ISFP': '호기심 많은 예술가',
      'INFP': '열정적인 중재자',
      'INTP': '논리적인 사색가',
      'ESTP': '모험을 즐기는 사업가',
      'ESFP': '자유로운 영혼의 연예인',
      'ENFP': '재기발랄한 활동가',
      'ENTP': '뜨거운 논쟁을 즐기는 변론가',
      'ESTJ': '엄격한 관리자',
      'ESFJ': '사교적인 외교관',
      'ENFJ': '정의로운 사회운동가',
      'ENTJ': '대담한 통솔자',
    };
    return descriptions[mbti];
  };

  // Progress percentage
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResult && mbtiResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto animate-fade-in">
          {/* Back Button */}
          <Link href="/">
            <Button variant="secondary" className="mb-6">
              ← 홈으로
            </Button>
          </Link>

          <Card className="text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold text-purple-900 mb-2">
                당신의 MBTI는
              </h2>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-2xl text-5xl font-bold mb-4 shadow-lg animate-pulse">
                {mbtiResult}
              </div>
              <p className="text-xl text-gray-700 mb-6">
                {getMBTIDescription(mbtiResult)}
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">
                성향 분석 결과
              </h3>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-purple-700">외향(E)</span>
                    <span className="text-sm text-gray-600">{scores.E}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-indigo-700">내향(I)</span>
                    <span className="text-sm text-gray-600">{scores.I}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-purple-700">감각(S)</span>
                    <span className="text-sm text-gray-600">{scores.S}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-indigo-700">직관(N)</span>
                    <span className="text-sm text-gray-600">{scores.N}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-purple-700">사고(T)</span>
                    <span className="text-sm text-gray-600">{scores.T}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-indigo-700">감정(F)</span>
                    <span className="text-sm text-gray-600">{scores.F}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-purple-700">판단(J)</span>
                    <span className="text-sm text-gray-600">{scores.J}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-indigo-700">인식(P)</span>
                    <span className="text-sm text-gray-600">{scores.P}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={saveMBTI} className="flex-1">
                💾 이 MBTI로 다른 기능 사용하기
              </Button>
              <Button onClick={resetQuiz} variant="secondary" className="flex-1">
                🔄 다시 테스트하기
              </Button>
            </div>

            {/* Navigate to other features */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                이제 다른 기능을 사용해보세요!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/translator">
                  <Button variant="secondary" className="text-sm">
                    💬 속마음 번역기
                  </Button>
                </Link>
                <Link href="/compatibility">
                  <Button variant="secondary" className="text-sm">
                    💕 궁합 테스트
                  </Button>
                </Link>
                <Link href="/gift">
                  <Button variant="secondary" className="text-sm">
                    💝 선물 추천
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* Back Button */}
        <Link href="/">
          <Button variant="secondary" className="mb-6">
            ← 홈으로
          </Button>
        </Link>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold text-lg">
              1분 MBTI 퀴즈 ⚡
            </span>
            <span className="text-white font-semibold">
              {currentQuestion + 1} / {quizQuestions.length}
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-pink-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card
          className={`transition-all duration-400 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              질문 {currentQuestion + 1}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer.scores)}
                disabled={isAnimating}
                className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border-3 border-purple-200 hover:border-purple-400 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-purple-900">
                    {answer.text}
                  </span>
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Hint Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              💡 직관적으로 선택해주세요! 정답은 없습니다.
            </p>
          </div>
        </Card>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < currentQuestion
                  ? 'bg-green-400 scale-110'
                  : index === currentQuestion
                  ? 'bg-white scale-125'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
