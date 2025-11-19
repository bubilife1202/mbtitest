import { FeatureCard } from '@/components/ui';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-white mb-4">MBTI 관계 도우미</h1>
      <p className="text-xl text-purple-100 mb-12">어떤 도움이 필요하세요?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <FeatureCard
          icon="💬"
          title="속마음 번역기"
          description="괜찮아의 진짜 의미는?"
          href="/translator"
        />
        <FeatureCard
          icon="⚡"
          title="1분 MBTI 퀴즈"
          description="빠르게 MBTI 알아보기"
          href="/quiz"
        />
        <FeatureCard
          icon="🎮"
          title="갈등 시뮬레이터"
          description="상황별 대처법 연습"
          href="/simulator"
        />
        <FeatureCard
          icon="💝"
          title="선물 추천"
          description="MBTI별 완벽한 선물"
          href="/gift"
        />
        <FeatureCard
          icon="💑"
          title="데이트 코스"
          description="맞춤 데이트 플랜"
          href="/date"
        />
        <FeatureCard
          icon="💕"
          title="궁합 테스트"
          description="우리의 MBTI 궁합은?"
          href="/compatibility"
        />
        <FeatureCard
          icon="💐"
          title="MBTI별 사과 받는 법"
          description="진심어린 사과 방법"
          href="/apology"
        />
        <FeatureCard
          icon="😤"
          title="MBTI별 화났을 때"
          description="화난 상대 달래는 법"
          href="/angry"
        />
        <FeatureCard
          icon="⚖️"
          title="MBTI 밸런스 게임"
          description="20문항으로 알아보기"
          href="/balance"
        />
      </div>
    </div>
  );
}
