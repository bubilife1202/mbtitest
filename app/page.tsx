'use client';

import { FeatureCard, AnimatedTitle } from '@/components/ui';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// 별 생성 함수
function createStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
  }));
}

export default function Home() {
  const [stars, setStars] = useState<Array<{ id: number; left: string; top: string; delay: number }>>([]);

  useEffect(() => {
    setStars(createStars(50));
  }, []);

  // 각 카드마다 다른 그라데이션
  const features = [
    {
      icon: "💬",
      title: "속마음 번역기",
      description: "\"괜찮아\"의 진짜 의미는? 🤯",
      href: "/translator",
      gradient: "from-pink-500 via-rose-500 to-red-500"
    },
    {
      icon: "⚡",
      title: "1분 MBTI 퀴즈",
      description: "60초 안에 내 MBTI 판별 💨",
      href: "/quiz",
      gradient: "from-yellow-500 via-orange-500 to-red-500"
    },
    {
      icon: "🎮",
      title: "갈등 시뮬레이터",
      description: "실전 대처법 연습하기 🔥",
      href: "/simulator",
      gradient: "from-cyan-500 via-blue-500 to-purple-500"
    },
    {
      icon: "💝",
      title: "선물 추천",
      description: "MBTI별 칼 같은 추천 🎁",
      href: "/gift",
      gradient: "from-pink-500 via-purple-500 to-indigo-500"
    },
    {
      icon: "💑",
      title: "데이트 코스",
      description: "100% 성공 데이트 플랜 💯",
      href: "/date",
      gradient: "from-red-500 via-pink-500 to-purple-500"
    },
    {
      icon: "💕",
      title: "궁합 테스트",
      description: "우리 둘이 잘 맞을까? 💘",
      href: "/compatibility",
      gradient: "from-purple-500 via-pink-500 to-rose-500"
    },
    {
      icon: "💐",
      title: "사과 받는 법",
      description: "MBTI별 진심 전달법 🙏",
      href: "/apology",
      gradient: "from-green-500 via-emerald-500 to-teal-500"
    },
    {
      icon: "😤",
      title: "화났을 때",
      description: "킹받은 상대 달래기 😡→😊",
      href: "/angry",
      gradient: "from-orange-500 via-red-500 to-pink-500"
    },
    {
      icon: "⚖️",
      title: "밸런스 게임",
      description: "20문항으로 내 MBTI 찾기 🎯",
      href: "/balance",
      gradient: "from-indigo-500 via-purple-500 to-pink-500"
    },
  ];

  return (
    <>
      {/* 배경 별들 */}
      <div className="stars fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 text-center px-4 py-12">
        {/* 타이틀 */}
        <AnimatedTitle>
          MBTI 관계 도우미
        </AnimatedTitle>

        {/* 서브 타이틀 */}
        <motion.p
          className="text-2xl md:text-3xl font-bold text-white/90 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            연애부터 관계까지, 딱 1분이면 끝!
          </span>
        </motion.p>

        <motion.p
          className="text-lg text-gray-300 mb-12 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          🔥 지금 가장 핫한 MBTI 테스트 • 이미 <span className="text-neon-pink font-black">100만명</span>이 경험했어요!
        </motion.p>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.href}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              gradient={feature.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* 하단 CTA */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 text-gray-300">
            <span className="text-3xl">👆</span>
            <p className="text-xl font-bold">
              원하는 테스트를 골라보세요!
            </p>
          </div>

          {/* 통계 */}
          <div className="flex gap-8 mt-6">
            <div className="text-center">
              <div className="text-3xl font-black text-neon-pink">1M+</div>
              <div className="text-sm text-gray-400">참여자</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-neon-blue">9</div>
              <div className="text-sm text-gray-400">테스트</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-neon-purple">⭐ 4.9</div>
              <div className="text-sm text-gray-400">평점</div>
            </div>
          </div>
        </motion.div>

        {/* 소셜 증거 */}
        <motion.div
          className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl max-w-2xl mx-auto border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-sm text-gray-300 mb-3">
            💬 최근 후기
          </p>
          <div className="space-y-2 text-left">
            <p className="text-white font-semibold">
              "ㅋㅋㅋ 진짜 소름돋게 맞네 특히 속마음 번역기 미쳤음" - INFP
            </p>
            <p className="text-white font-semibold">
              "친구들이랑 다 같이 해봤는데 대박 재밌어요 ㅎㅎ" - ENFP
            </p>
            <p className="text-white font-semibold">
              "화났을 때 편 보고 진짜 사과 성공했어요 ㄷㄷ" - ISTJ
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
