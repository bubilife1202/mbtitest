'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MBTIType } from '@/types';
import { getAngryData } from '@/data/angry';
import { MBTIButton } from '@/components/ui';
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-red-600 hover:text-red-800">
          ← 홈으로
        </Link>

        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          😤 MBTI별 화났을 때
        </h1>
        <p className="text-center text-gray-600 mb-12">
          상대방이 화났을 때 어떻게 대처해야 할까요?
        </p>

        <AdBanner />

        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">상대방의 성별을 선택하세요</h2>
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handleGenderSelect('male')}
                className="p-8 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold transition-all transform hover:scale-105"
              >
                👨 남자
              </button>
              <button
                onClick={() => handleGenderSelect('female')}
                className="p-8 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-2xl font-bold transition-all transform hover:scale-105"
              >
                👩 여자
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">상대방의 MBTI를 선택하세요</h2>
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
        )}

        {step === 3 && result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
              {selectedMBTI} {gender === 'male' ? '남자' : '여자'}가 화났을 때
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-red-600">🚨 화난 신호</h3>
                <ul className="space-y-2">
                  {result.signal.map((sig, idx) => (
                    <li key={idx} className="text-gray-800 text-lg flex items-start">
                      <span className="mr-2">•</span>
                      <span>{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-600">💡 왜 화났을까?</h3>
                <p className="text-gray-800 text-lg whitespace-pre-line">{result.why}</p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-green-600">✅ 해결 방법</h3>
                <p className="text-gray-800 text-lg whitespace-pre-line">{result.solution}</p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-600">⛔ 절대 하지 말 것</h3>
                <p className="text-gray-800 text-lg whitespace-pre-line">{result.avoid}</p>
              </div>
            </div>

            <AdBanner />

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors"
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
        )}
      </div>
    </div>
  );
}
