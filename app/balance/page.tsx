'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MBTIType } from '@/types';
import { balanceQuestions, calculateMBTI, getMBTIResult } from '@/data/balance';
import AdBanner from '@/components/AdBanner';

export default function BalancePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const handleChoice = (choice: 'A' | 'B') => {
    const question = balanceQuestions[currentQuestion];
    const scoreToAdd = choice === 'A' ? question.scoreA : question.scoreB;

    const newScores = { ...scores };
    Object.entries(scoreToAdd).forEach(([key, value]) => {
      newScores[key as keyof typeof scores] += value || 0;
    });

    setScores(newScores);

    if (currentQuestion < balanceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setIsComplete(false);
  };

  const resultMBTI = isComplete ? calculateMBTI(scores) : null;
  const result = resultMBTI ? getMBTIResult(resultMBTI) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:text-blue-800">
          ← 홈으로
        </Link>

        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⚖️ MBTI 밸런스 게임
        </h1>
        <p className="text-center text-gray-600 mb-12">
          20개의 질문으로 당신의 MBTI를 알아보세요!
        </p>

        <AdBanner />

        {!isComplete ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-500">
                  질문 {currentQuestion + 1} / {balanceQuestions.length}
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {Math.round(((currentQuestion + 1) / balanceQuestions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / balanceQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
              당신은 어느 쪽에 가까운가요?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleChoice('A')}
                className="p-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg transition-all transform hover:scale-105 shadow-lg whitespace-pre-line min-h-[160px] flex items-center justify-center"
              >
                {balanceQuestions[currentQuestion].optionA}
              </button>
              <button
                onClick={() => handleChoice('B')}
                className="p-8 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-lg transition-all transform hover:scale-105 shadow-lg whitespace-pre-line min-h-[160px] flex items-center justify-center"
              >
                {balanceQuestions[currentQuestion].optionB}
              </button>
            </div>
          </div>
        ) : (
          result && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <h2 className="text-4xl font-bold text-white">{resultMBTI}</h2>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{result.title}</h3>
                <p className="text-lg text-gray-600">{result.description}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold mb-4 text-gray-800">✨ 주요 특징</h4>
                <div className="grid grid-cols-2 gap-3">
                  {result.traits.map((trait, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg p-3 text-center font-semibold text-gray-700 shadow-sm"
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold mb-3 text-yellow-700">📊 세부 성향</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">외향(E) vs 내향(I)</span>
                    <span className="text-sm text-gray-600">
                      {scores.E > scores.I ? `E ${scores.E}` : `I ${scores.I}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">감각(S) vs 직관(N)</span>
                    <span className="text-sm text-gray-600">
                      {scores.S > scores.N ? `S ${scores.S}` : `N ${scores.N}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">사고(T) vs 감정(F)</span>
                    <span className="text-sm text-gray-600">
                      {scores.T > scores.F ? `T ${scores.T}` : `F ${scores.F}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">판단(J) vs 인식(P)</span>
                    <span className="text-sm text-gray-600">
                      {scores.J > scores.P ? `J ${scores.J}` : `P ${scores.P}`}
                    </span>
                  </div>
                </div>
              </div>

              <AdBanner />

              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  다시 하기
                </button>
                <Link
                  href="/"
                  className="flex-1 bg-gray-600 text-white py-4 rounded-xl font-bold hover:bg-gray-700 transition-colors text-center"
                >
                  홈으로
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
