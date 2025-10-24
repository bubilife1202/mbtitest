'use client';

import { useState } from 'react';
import { calculateCompatibility } from '@/data/compatibility';
import { Button, RelationshipCard, MBTIButton, Card } from '@/components/ui';
import { MBTIType, RelationType } from '@/types';
import Link from 'next/link';

const MBTI_TYPES: MBTIType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

const RELATIONSHIPS: { type: RelationType; icon: string }[] = [
  { type: '연인', icon: '💑' },
  { type: '친구', icon: '👥' },
  { type: '동료', icon: '🤝' },
  { type: '가족', icon: '👨‍👩‍👧‍👦' }
];

export default function CompatibilityPage() {
  const [step, setStep] = useState<'relationship' | 'partner-mbti' | 'my-mbti' | 'result'>('relationship');
  const [relationship, setRelationship] = useState<RelationType | null>(null);
  const [partnerMbti, setPartnerMbti] = useState<MBTIType | null>(null);
  const [myMbti, setMyMbti] = useState<MBTIType | null>(null);

  const handleRelationshipSelect = (rel: RelationType) => {
    setRelationship(rel);
    setStep('partner-mbti');
  };

  const handlePartnerMbtiSelect = (mbti: MBTIType) => {
    setPartnerMbti(mbti);
    setStep('my-mbti');
  };

  const handleMyMbtiSelect = (mbti: MBTIType) => {
    setMyMbti(mbti);
    setStep('result');
  };

  const handleRestart = () => {
    setStep('relationship');
    setRelationship(null);
    setPartnerMbti(null);
    setMyMbti(null);
  };

  const getRelationshipLabel = () => {
    if (!relationship) return '';
    const labels: Record<RelationType, string> = {
      '연인': '내 연인',
      '친구': '내 친구',
      '동료': '내 동료',
      '가족': '우리 가족'
    };
    return labels[relationship];
  };

  // Step 1: Relationship Selection
  if (step === 'relationship') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="secondary" className="mb-6">← 홈으로</Button>
          </Link>

          {/* Header Card with Heart Animation */}
          <Card className="text-center mb-8 bg-gradient-to-br from-pink-50 via-purple-50 to-white border-2 border-pink-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 flex justify-around opacity-20">
              <div className="text-6xl animate-float">💕</div>
              <div className="text-6xl animate-float-delayed">💖</div>
              <div className="text-6xl animate-float">💗</div>
            </div>

            <div className="relative z-10">
              <div className="text-6xl mb-4 animate-pulse">💝</div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-3">
                MBTI 궁합 테스트
              </h1>
              <p className="text-gray-600 text-lg">
                우리의 MBTI 궁합은 얼마나 될까? 지금 바로 확인해보세요!
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
              누구와의 궁합을 확인할까요?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {RELATIONSHIPS.map(rel => (
                <RelationshipCard
                  key={rel.type}
                  icon={rel.icon}
                  text={rel.type}
                  onClick={() => handleRelationshipSelect(rel.type)}
                />
              ))}
            </div>
          </Card>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 3s ease-in-out infinite 0.5s;
          }
        `}</style>
      </div>
    );
  }

  // Step 2: Partner MBTI Selection
  if (step === 'partner-mbti') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="secondary" className="mb-6" onClick={() => setStep('relationship')}>
            ← 뒤로
          </Button>

          <Card className="text-center mb-8 bg-gradient-to-br from-purple-50 to-white">
            <div className="text-5xl mb-4">{RELATIONSHIPS.find(r => r.type === relationship)?.icon}</div>
            <h2 className="text-2xl font-bold text-purple-900 mb-2">
              {getRelationshipLabel()}의 MBTI는?
            </h2>
            <p className="text-gray-600">상대방의 MBTI를 선택해주세요</p>
          </Card>

          <Card>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {MBTI_TYPES.map(type => (
                <MBTIButton
                  key={type}
                  mbti={type}
                  onClick={() => handlePartnerMbtiSelect(type)}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 3: My MBTI Selection
  if (step === 'my-mbti') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="secondary" className="mb-6" onClick={() => setStep('partner-mbti')}>
            ← 뒤로
          </Button>

          <Card className="text-center mb-8 bg-gradient-to-br from-indigo-50 to-white">
            <div className="text-5xl mb-4">🤔</div>
            <h2 className="text-2xl font-bold text-purple-900 mb-2">
              나의 MBTI는?
            </h2>
            <p className="text-gray-600">내 MBTI를 선택해주세요</p>
          </Card>

          <Card>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {MBTI_TYPES.map(type => (
                <MBTIButton
                  key={type}
                  mbti={type}
                  onClick={() => handleMyMbtiSelect(type)}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 4: Result Display
  if (step === 'result' && myMbti && partnerMbti) {
    const result = calculateCompatibility(myMbti, partnerMbti);

    // Determine emoji based on grade
    const getGradeEmoji = () => {
      if (result.grade.includes('완벽한')) return '💯';
      if (result.grade.includes('최고의')) return '💕';
      if (result.grade.includes('좋은')) return '😊';
      if (result.grade.includes('무난한')) return '🤝';
      return '💪';
    };

    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Floating Hearts Background */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-10 left-10 text-4xl opacity-20 animate-float">❤️</div>
            <div className="absolute top-20 right-20 text-3xl opacity-20 animate-float-delayed">💖</div>
            <div className="absolute bottom-40 left-20 text-5xl opacity-20 animate-float">💕</div>
            <div className="absolute bottom-20 right-10 text-4xl opacity-20 animate-float-delayed">💗</div>
            <div className="absolute top-1/2 left-1/4 text-3xl opacity-20 animate-float">💝</div>
            <div className="absolute top-1/3 right-1/3 text-4xl opacity-20 animate-float-delayed">💘</div>
          </div>

          <div className="relative z-10">
            {/* Result Header */}
            <Card className="mb-6 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white text-center border-4 border-white shadow-2xl">
              <div className="text-8xl mb-4 animate-bounce">{getGradeEmoji()}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{result.grade}</h1>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-4">
                <span className="text-yellow-300">⭐</span>
                <span>{result.rating.toFixed(1)} / 5.0</span>
                <span className="text-yellow-300">⭐</span>
              </div>

              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="bg-white/30 px-6 py-2 rounded-full">
                    <span className="font-bold">나: {myMbti}</span>
                  </div>
                  <div className="text-3xl animate-pulse">💕</div>
                  <div className="bg-white/30 px-6 py-2 rounded-full">
                    <span className="font-bold">{getRelationshipLabel()}: {partnerMbti}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="mb-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
              <div className="text-center">
                <div className="inline-block bg-purple-100 px-6 py-2 rounded-full text-purple-800 font-bold mb-4">
                  궁합 분석
                </div>
                <p className="text-xl text-gray-800 leading-relaxed">
                  {result.description}
                </p>
              </div>
            </Card>

            {/* Pros - Green Cards */}
            {result.pros.length > 0 && (
              <Card className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">💚</div>
                  <h3 className="text-2xl font-bold text-green-900">장점</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.pros.map((pro, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slideInLeft"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold text-lg">✓</span>
                        <p className="text-gray-800 flex-1">{pro}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Cons - Orange Cards */}
            {result.cons.length > 0 && (
              <Card className="mb-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">⚠️</div>
                  <h3 className="text-2xl font-bold text-orange-900">주의할 점</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {result.cons.map((con, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slideInRight"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold text-lg">⚡</span>
                        <p className="text-gray-800 flex-1">{con}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tips - Blue Cards */}
            {result.tips.length > 0 && (
              <Card className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">💡</div>
                  <h3 className="text-2xl font-bold text-blue-900">관계를 더 좋게 만드는 팁</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {result.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slideInLeft"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold text-lg">💙</span>
                        <p className="text-gray-800 flex-1">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/">
                <Button variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto">
                  🏠 홈으로
                </Button>
              </Link>
              <Button onClick={handleRestart} className="text-lg px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600">
                🔄 다시 테스트하기
              </Button>
            </div>

            {/* Tip Card */}
            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200">
              <div className="flex items-start gap-3">
                <div className="text-3xl">✨</div>
                <div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">알고 계셨나요?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    MBTI 궁합은 절대적인 기준이 아니에요. 서로를 이해하고 존중하는 마음이 가장 중요합니다.
                    이 결과를 참고삼아 더 나은 관계를 만들어가세요! 💕
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }

          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(-5deg); }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 4s ease-in-out infinite 1s;
          }

          .animate-slideInLeft {
            animation: slideInLeft 0.5s ease-out forwards;
            opacity: 0;
          }

          .animate-slideInRight {
            animation: slideInRight 0.5s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    );
  }

  return null;
}
