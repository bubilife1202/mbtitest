'use client';

import { useState, useEffect } from 'react';
import { Button, Card, MBTIButton, RelationshipCard } from '@/components/ui';
import { giftsData } from '@/data/gifts';
import { MBTIType, Gender } from '@/types';
import Link from 'next/link';

// Relationship types with their display info
const relationships = [
  { id: 'girlfriend', icon: '💕', text: '여자친구', gender: '여자' as Gender },
  { id: 'boyfriend', icon: '💙', text: '남자친구', gender: '남자' as Gender },
  { id: 'wife', icon: '👰', text: '와이프', gender: '여자' as Gender },
  { id: 'husband', icon: '🤵', text: '남편', gender: '남자' as Gender },
  { id: 'female_boss', icon: '👩‍💼', text: '여자상사', gender: '여자' as Gender },
  { id: 'male_boss', icon: '👨‍💼', text: '남자상사', gender: '남자' as Gender },
  { id: 'female_colleague', icon: '👩‍💻', text: '여자동료', gender: '여자' as Gender },
  { id: 'male_colleague', icon: '👨‍💻', text: '남자동료', gender: '남자' as Gender },
  { id: 'female_friend', icon: '👭', text: '여자친구(친구)', gender: '여자' as Gender },
  { id: 'male_friend', icon: '👬', text: '남자친구(친구)', gender: '남자' as Gender },
  { id: 'family', icon: '👨‍👩‍👧‍👦', text: '가족', gender: '남자' as Gender },
];

// MBTI types in order for grid display
const mbtiTypes: MBTIType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

// Occasions with emojis
const occasions = [
  { id: '생일' as const, emoji: '🎂', text: '생일', description: '특별한 생일 선물' },
  { id: '기념일' as const, emoji: '💝', text: '기념일', description: '의미있는 기념일' },
  { id: '사과' as const, emoji: '🙏', text: '사과', description: '미안한 마음 전하기' },
  { id: '깜짝선물' as const, emoji: '🎁', text: '깜짝선물', description: '예상 못한 기쁨' },
];

type OccasionType = '생일' | '기념일' | '사과' | '깜짝선물';

interface HistoryItem {
  relationship: string;
  mbti: MBTIType;
  occasion: OccasionType;
  timestamp: number;
}

export default function GiftPage() {
  const [step, setStep] = useState(1);
  const [selectedRelationship, setSelectedRelationship] = useState<typeof relationships[0] | null>(null);
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Update meta tags dynamically
  useEffect(() => {
    if (step === 4 && selectedOccasion && selectedMBTI && selectedRelationship) {
      document.title = `${selectedRelationship.text}(${selectedMBTI}) ${selectedOccasion} 선물 추천 - MBTI 선물 가이드`;
    } else {
      document.title = 'MBTI 선물 추천 - 관계 도우미';
    }
  }, [step, selectedOccasion, selectedMBTI, selectedRelationship]);

  // Save to localStorage
  useEffect(() => {
    if (selectedRelationship && selectedMBTI && selectedOccasion) {
      try {
        const historyItem: HistoryItem = {
          relationship: selectedRelationship.text,
          mbti: selectedMBTI,
          occasion: selectedOccasion,
          timestamp: Date.now(),
        };

        const history = JSON.parse(localStorage.getItem('giftHistory') || '[]');
        history.unshift(historyItem);
        localStorage.setItem('giftHistory', JSON.stringify(history.slice(0, 10)));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  }, [selectedRelationship, selectedMBTI, selectedOccasion, step]);

  const handleRelationshipSelect = (relationship: typeof relationships[0]) => {
    setSelectedRelationship(relationship);
    setStep(2);
  };

  const handleMBTISelect = (mbti: MBTIType) => {
    setSelectedMBTI(mbti);
    setStep(3);
  };

  const handleOccasionSelect = (occasion: OccasionType) => {
    setSelectedOccasion(occasion);
    setStep(4);
  };

  const handleShare = async () => {
    if (!selectedRelationship || !selectedMBTI || !selectedOccasion) return;

    const result = giftsData[selectedOccasion][selectedMBTI];
    const shareText = `${selectedRelationship.text}(${selectedMBTI}) ${selectedOccasion} 선물 추천\n\n추천: ${result.recommended.slice(0, 3).join(', ')}\n\nMBTI 선물 추천으로 확인하기`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'MBTI 선물 추천',
          text: shareText,
          url: shareUrl,
        });
        setShareSuccess(true);
      } else {
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
    setSelectedOccasion(null);
    setShareSuccess(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) setSelectedRelationship(null);
      if (step === 3) setSelectedMBTI(null);
      if (step === 4) setSelectedOccasion(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 cursor-pointer hover:scale-105 transition-transform">
            💝 선물 추천
          </h1>
        </Link>
        <p className="text-lg text-purple-100">
          {step === 1 && '누구에게 선물하나요?'}
          {step === 2 && '상대방의 MBTI는?'}
          {step === 3 && '어떤 상황인가요?'}
          {step === 4 && '완벽한 선물을 찾았어요!'}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-all duration-300 ${
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
            누구에게 선물하나요?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

      {/* Step 3: Occasion Selection */}
      {step === 3 && (
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Button variant="secondary" onClick={handleBack} className="text-sm px-4 py-2">
              ← 뒤로
            </Button>
            <h2 className="text-2xl font-bold text-purple-900">어떤 상황인가요?</h2>
            <div className="w-20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {occasions.map((occasion) => (
              <button
                key={occasion.id}
                onClick={() => handleOccasionSelect(occasion.id)}
                className="bg-gradient-to-br from-white to-gray-50 border-3 border-gray-200 rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <div className="text-5xl mb-4">{occasion.emoji}</div>
                <div className="text-2xl font-bold text-gray-800 group-hover:text-white mb-2">
                  {occasion.text}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-purple-100">
                  {occasion.description}
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Step 4: Result */}
      {step === 4 && selectedRelationship && selectedMBTI && selectedOccasion && (
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
                {occasions.find(o => o.id === selectedOccasion)?.emoji}
              </div>
              <h2 className="text-3xl font-bold text-purple-900 mb-2">
                {selectedRelationship.text} ({selectedMBTI})
              </h2>
              <div className="text-xl text-gray-700 mb-4">
                {selectedOccasion} 선물 추천
              </div>
            </div>

            {/* Recommended Gifts */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">✅</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-1">이런 선물 추천해요!</h3>
                  <p className="text-sm text-green-700 mb-3">
                    {selectedMBTI} 유형이 정말 좋아할 선물들이에요
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {giftsData[selectedOccasion][selectedMBTI].recommended.map((gift, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 border-2 border-green-200 hover:border-green-400 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎁</div>
                      <span className="text-gray-800 font-medium">{gift}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid Gifts */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-900 mb-1">이런 선물은 피하세요</h3>
                  <p className="text-sm text-red-700 mb-3">
                    {selectedMBTI} 유형에게는 부담스러울 수 있어요
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {giftsData[selectedOccasion][selectedMBTI].avoid.map((gift, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 border-2 border-red-200 hover:border-red-400 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">❌</div>
                      <span className="text-gray-800 font-medium">{gift}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MBTI Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">선물 팁</h3>
                  <div className="text-gray-800 space-y-2">
                    {selectedMBTI.startsWith('I') ? (
                      <p>• 내향형(I)은 조용하고 개인적인 선물을 선호해요</p>
                    ) : (
                      <p>• 외향형(E)은 활동적이고 사교적인 선물을 좋아해요</p>
                    )}
                    {selectedMBTI.includes('S') ? (
                      <p>• 감각형(S)은 실용적이고 구체적인 선물을 선호해요</p>
                    ) : (
                      <p>• 직관형(N)은 의미있고 창의적인 선물을 좋아해요</p>
                    )}
                    {selectedMBTI.includes('T') ? (
                      <p>• 사고형(T)은 논리적이고 효율적인 선물을 선호해요</p>
                    ) : (
                      <p>• 감정형(F)은 감성적이고 따뜻한 선물을 좋아해요</p>
                    )}
                    {selectedMBTI.endsWith('J') ? (
                      <p>• 판단형(J)은 계획적이고 정돈된 선물을 선호해요</p>
                    ) : (
                      <p>• 인식형(P)은 자유롭고 유연한 선물을 좋아해요</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button onClick={handleReset} className="w-full sm:w-auto">
                🔄 다시 추천받기
              </Button>
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full">
                  🏠 홈으로
                </Button>
              </Link>
            </div>
          </Card>

          {/* Additional Features */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                더 많은 MBTI 관계 팁이 필요하신가요?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/translator">
                  <Button className="text-sm px-4 py-2">💬 속마음 번역기</Button>
                </Link>
                <Link href="/date">
                  <Button className="text-sm px-4 py-2">💑 데이트 코스</Button>
                </Link>
                <Link href="/compatibility">
                  <Button className="text-sm px-4 py-2">💕 궁합 테스트</Button>
                </Link>
                <Link href="/simulator">
                  <Button className="text-sm px-4 py-2">🎮 갈등 시뮬레이터</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Back to Home Button (for steps 1-3) */}
      {step < 4 && (
        <div className="text-center mt-8">
          <Link href="/" className="text-white hover:text-purple-200 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
