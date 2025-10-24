'use client';

import { useState } from 'react';
import { simulatorData } from '@/data/simulator';
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

interface ChoiceHistory {
  stageNum: number;
  choiceId: string;
  points: number;
}

export default function SimulatorPage() {
  const [step, setStep] = useState<'relationship' | 'mbti' | 'simulator' | 'result'>('relationship');
  const [relationship, setRelationship] = useState<RelationType | null>(null);
  const [mbti, setMbti] = useState<MBTIType | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [showReaction, setShowReaction] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [choiceHistory, setChoiceHistory] = useState<ChoiceHistory[]>([]);

  const scenario = simulatorData.late;
  const stages = scenario.stages;
  const stage = stages[currentStage];

  const handleRelationshipSelect = (rel: RelationType) => {
    setRelationship(rel);
    setStep('mbti');
  };

  const handleMbtiSelect = (selectedMbti: MBTIType) => {
    setMbti(selectedMbti);
    setStep('simulator');
  };

  const handleChoiceSelect = (choiceId: string, points: number) => {
    setSelectedChoice(choiceId);
    setShowReaction(true);
    setTotalScore(prev => prev + points);
    setChoiceHistory(prev => [...prev, { stageNum: currentStage + 1, choiceId, points }]);
  };

  const handleNextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(prev => prev + 1);
      setShowReaction(false);
      setSelectedChoice(null);
    }
  };

  const handleFinish = () => {
    setStep('result');
  };

  const handleRestart = () => {
    setStep('relationship');
    setRelationship(null);
    setMbti(null);
    setCurrentStage(0);
    setShowReaction(false);
    setSelectedChoice(null);
    setTotalScore(0);
    setChoiceHistory([]);
  };

  const handleRetry = () => {
    setStep('simulator');
    setCurrentStage(0);
    setShowReaction(false);
    setSelectedChoice(null);
    setTotalScore(0);
    setChoiceHistory([]);
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

  const getGradeInfo = () => {
    if (totalScore >= 7) {
      return {
        grade: '완벽',
        emoji: '🏆',
        color: 'from-yellow-400 to-orange-500',
        feedback: `${mbti} 상대방이 완전히 만족했어요! 관계가 더욱 깊어졌습니다.`
      };
    } else if (totalScore >= 4) {
      return {
        grade: '우수',
        emoji: '😊',
        color: 'from-green-400 to-emerald-500',
        feedback: `${mbti} 상대방이 이해해줬어요. 다음엔 더 좋을 거예요!`
      };
    } else if (totalScore >= 0) {
      return {
        grade: '보통',
        emoji: '🤔',
        color: 'from-blue-400 to-cyan-500',
        feedback: `${mbti} 상대방이 약간 아쉬워해요. 조금 더 신경 쓰면 좋겠어요.`
      };
    } else if (totalScore >= -3) {
      return {
        grade: '주의',
        emoji: '😰',
        color: 'from-orange-400 to-red-400',
        feedback: `${mbti} 상대방이 서운해하고 있어요. 진심 어린 대화가 필요합니다.`
      };
    } else {
      return {
        grade: '위험',
        emoji: '⚠️',
        color: 'from-red-500 to-red-700',
        feedback: `${mbti} 상대방이 많이 상처받았어요... 진심 어린 사과가 필요합니다.`
      };
    }
  };

  // Relationship Selection Screen
  if (step === 'relationship') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="secondary" className="mb-6">← 홈으로</Button>
          </Link>

          <Card className="text-center mb-8 bg-gradient-to-br from-purple-50 to-white">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-3">
              갈등 상황 시뮬레이터
            </h1>
            <p className="text-gray-600 text-lg">
              관계에서 발생하는 갈등 상황을 미리 연습해보세요!
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
              누구와의 관계인가요?
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
      </div>
    );
  }

  // MBTI Selection Screen
  if (step === 'mbti') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="secondary" className="mb-6" onClick={() => setStep('relationship')}>
            ← 뒤로
          </Button>

          <Card className="text-center mb-8 bg-gradient-to-br from-purple-50 to-white">
            <div className="text-5xl mb-4">{RELATIONSHIPS.find(r => r.type === relationship)?.icon}</div>
            <h2 className="text-2xl font-bold text-purple-900">
              {getRelationshipLabel()}의 MBTI는?
            </h2>
          </Card>

          <Card>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {MBTI_TYPES.map(type => (
                <MBTIButton
                  key={type}
                  mbti={type}
                  onClick={() => handleMbtiSelect(type)}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Simulator Screen
  if (step === 'simulator' && mbti) {
    const choice = selectedChoice ? stage.choices.find(c => c.id === selectedChoice) : null;
    const reaction = choice && mbti ? choice.reaction[mbti] : null;

    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{scenario.title}</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                    {getRelationshipLabel()} ({mbti})
                  </span>
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold">
                    Stage {currentStage + 1}/{stages.length}
                  </span>
                </div>
              </div>
              <div className="text-6xl animate-bounce">
                {scenario.emoji}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-pink-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
              />
            </div>
          </Card>

          {/* Situation */}
          <Card className="mb-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📖</div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">상황</h3>
                <p className="text-gray-700 leading-relaxed">{stage.situation}</p>
              </div>
            </div>
          </Card>

          {/* Choices or Reaction */}
          {!showReaction ? (
            <Card className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">💬</div>
                <h3 className="text-lg font-bold text-purple-900">어떻게 할까요?</h3>
              </div>
              <div className="space-y-3">
                {stage.choices.map(choice => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.id, choice.points)}
                    className="w-full text-left p-4 bg-white border-2 border-purple-200 rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:text-white hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <p className="font-medium text-gray-800 group-hover:text-white">
                      {choice.text}
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          ) : reaction && (
            <div className="space-y-4">
              {/* Reaction */}
              <Card className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">💭</div>
                  <h3 className="text-lg font-bold text-pink-900">
                    {getRelationshipLabel()}의 반응
                  </h3>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-pink-100 shadow-inner">
                  <div className="text-6xl text-center mb-4 animate-bounce">
                    {reaction.emotion}
                  </div>
                  <p className="text-xl text-center text-gray-800 font-medium mb-4">
                    {reaction.text}
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-purple-700">
                      💡 {reaction.analysis}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Next Button */}
              <div className="flex justify-center">
                {currentStage < stages.length - 1 ? (
                  <Button onClick={handleNextStage} className="text-lg px-8 py-4">
                    다음 단계로 →
                  </Button>
                ) : (
                  <Button onClick={handleFinish} className="text-lg px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600">
                    결과 보기 🎯
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Result Screen
  if (step === 'result' && mbti) {
    const gradeInfo = getGradeInfo();

    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Result Header */}
          <Card className={`mb-6 bg-gradient-to-br ${gradeInfo.color} text-white text-center`}>
            <div className="text-8xl mb-4 animate-bounce">{gradeInfo.emoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">시뮬레이터 완료!</h1>
            <p className="text-2xl font-bold opacity-90">{gradeInfo.grade}</p>
          </Card>

          {/* Score Card */}
          <Card className="mb-6 text-center bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
            <div className="mb-4">
              <span className="inline-block bg-purple-100 px-6 py-2 rounded-full text-purple-800 font-bold">
                {getRelationshipLabel()} ({mbti})
              </span>
            </div>

            <div className="mb-6">
              <div className="text-6xl font-bold text-purple-900 mb-2">{totalScore}점</div>
              <div className="flex justify-center gap-2">
                {[-5, -3, 0, 3, 5, 7, 9].map(point => (
                  <div
                    key={point}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      totalScore >= point
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white scale-110'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-3">📝 피드백</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{gradeInfo.feedback}</p>
            </div>
          </Card>

          {/* Choice History */}
          <Card className="mb-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span>📊</span>
              <span>선택 내역</span>
            </h3>
            <div className="space-y-3">
              {choiceHistory.map((history, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-blue-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {history.stageNum}
                    </span>
                    <span className="text-gray-700 font-medium">
                      Stage {history.stageNum}
                    </span>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full font-bold ${
                      history.points > 0
                        ? 'bg-green-100 text-green-700'
                        : history.points < 0
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {history.points > 0 ? '+' : ''}{history.points}점
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleRestart} variant="secondary" className="text-lg px-8 py-4">
              🔄 처음으로
            </Button>
            <Button onClick={handleRetry} className="text-lg px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600">
              🎮 다시 도전
            </Button>
          </div>

          {/* Tips */}
          <Card className="mt-6 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="text-lg font-bold text-yellow-900 mb-2">Tip</h3>
                <p className="text-gray-700 leading-relaxed">
                  MBTI별로 같은 상황에서도 반응이 다릅니다.
                  다양한 MBTI로 시도해보면서 각 유형의 특성을 이해해보세요!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
