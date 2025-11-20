'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, AnimatedTitle } from '@/components/ui';

export default function SimulatorPage() {
  const [emotion, setEmotion] = useState<'happy' | 'neutral' | 'angry'>('happy');
  const [badgeCount, setBadgeCount] = useState(0);

  const emotionEmoji = {
    happy: '😊',
    neutral: '😐',
    angry: '🤬'
  };

  const handleChoice = (isGood: boolean) => {
    if (!isGood) {
      if (emotion === 'happy') setEmotion('neutral');
      else if (emotion === 'neutral') setEmotion('angry');
      setBadgeCount(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <motion.div
            className="inline-flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <span className="text-2xl">←</span>
            <span className="font-bold">홈으로</span>
          </motion.div>
        </Link>

        <AnimatedTitle className="mb-2">
          🎮 갈등 시뮬레이터
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          실전 대처법 연습하기! 🔥
        </motion.p>

        {/* 감정 변화 표시 */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center mb-8">
          <motion.div
            className="text-9xl mb-4"
            key={emotion}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
          >
            {emotionEmoji[emotion]}
          </motion.div>
          <p className="text-2xl font-black text-white">
            {emotion === 'happy' && '기분 좋은 상태!'}
            {emotion === 'neutral' && '조금 불편한 상태...'}
            {emotion === 'angry' && '완전 화남! 🔥'}
          </p>
        </div>

        {/* 배드 엔딩 배지 */}
        {badgeCount > 0 && (
          <motion.div
            className="bg-red-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-2xl font-black text-white mb-4 text-center">
              💀 수집한 배드 엔딩
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.from({ length: badgeCount }).map((_, idx) => (
                <motion.div
                  key={idx}
                  className="bg-black/40 rounded-xl px-4 py-2 text-white font-bold border-2 border-red-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {idx === 0 && '🚫 차단 엔딩'}
                  {idx === 1 && '💔 이별 통보 엔딩'}
                  {idx === 2 && '👻 잠수 엔딩'}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 선택지 */}
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => handleChoice(true)} variant="primary">
            좋은 선택
          </Button>
          <Button onClick={() => handleChoice(false)} variant="danger">
            나쁜 선택 (배드 엔딩)
          </Button>
        </div>
      </div>
    </div>
  );
}
