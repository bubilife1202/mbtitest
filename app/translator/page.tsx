'use client';

import { useState, useEffect } from 'react';
import { Button, Card, MBTIButton, RelationshipCard } from '@/components/ui';
import { phrasesData } from '@/data/phrases';
import { MBTIType, Gender, Phrase } from '@/types';
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
  { id: 'family', icon: '👨‍👩‍👧‍👦', text: '가족', gender: '남자' as Gender }, // Default to male, can be adjusted
];

// MBTI types in order for grid display
const mbtiTypes: MBTIType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

// Phrases with emojis
const phrases: { id: Phrase; emoji: string }[] = [
  { id: '괜찮아', emoji: '😊' },
  { id: '나 화 안 났어', emoji: '😤' },
  { id: '네 맘대로 해', emoji: '🤷' },
  { id: '아무거나 좋아', emoji: '🤔' },
  { id: '별로 안 바빠', emoji: '⏰' },
  { id: '나중에 얘기하자', emoji: '⏳' },
  { id: '알아서 해', emoji: '🙄' },
  { id: '생각 좀 해볼게', emoji: '💭' },
];

interface HistoryItem {
  relationship: string;
  gender: Gender;
  mbti: MBTIType;
  phrase: Phrase;
  timestamp: number;
}

export default function TranslatorPage() {
  const [step, setStep] = useState(1);
  const [selectedRelationship, setSelectedRelationship] = useState<typeof relationships[0] | null>(null);
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Update meta tags dynamically
  useEffect(() => {
    if (step === 4 && selectedPhrase && selectedMBTI && selectedRelationship) {
      const result = phrasesData[selectedPhrase][selectedRelationship.gender][selectedMBTI];
      document.title = `${selectedRelationship.text}가 "${selectedPhrase}" 할 때 - MBTI 속마음 번역기`;
    } else {
      document.title = 'MBTI 속마음 번역기 - 관계 도우미';
    }
  }, [step, selectedPhrase, selectedMBTI, selectedRelationship]);

  // Save to localStorage
  useEffect(() => {
    if (selectedRelationship && selectedMBTI && selectedPhrase) {
      try {
        const historyItem: HistoryItem = {
          relationship: selectedRelationship.text,
          gender: selectedRelationship.gender,
          mbti: selectedMBTI,
          phrase: selectedPhrase,
          timestamp: Date.now(),
        };

        const history = JSON.parse(localStorage.getItem('translatorHistory') || '[]');
        history.unshift(historyItem);
        // Keep only last 10 items
        localStorage.setItem('translatorHistory', JSON.stringify(history.slice(0, 10)));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  }, [selectedRelationship, selectedMBTI, selectedPhrase, step]);

  const handleRelationshipSelect = (relationship: typeof relationships[0]) => {
    setSelectedRelationship(relationship);
    setStep(2);
  };

  const handleMBTISelect = (mbti: MBTIType) => {
    setSelectedMBTI(mbti);
    setStep(3);
  };

  const handlePhraseSelect = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    setStep(4);
  };

  const handleShare = async () => {
    if (!selectedRelationship || !selectedMBTI || !selectedPhrase) return;

    const result = phrasesData[selectedPhrase][selectedRelationship.gender][selectedMBTI];
    const shareText = `${selectedRelationship.text}(${selectedMBTI})가 "${selectedPhrase}" 할 때\n\n진짜 의미: ${result.meaning}\n\nMBTI 속마음 번역기로 확인하기`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'MBTI 속마음 번역기',
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
    setSelectedPhrase(null);
    setShareSuccess(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) setSelectedRelationship(null);
      if (step === 3) setSelectedMBTI(null);
      if (step === 4) setSelectedPhrase(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 cursor-pointer hover:scale-105 transition-transform">
            💬 속마음 번역기
          </h1>
        </Link>
        <p className="text-lg text-purple-100">
          {step === 1 && '누가 말했나요?'}
          {step === 2 && '상대방의 MBTI는?'}
          {step === 3 && '어떤 말을 했나요?'}
          {step === 4 && '진짜 의미를 알려드릴게요!'}
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
            누구와의 관계인가요?
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

      {/* Step 3: Phrase Selection */}
      {step === 3 && (
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Button variant="secondary" onClick={handleBack} className="text-sm px-4 py-2">
              ← 뒤로
            </Button>
            <h2 className="text-2xl font-bold text-purple-900">어떤 말을 했나요?</h2>
            <div className="w-20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phrases.map((phrase) => (
              <button
                key={phrase.id}
                onClick={() => handlePhraseSelect(phrase.id)}
                className="bg-gradient-to-br from-white to-gray-50 border-3 border-gray-200 rounded-2xl p-6 text-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <div className="text-4xl mb-3">{phrase.emoji}</div>
                <div className="text-xl font-bold text-gray-800 group-hover:text-white">
                  "{phrase.id}"
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Step 4: Result */}
      {step === 4 && selectedRelationship && selectedMBTI && selectedPhrase && (
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
              <div className="text-2xl text-gray-700 mb-4">
                "{selectedPhrase}"
              </div>
            </div>

            {/* Meaning */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">진짜 의미</h3>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {phrasesData[selectedPhrase][selectedRelationship.gender][selectedMBTI].meaning}
                  </p>
                </div>
              </div>
            </div>

            {/* Do List */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-3xl">✅</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-3">이렇게 하세요</h3>
                  <ul className="space-y-2">
                    {phrasesData[selectedPhrase][selectedRelationship.gender][selectedMBTI].solution.do.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Don't List */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-3xl">❌</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-900 mb-3">이건 피하세요</h3>
                  <ul className="space-y-2">
                    {phrasesData[selectedPhrase][selectedRelationship.gender][selectedMBTI].solution.dont.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
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
                <Link href="/date">
                  <Button className="text-sm px-4 py-2">💑 데이트 코스</Button>
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
