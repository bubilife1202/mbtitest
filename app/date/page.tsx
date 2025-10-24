'use client';

import { useState, useEffect } from 'react';
import { Button, Card, MBTIButton, RelationshipCard } from '@/components/ui';
import { datesData } from '@/data/dates';
import { MBTIType } from '@/types';
import Link from 'next/link';

// Relationship types - only romantic relationships
const relationships = [
  { id: 'girlfriend', icon: '💕', text: '여자친구' },
  { id: 'boyfriend', icon: '💙', text: '남자친구' },
  { id: 'wife', icon: '👰', text: '와이프' },
  { id: 'husband', icon: '🤵', text: '남편' },
];

// MBTI types in order for grid display
const mbtiTypes: MBTIType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

// Step number emojis
const stepEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

interface HistoryItem {
  relationship: string;
  mbti: MBTIType;
  timestamp: number;
}

export default function DatePage() {
  const [step, setStep] = useState(1);
  const [selectedRelationship, setSelectedRelationship] = useState<typeof relationships[0] | null>(null);
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Update meta tags dynamically
  useEffect(() => {
    if (step === 3 && selectedMBTI && selectedRelationship) {
      document.title = `${selectedRelationship.text}(${selectedMBTI}) 데이트 코스 추천 - MBTI 관계 도우미`;
    } else {
      document.title = 'MBTI별 데이트 코스 추천 - 관계 도우미';
    }
  }, [step, selectedMBTI, selectedRelationship]);

  // Save to localStorage
  useEffect(() => {
    if (selectedRelationship && selectedMBTI) {
      try {
        const historyItem: HistoryItem = {
          relationship: selectedRelationship.text,
          mbti: selectedMBTI,
          timestamp: Date.now(),
        };

        const history = JSON.parse(localStorage.getItem('dateHistory') || '[]');
        history.unshift(historyItem);
        // Keep only last 10 items
        localStorage.setItem('dateHistory', JSON.stringify(history.slice(0, 10)));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  }, [selectedRelationship, selectedMBTI, step]);

  const handleRelationshipSelect = (relationship: typeof relationships[0]) => {
    setSelectedRelationship(relationship);
    setStep(2);
  };

  const handleMBTISelect = (mbti: MBTIType) => {
    setSelectedMBTI(mbti);
    setStep(3);
  };

  const handleShare = async () => {
    if (!selectedRelationship || !selectedMBTI) return;

    const data = datesData[selectedMBTI];
    const shareText = `${selectedRelationship.text}(${selectedMBTI}) 데이트 코스 추천\n\n${data.courses[0].title}\n${data.courses[0].steps.slice(0, 2).join('\n')}\n\nMBTI 데이트 코스 추천에서 더 보기`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'MBTI 데이트 코스 추천',
          text: shareText,
          url: shareUrl,
        });
        setShareSuccess(true);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShareSuccess(true);
      }
      setTimeout(() => setShareSuccess(false), 2000);
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRelationship(null);
    setSelectedMBTI(null);
    setShareSuccess(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) setSelectedRelationship(null);
      if (step === 3) setSelectedMBTI(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 cursor-pointer hover:scale-105 transition-transform">
            💑 데이트 코스 추천
          </h1>
        </Link>
        <p className="text-lg text-purple-100">
          {step === 1 && '누구와 데이트하나요?'}
          {step === 2 && '상대방의 MBTI는?'}
          {step === 3 && '완벽한 데이트 코스를 추천해드릴게요!'}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-20 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Relationship Selection */}
      {step === 1 && (
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-900">
            누구와의 데이트인가요?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relationships.map((rel) => (
              <RelationshipCard
                key={rel.id}
                icon={rel.icon}
                text={rel.text}
                onClick={() => handleRelationshipSelect(rel)}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Step 2: MBTI Selection */}
      {step === 2 && (
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Button variant="secondary" onClick={handleBack} className="text-sm px-4 py-2">
              ← 뒤로
            </Button>
            <h2 className="text-2xl font-bold text-purple-900">
              {selectedRelationship?.text}의 MBTI는?
            </h2>
            <div className="w-20"></div>
          </div>
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {mbtiTypes.map((mbti) => (
              <MBTIButton
                key={mbti}
                mbti={mbti}
                onClick={() => handleMBTISelect(mbti)}
                imageUrl="placeholder"
              />
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            MBTI를 모르시나요?{' '}
            <Link href="/quiz" className="text-purple-600 hover:underline font-semibold">
              1분 퀴즈로 알아보기
            </Link>
          </p>
        </Card>
      )}

      {/* Step 3: Date Course Results */}
      {step === 3 && selectedRelationship && selectedMBTI && (
        <div className="space-y-6">
          <Card className="p-8">
            <div className="flex justify-between items-center mb-6">
              <Button variant="secondary" onClick={handleBack} className="text-sm px-4 py-2">
                ← 뒤로
              </Button>
              <div className="flex gap-2">
                <Button onClick={handleShare} className="text-sm px-4 py-2">
                  {shareSuccess ? '✓ 복사됨!' : '공유하기'}
                </Button>
              </div>
            </div>

            {/* Result Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">
                {relationships.find(r => r.id === selectedRelationship.id)?.icon}
              </div>
              <h2 className="text-3xl font-bold text-purple-900 mb-2">
                {selectedRelationship.text} ({selectedMBTI})
              </h2>
              <p className="text-lg text-gray-600">
                맞춤형 데이트 코스를 추천해드릴게요!
              </p>
            </div>

            {/* Date Courses */}
            <div className="space-y-6 mb-8">
              <h3 className="text-2xl font-bold text-purple-900 text-center mb-6">
                추천 데이트 코스 3가지
              </h3>
              {datesData[selectedMBTI].courses.map((course, courseIdx) => (
                <div
                  key={courseIdx}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200"
                >
                  <h4 className="text-xl font-bold text-purple-900 mb-4">
                    {course.title}
                  </h4>
                  <div className="space-y-3">
                    {course.steps.map((stepText, stepIdx) => (
                      <div
                        key={stepIdx}
                        className="flex items-start gap-3 bg-white/70 rounded-xl p-4"
                      >
                        <span className="text-2xl flex-shrink-0">
                          {stepEmojis[stepIdx]}
                        </span>
                        <span className="text-gray-800 leading-relaxed">
                          {stepText}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="space-y-6 mb-8">
              <h3 className="text-2xl font-bold text-purple-900 text-center mb-6">
                데이트 팁
              </h3>

              {/* Do Tips */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">✅</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-green-900 mb-3">
                      이렇게 하세요
                    </h4>
                    <ul className="space-y-2">
                      {datesData[selectedMBTI].tips.do.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-gray-800">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Don't Tips */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">❌</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-red-900 mb-3">
                      이건 피하세요
                    </h4>
                    <ul className="space-y-2">
                      {datesData[selectedMBTI].tips.dont.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-gray-800">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button onClick={handleReset} className="w-full sm:w-auto">
                🔄 다시 해보기
              </Button>
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full">
                  🏠 홈으로
                </Button>
              </Link>
            </div>
          </Card>

          {/* Additional Tips */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                더 많은 MBTI 관계 팁이 필요하신가요?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/compatibility">
                  <Button className="text-sm px-4 py-2">💕 궁합 테스트</Button>
                </Link>
                <Link href="/gift">
                  <Button className="text-sm px-4 py-2">💝 선물 추천</Button>
                </Link>
                <Link href="/translator">
                  <Button className="text-sm px-4 py-2">💬 속마음 번역기</Button>
                </Link>
                <Link href="/simulator">
                  <Button className="text-sm px-4 py-2">🎮 갈등 시뮬레이터</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Back to Home Button (for steps 1-2) */}
      {step < 3 && (
        <div className="text-center mt-8">
          <Link href="/" className="text-white hover:text-purple-200 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
